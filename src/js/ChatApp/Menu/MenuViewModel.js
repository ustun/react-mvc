var ViewModel = require('../../ReactMVC/ViewModel'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var MenuViewModel = function() {
  ViewModel.call(this);
  this.unreadCount = ChatModel.getUnreadCount();

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(MenuViewModel, ViewModel);


MenuViewModel.prototype.onUpdate = function() {
  this.unreadCount = ChatModel.getUnreadCount();

  this.emit(this.EventType.UPDATE);
};


MenuViewModel.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MenuViewModel;
