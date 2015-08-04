var EventEmitter = require('events').EventEmitter,
    util = require('util');

var Representative = function() {
  EventEmitter.call(this);
};

util.inherits(Representative, EventEmitter);

module.exports = Representative;
