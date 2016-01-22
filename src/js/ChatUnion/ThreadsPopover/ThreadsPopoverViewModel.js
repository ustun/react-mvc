var Representative = require('../../ReactMVC/Representative'),
    util = require('util'),
    Chatmodel = require('../Chatmodel');

var ThreadsPopoverRep = function() {
  Representative.call(this);

  this.visible = false;
};

util.inherits(ThreadsPopoverRep, Representative);

ThreadsPopoverRep.prototype.toggle = function() {
  this.visible = !this.visible;
};

/**
 * @param {Threadentity} thread Thread to open a chat box for.
 */
ThreadsPopoverRep.prototype.addChatBox = function(thread) {
  Chatmodel.addChatBox(thread);
};

/**
 * @enum {string}
 */
ThreadsPopoverRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = ThreadsPopoverRep;