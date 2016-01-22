var ViewModel = require('../../ReactMVC/ViewModel'),
    util = require('util'),
    ChatModel = require('../ChatModel');

var ThreadsPopoverViewModel = function() {
  ViewModel.call(this);

  this.visible = false;
};

util.inherits(ThreadsPopoverViewModel, ViewModel);

ThreadsPopoverViewModel.prototype.toggle = function() {
  this.visible = !this.visible;
};

/**
 * @param {ThreadEntity} thread Thread to open a chat box for.
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