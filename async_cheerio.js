var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var urls = process.env.URLS.split(',');
var reqs = [];

urls.forEach(function(url) {

  reqs.push(
    function(cb) {
      makeRequest(url, cb)
    }
  );

});

var makeRequest = function(url, cb) {
  request(url, function(error, response, body) {
    if (error) {
      cb(error, null);
      return;
    }

    var $ = cheerio.load(body);
    cb(null, $('title').text());
  })
}


async.parallel(reqs, function(err, result) {
  console.log(result);
});

// URLS=http://www.facebook.com,http://yahoo.com node async_cheerio.js
