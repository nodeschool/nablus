var express = require('express');
var counter = require('./CounterMiddleware');

var app = express();

app.all('/',
  function(request, response, next) {
    response.setHeader('Content-Type', 'text/html');
    next();
  },
  counter.middleware,
  function(request, response) {
    response.write('Hi from middleware 2<br/>');
    response.end();
  });

var server = app.listen(3000, function() {
  console.log("Express server started");
});
