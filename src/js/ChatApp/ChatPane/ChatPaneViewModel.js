var util = require('util'),
    ViewModel = require('../../ReactMVC/ViewModel'),
    ChatModel = require('../ChatModel');

var ChatPaneViewModel = function(thread) {
  ViewModel.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.owner = ChatModel.owner;

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ChatPaneViewModel, ViewModel);

ChatPaneViewModel.prototype.onNewMessage = function(e) {
  e.data.some(function(data) {
    if (this.thread.id != data.thread.id)
      return;

    this.emit(e);

    return true;
  }, this);
};

ChatPaneViewModel.prototype.EventType = {
  NEW_MESSAGE: 'new message'
};

module.exports = ChatPaneViewModel;
