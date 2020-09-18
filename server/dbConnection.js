const mongodb = require('mongodb').MongoClient;

let connection;

const dbConnection = () => {
  if (!connection) {
    connection = mongodb.connect(process.env.MLAB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return connection;
};

module.exports = dbConnection;
