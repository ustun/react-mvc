var EventEmitter = require('eventemitter3'),
    util = require('util');

var Model = function() {
    EventEmitter.call(this);
};

util.inherits(Model, EventEmitter);

module.exports = Model;
