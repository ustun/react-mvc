var util = require('util'),
    ViewModelresentative = require('../../ReactMVC/ViewModelresentative'),
    ChatModel = require('../ChatModel');

var ChatPaneViewModel = function(thread) {
  ViewModelresentative.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.owner = ChatModel.owner;

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ChatPaneViewModel, ViewModelresentative);

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
