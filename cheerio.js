var request = require('request');
var cheerio = require('cheerio');

var url = process.env.URL;

request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    console.log($('title').text());
  }
})

// URL=http://www.yahoo.com node async_cheerio.js
