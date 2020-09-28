const fetch = require('isomorphic-unfetch');
const mongodb = require('mongodb');
const { ObjectID } = require('bson');

const dbConnection = require('./dbConnection');

const addBook = async (book, userId) => {
  const { id, imgLink, title } = book;
  const _id = mongodb.ObjectID(userId);
  const connection = await dbConnection();
  connection
    .db('book-club')
    .collection('users')
    .updateOne({ _id }, { $push: { books: { id, imgLink, title } } });
};

const createBooksArray = async (docs, userId = null) => {
  if (userId === null) {
    // books that are already involved in a trade are not available to be traded
    const unavailableBookIds = docs.reduce((acc, doc) => {
      const docTradeIds = doc.trades.submitted.map((trade) => trade.bookId);
      return acc.concat(docTradeIds);
    }, []);

    const allBooks = [];
    for (const doc of docs) {
      const { books: docBooks, _id: userId } = doc;
      const docBooksWithData = await Promise.all(
        docBooks.map(async (book) => {
          const { id, imgLink, title } = book;
          const imgRes = await fetch(imgLink);
          const imgBuf = await imgRes.buffer();
          const imgSrc = `data:image/jpeg;base64,${imgBuf.toString('base64')}`;
          return {
            id,
            imgSrc,
            title,
            isAvailable: !unavailableBookIds.includes(book.id),
            userId,
          };
        }),
      );
      allBooks.push(...docBooksWithData);
    }

    return allBooks;
  }
  const userBooks = await Promise.all(
    docs
      .find((doc) => String(doc._id) === userId)
      .books.map(async (book) => {
        const { id, imgLink, title } = book;
        const imgRes = await fetch(imgLink);
        const imgBuf = await imgRes.buffer();
        const imgSrc = `data:image/jpeg;base64,${imgBuf.toString('base64')}`;
        return { id, imgSrc, title };
      }),
  );

  return userBooks;
};

const createTradesArray = (docs, userId) => {
  const books = docs.reduce((acc, doc) => acc.concat(doc.books), []);
  const { awaitingApproval, submitted } = docs.find(
    (doc) => String(doc._id) === userId,
  ).trades;
  const trades = {
    awaitingApproval: awaitingApproval.map((trade) => ({
      book: books.find((book) => book.id === trade.bookId),
      userId: trade.userId,
    })),
    submitted: submitted.map((trade) => ({
      book: books.find((book) => book.id === trade.bookId),
    })),
  };
  return trades;
};

const getMongoDocs = async () => {
  const connection = await dbConnection();
  const docs = await connection
    .db('book-club')
    .collection('users')
    .find({}, { projection: { books: 1, trades: 1 } })
    .toArray();
  return docs;
};

const getAllBooksAndTrades = async (userId) => {
  const docs = await getMongoDocs();
  const books = await createBooksArray(docs);
  const trades = createTradesArray(docs, userId);
  return { books, trades };
};

const getUserBooksAndTrades = async (userId) => {
  const docs = await getMongoDocs();
  const books = await createBooksArray(docs, userId);
  const trades = createTradesArray(docs, userId);
  return { books, trades };
};

const getNewBook = async (searchTerm) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=1&projection=lite`;
  const booksRes = await fetch(url);
  const booksJson = await booksRes.json();
  const { title, imageLinks } = booksJson.items[0].volumeInfo;
  const imgLink = imageLinks.smallThumbnail;

  const imgRes = await fetch(imgLink);
  const imgBuf = await imgRes.buffer();
  const imgSrc = `data:image/jpeg;base64,${imgBuf.toString('base64')}`;

  const id = String(new ObjectID());
  const book = { id, imgLink, imgSrc, title };

  return book;
};

module.exports = {
  addBook,
  getAllBooksAndTrades,
  getUserBooksAndTrades,
  getNewBook,
};
