var Representative = require('../../ReactMVC/Representative'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var MenuRep = function() {
  Representative.call(this);
  this.unreadCount = ChatModel.getUnreadCount();

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(MenuRep, Representative);


MenuRep.prototype.onUpdate = function() {
  this.unreadCount = ChatModel.getUnreadCount();

  this.emit(this.EventType.UPDATE);
};


MenuRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MenuRep;
