var EventEmitter = require('eventemitter3'),
    util = require('util');

var ViewModel = function() {
  EventEmitter.call(this);
};

util.inherits(ViewModel, EventEmitter);

module.exports = ViewModel;
