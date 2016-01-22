var Representative = require('../../ReactMVC/Representative'),
    Chatmodel = require('../Chatmodel'),
    util = require('util');

var MenuRep = function() {
  Representative.call(this);
  this.unreadCount = Chatmodel.getUnreadCount();

  Chatmodel.on(Chatmodel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  Chatmodel.on(Chatmodel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
  Chatmodel.on(Chatmodel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(MenuRep, Representative);


MenuRep.prototype.onUpdate = function() {
  this.unreadCount = Chatmodel.getUnreadCount();

  this.emit(this.EventType.UPDATE);
};


MenuRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MenuRep;
