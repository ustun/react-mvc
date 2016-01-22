var EventEmitter = require('eventemitter3'),
    util = require('util');

var model = function() {
    EventEmitter.call(this);
};

util.inherits(model, EventEmitter);

module.exports = model;
