var EventEmitter = require('eventemitter3'),
    util = require('util');

var ViewModelresentative = function() {
  EventEmitter.call(this);
};

util.inherits(ViewModelresentative, EventEmitter);

module.exports = ViewModelresentative;
