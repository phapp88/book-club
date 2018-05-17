/* eslint no-underscore-dangle: "off" */
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');
const passport = require('passport');
const { Strategy } = require('passport-local');

const dbConnection = require('./dbConnection');

const verifyUser = async (email, password, done) => {
  const connection = await dbConnection();
  const collection = connection.db('book-club').collection('users');
  try {
    const user = await collection.findOne({ email });
    if (!user) return done(null, false);
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
};

passport.use(new Strategy({ usernameField: 'email' }, verifyUser));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const _id = mongodb.ObjectID(id);
  const connection = await dbConnection();
  const collection = connection.db('book-club').collection('users');
  try {
    const user = await collection.findOne({ _id });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
