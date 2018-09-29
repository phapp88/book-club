/* eslint no-underscore-dangle: "off" */
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const mongodb = require('mongodb');
const next = require('next');
const session = require('express-session');

const api = require('./api');
const dbConnection = require('./dbConnection');
const passport = require('./passport');

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const MongoStore = connectMongo(session);

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.prepare()
  .then(() => {
    express()
      .use(helmet())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(session({
        store: new MongoStore({ url: process.env.MLAB }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }))
      .use(passport.initialize())
      .use(passport.session())
      .use('/api', api)
      .get('/allbooks', wrap(async (req, res) => {
        if (!req.isAuthenticated()) {
          return res.redirect('/login');
        }
        const { user } = req.session.passport;
        const connection = await dbConnection();
        const docs = await connection.db('book-club').collection('users').find(
          {},
          { projection: { books: 1, trades: 1 } },
        ).toArray();
        const unavailableBookIds = docs.reduce((acc, doc) => {
          const docTradeIds = doc.trades.submitted.map(trade => trade.bookId);
          return acc.concat(docTradeIds);
        }, []);
        const books = docs.reduce((acc, doc) => {
          const { books: docBooks, _id: userId } = doc;
          const docBooksWithData = docBooks.map(book => ({
            ...book,
            isAvailable: !unavailableBookIds.includes(book.id),
            userId,
          }));
          return acc.concat(docBooksWithData);
        }, []);
        const { awaitingApproval, submitted } = docs.find(doc =>
          String(doc._id) === user).trades;
        const trades = {
          awaitingApproval: awaitingApproval.map(trade => ({
            book: books.find(book => book.id === trade.bookId),
            userId: trade.userId,
          })),
          submitted: submitted.map(trade => ({
            book: books.find(book => book.id === trade.bookId),
          })),
        };
        return app.render(req, res, '/allbooks', { books, trades });
      }))
      .get('/mybooks', wrap(async (req, res) => {
        if (!req.isAuthenticated()) {
          return res.redirect('/login');
        }
        const { user } = req.session.passport;
        const connection = await dbConnection();
        const docs = await connection.db('book-club').collection('users').find(
          {},
          { projection: { books: 1, trades: 1 } },
        ).toArray();
        const allBooks = docs.reduce((acc, doc) => acc.concat(doc.books), []);
        const { books: userBooks, trades } = docs.find(doc => String(doc._id) === user);
        const { awaitingApproval, submitted } = trades;
        const queryParams = {
          books: userBooks,
          trades: {
            awaitingApproval: awaitingApproval.map(trade => ({
              book: userBooks.find(book => book.id === trade.bookId),
              userId: trade.userId,
            })),
            submitted: submitted.map(trade => ({
              book: allBooks.find(book => book.id === trade.bookId),
            })),
          },
        };
        return app.render(req, res, '/mybooks', queryParams);
      }))
      .get('/logout', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
          if (err) throw err;
          res.redirect('/');
        });
      })
      .get('/settings', wrap(async (req, res) => {
        if (!req.isAuthenticated()) {
          res.redirect('/login');
        }
        const { user } = req.session.passport;
        const _id = mongodb.ObjectID(user);
        const connection = await dbConnection();
        const {
          city, _id: userId, name, state,
        } = await connection.db('book-club').collection('users').findOne(
          { _id },
          { projection: { city: 1, name: 1, state: 1 } },
        );
        const queryParams = {
          city, name, state, userId,
        };
        return app.render(req, res, '/settings', queryParams);
      }))
      .post('/login', (req, res, nxt) => {
        passport.authenticate('local', (authErr, user) => {
          if (authErr) return nxt(authErr);
          if (!user) {
            const { email, password } = req.body;
            const errMsg = 'The username/password combination is not valid.';
            return app.render(req, res, '/login', { email, errMsg, password });
          }
          return req.login(user, (loginErr) => {
            if (loginErr) return nxt(loginErr);
            return res.redirect('/');
          });
        })(req, res, nxt);
      })
      .post('/signup', wrap(async (req, res, nxt) => {
        const { email, name, password } = req.body;
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const connection = await dbConnection();
        const collection = connection.db('book-club').collection('users');
        try {
          const doc = await collection.insertOne({
            books: [],
            city: '',
            email,
            name,
            password: hash,
            state: '',
            trades: {
              awaitingApproval: [],
              submitted: [],
            },
          });
          const user = doc.ops[0];
          return req.login(user, (err) => {
            if (err) return nxt(err);
            return res.redirect('/');
          });
        } catch (err) {
          const errMsg = 'That email address is already in use.';
          const queryParams = {
            email, errMsg, name, password,
          };
          return app.render(req, res, '/signup', queryParams);
        }
      }))
      .get('*', (req, res) => handle(req, res))
      .listen(process.env.PORT || 3000);
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
