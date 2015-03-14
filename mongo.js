var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/test';

var db;

var connect = function(cb) {
  if (db) {
    return cb(null, db);
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return cb(err);
    }

    cb(null, db);
  });
};

self.insertURL = function(url) {
  connect(function(err, db)) {
    // bla bla bla

    db.insert(url);
  }
}
