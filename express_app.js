var app = require('express')();
var bodyParser = require('body-parser');
var requester = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

app.use(bodyParser.urlencoded({
  extended: true
}));

// In memory DB
var URLS = [];
// {id: 'yzx', url: 'http://google.com', title: 'Google'}

// ALL
app.get('/urls', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(URLS));
});

// One object
app.get('/urls/:id', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  var id = request.params.id;
  var finded_obj = _.find(URLS, function(u) {
    return u.id == id;
  });
  response.end(JSON.stringify(finded_obj));
})

// Create object
app.post('/urls', function(request, response) {
  response.setHeader('Status-Code', 201);
  response.setHeader('Content-Type', 'application/json');
  var id = Math.round(Math.random() * 1000) // max 999
  var url = request.body.url;
  var title;

  requester(url, function(error, res, body) {
    if (!error && res.statusCode == 200) {
      var $ = cheerio.load(body);
      title = $('title').text();

      var new_obj = {
        title: title,
        url: url,
        id: id
      }

      URLS.push(new_obj)
      response.end(JSON.stringify(new_obj));
    }
  })
})

// delete One object
app.delete('/urls/:id', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  var id = request.params.id;

  URLS = _.reject(URLS, function(el) {
    return el.id == id;
  });

  response.end(JSON.stringify(id));
})

var server = app.listen(3000, function() {
  console.log("URLS server started at port 3000");
});
