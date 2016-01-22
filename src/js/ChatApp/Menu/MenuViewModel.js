var ViewModelresentative = require('../../ReactMVC/ViewModelresentative'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var MenuViewModel = function() {
  ViewModelresentative.call(this);
  this.unreadCount = ChatModel.getUnreadCount();

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(MenuViewModel, ViewModelresentative);


MenuViewModel.prototype.onUpdate = function() {
  this.unreadCount = ChatModel.getUnreadCount();

  this.emit(this.EventType.UPDATE);
};


MenuViewModel.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MenuViewModel;
