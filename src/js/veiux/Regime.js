var EventEmitter = require('events').EventEmitter,
    util = require('util');

var Regime = function() {
    EventEmitter.call(this);
};

util.inherits(Regime, EventEmitter);

module.exports = Regime;
