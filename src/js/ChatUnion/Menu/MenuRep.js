var Representative = require('../../ReactMVC/Representative'),
    ChatRegime = require('../ChatRegime'),
    util = require('util');

var MenuRep = function() {
  Representative.call(this);
  this.unreadCount = ChatRegime.getUnreadCount();

  ChatRegime.on(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(MenuRep, Representative);


MenuRep.prototype.onUpdate = function() {
  this.unreadCount = ChatRegime.getUnreadCount();

  this.emit(this.EventType.UPDATE);
};


MenuRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MenuRep;
