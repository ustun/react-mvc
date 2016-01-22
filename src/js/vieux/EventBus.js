var EventEmitter = require('eventemitter3'),
    util = require('util');

var eventManager = function() {
    EventEmitter.call(this);
};

util.inherits(eventManager, EventEmitter);

module.exports = eventManager;
