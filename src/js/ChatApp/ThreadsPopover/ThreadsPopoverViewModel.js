var ViewModelresentative = require('../../ReactMVC/ViewModelresentative'),
    util = require('util'),
    ChatModel = require('../ChatModel');

var ThreadsPopoverViewModel = function() {
  ViewModelresentative.call(this);

  this.visible = false;
};

util.inherits(ThreadsPopoverViewModel, ViewModelresentative);

ThreadsPopoverViewModel.prototype.toggle = function() {
  this.visible = !this.visible;
};

/**
 * @param {Threadentity} thread Thread to open a chat box for.
 */
ThreadsPopoverViewModel.prototype.addChatBox = function(thread) {
  ChatModel.addChatBox(thread);
};

/**
 * @enum {string}
 */
ThreadsPopoverViewModel.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = ThreadsPopoverViewModel;