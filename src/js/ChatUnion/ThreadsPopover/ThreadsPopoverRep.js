var Representative = require('../../vieux/Representative'),
    util = require('util');

var ThreadsPopoverRep = function() {
  Representative.call(this);

  this.visible = false;
};

util.inherits(ThreadsPopoverRep, Representative);

ThreadsPopoverRep.prototype.toggle = function() {
  this.visible = !this.visible;
};

/**
 * @enum {string}
 */
ThreadsPopoverRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = ThreadsPopoverRep;