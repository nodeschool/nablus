var CounterMiddleware = function() {

  var self = this;
  var _count = 0;

  self.middleware = function(request, response, next) {
    incrementCounter();
    response.write("Counter: " + _count + "<br/>");
    next();
  }

  var incrementCounter = function() {
    _count++;
  }

}

module.exports = new CounterMiddleware();
