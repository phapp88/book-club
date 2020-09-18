/* eslint no-underscore-dangle: "off" */
const bcrypt = require('bcrypt');
const express = require('express');
const mongodb = require('mongodb');

const dbConnection = require('../dbConnection');
const {
  addBook,
  getAllBooksAndTrades,
  getNewBook,
  getUserBooksAndTrades,
} = require('../utils');

const router = express.Router();

const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

router
  .delete(
    '/book/:id',
    wrap(async (req, res) => {
      const { id } = req.params;
      const { user } = req.session.passport;
      const _id = mongodb.ObjectID(user);
      const connection = await dbConnection();
      connection
        .db('book-club')
        .collection('users')
        .updateOne({ _id }, { $pull: { books: { id } } });
      return res.end();
    })
  )
  .delete(
    '/trades/:bookId',
    wrap(async (req, res) => {
      const { bookId } = req.params;
      const connection = await dbConnection();
      const collection = connection.db('book-club').collection('users');
      collection.updateOne(
        { 'trades.submitted.bookId': bookId },
        { $pull: { 'trades.submitted': { bookId } } }
      );
      collection.updateOne(
        { 'trades.awaitingApproval.bookId': bookId },
        { $pull: { 'trades.awaitingApproval': { bookId } } }
      );
      const tradeWasAccepted = Object.prototype.hasOwnProperty.call(
        req.body,
        'prevUserId'
      );
      if (tradeWasAccepted) {
        const { prevUserId, nextUserId } = req.body;
        const doc = await collection.findOneAndUpdate(
          { _id: mongodb.ObjectID(prevUserId) },
          { $pull: { books: { id: bookId } } }
        );
        const tradeBook = doc.value.books.find((book) => book.id === bookId);
        collection.updateOne(
          { _id: mongodb.ObjectID(nextUserId) },
          { $push: { books: tradeBook } }
        );
      }
      return res.end();
    })
  )
  .get(
    '/allbooks',
    wrap(async (req, res) => {
      const { user: userId } = req.session.passport;
      const json = await getAllBooksAndTrades(userId);
      res.send(json);
    })
  )
  .get(
    '/mybooks',
    wrap(async (req, res) => {
      const { user: userId } = req.session.passport;
      const json = await getUserBooksAndTrades(userId);
      res.send(json);
    })
  )
  .get(
    '/settings',
    wrap(async (req, res) => {
      const { user } = req.session.passport;
      const _id = mongodb.ObjectID(user);
      const connection = await dbConnection();
      const { city, _id: userId, name, state } = await connection
        .db('book-club')
        .collection('users')
        .findOne({ _id }, { projection: { city: 1, name: 1, state: 1 } });
      const json = {
        city,
        name,
        state,
        userId,
      };
      res.send(json);
    })
  )
  .post(
    '/books/:userId',
    wrap(async (req, res) => {
      const { searchTerm } = req.body;
      const { userId } = req.params;

      const book = await getNewBook(searchTerm);
      addBook(book, userId);
      delete book.imgLink;

      return res.send(book);
    })
  )
  .post(
    '/trades',
    wrap(async (req, res) => {
      const { bookId, offereeId, offerorId } = req.body;
      const connection = await dbConnection();
      const collection = connection.db('book-club').collection('users');
      collection.updateOne(
        { _id: mongodb.ObjectID(offereeId) },
        {
          $push: {
            'trades.awaitingApproval': {
              bookId,
              userId: offerorId,
            },
          },
        }
      );
      collection.updateOne(
        { _id: mongodb.ObjectID(offerorId) },
        { $push: { 'trades.submitted': { bookId } } }
      );
      return res.end();
    })
  )
  .put(
    '/password/:userId',
    wrap(async (req, res) => {
      const { currentPassword, newPassword } = req.body;
      const { userId } = req.params;
      const _id = mongodb.ObjectID(userId);
      const connection = await dbConnection();
      const collection = await connection.db('book-club').collection('users');
      const { password } = await collection.findOne(
        { _id },
        { projection: { _id: 0, password: 1 } }
      );
      const passwordIsCorrect = await bcrypt.compare(currentPassword, password);
      if (!passwordIsCorrect) {
        return res.send({ errMsg: 'Incorrect password' });
      }
      const saltRounds = 10;
      const newHash = await bcrypt.hash(newPassword, saltRounds);
      await collection.updateOne({ _id }, { $set: { password: newHash } });
      return res.send({ msg: 'Password successfully changed.' });
    })
  )
  .put(
    '/profile/:userId',
    wrap(async (req, res) => {
      const { city, name, state } = req.body;
      const { userId } = req.params;
      const _id = mongodb.ObjectID(userId);
      const connection = await dbConnection();
      const collection = connection.db('book-club').collection('users');
      try {
        const doc = await collection.updateOne(
          { _id },
          { $set: { city, name, state } }
        );
        return res.send(doc);
      } catch (err) {
        return res.send(err);
      }
    })
  );

module.exports = router;
