var http = require('http');
var Person = require('./test_module');

console.log("Person");

http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  var mohamed = new Person();
  mohamed.setName("Mohamed");
  var name = mohamed.getName();

  res.end('Hello World ' + name + '\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
