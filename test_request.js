// test_request.js

var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var urls = ['http://www.yahoo.com', 'http://www.djalihvoihcxovih.com', 'http://facebook.com', 'http://www.microsoft.com'];
var callbacks = [];

urls.forEach(function(url) {
  callbacks.push(function(callback) {

    request(url, function(error, response, body) {

      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        callback({
          'error': 'Something wrong happened'
        }, null);
        return;
      }

      var parsedContent = cheerio.load(body);
      callback(null, parsedContent('title').text());
    })
  })
});


async.parallel(callbacks, function(err, res) {
  if (err) {
    console.log(err);
  }

  console.log(res);
});
