var ViewModel = require('../../ReactMVC/ViewModel'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var ThreadListViewModel = function() {
  ViewModel.call(this);

  ChatModel.on(ChatModel.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ThreadListViewModel, ViewModel);

ThreadListViewModel.prototype.onInitialData = function() {
  this.threads = ChatModel.threads;
  this.emit(this.EventType.INITIAL_DATA);
};

ThreadListViewModel.prototype.onNewMessage = function(e) {
  this.emit(this.EventType.NEW_MESSAGE, e);
};

/**
 * @enum {string}
 */
ThreadListViewModel.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  NEW_MESSAGE: 'new message'
};

module.exports = ThreadListViewModel;