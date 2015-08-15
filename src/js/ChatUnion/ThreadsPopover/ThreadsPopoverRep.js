var Representative = require('../../vieux/Representative'),
    util = require('util'),
    ChatRegime = require('../ChatRegime');

var ThreadsPopoverRep = function() {
  Representative.call(this);

  this.visible = false;
};

util.inherits(ThreadsPopoverRep, Representative);

ThreadsPopoverRep.prototype.toggle = function() {
  this.visible = !this.visible;
};

/**
 * @param {ThreadStereotype} thread Thread to open a chat box for.
 */
ThreadsPopoverRep.prototype.addChatBox = function(thread) {
  ChatRegime.addChatBox(thread);
};

/**
 * @enum {string}
 */
ThreadsPopoverRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = ThreadsPopoverRep;