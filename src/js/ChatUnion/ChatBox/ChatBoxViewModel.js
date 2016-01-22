var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    Chatmodel = require('../Chatmodel');

/**
 *
 * @constructor
 * @extends {Representative}
 *
 * @param {Threadentity} thread Threadentity instance
 */
var ChatBoxRep = function(thread) {
  Representative.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.minimized = false;

  Chatmodel.on(Chatmodel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  Chatmodel.on(Chatmodel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(ChatBoxRep, Representative);


ChatBoxRep.prototype.setActive = function () {
  Chatmodel.setActiveChatBox(this.thread);
};


ChatBoxRep.prototype.close = function () {
  Chatmodel.removeChatBox(this.thread);
};


ChatBoxRep.prototype.minimize = function () {
  this.minimized = !this.minimized;

  Chatmodel.setActiveChatBox(this.minimized ? null : this.thread);
};


ChatBoxRep.prototype.getActive = function () {
  return this.thread == Chatmodel.activeChatBox;
};


ChatBoxRep.prototype.onUpdate = function () {
  this.emit(this.EventType.UPDATE);
};



ChatBoxRep.prototype.EventType = {
  UPDATE: 'update'
};


module.exports = ChatBoxRep;
