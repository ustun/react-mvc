var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    ChatModel = require('../ChatModel');

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

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(ChatBoxRep, Representative);


ChatBoxRep.prototype.setActive = function () {
  ChatModel.setActiveChatBox(this.thread);
};


ChatBoxRep.prototype.close = function () {
  ChatModel.removeChatBox(this.thread);
};


ChatBoxRep.prototype.minimize = function () {
  this.minimized = !this.minimized;

  ChatModel.setActiveChatBox(this.minimized ? null : this.thread);
};


ChatBoxRep.prototype.getActive = function () {
  return this.thread == ChatModel.activeChatBox;
};


ChatBoxRep.prototype.onUpdate = function () {
  this.emit(this.EventType.UPDATE);
};



ChatBoxRep.prototype.EventType = {
  UPDATE: 'update'
};


module.exports = ChatBoxRep;
