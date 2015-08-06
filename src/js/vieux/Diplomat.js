var EventEmitter = require('eventemitter3'),
    util = require('util');

var Diplomat = function() {
    EventEmitter.call(this);
};

util.inherits(Diplomat, EventEmitter);

module.exports = Diplomat;
