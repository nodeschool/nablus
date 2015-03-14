var Person = function() {
  var self = this;
  var _name;

  self.setName = function(name) {
    _name = name;
  }

  self.getName = function() {
    return _name;
  }
}

module.exports = Person;
