var EventEmitter = require('eventemitter3'),
    util = require('util');

var Representative = function() {
  EventEmitter.call(this);
};

util.inherits(Representative, EventEmitter);

module.exports = Representative;
