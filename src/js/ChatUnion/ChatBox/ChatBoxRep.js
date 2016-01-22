var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    ChatRegime = require('../ChatRegime');

/**
 *
 * @constructor
 * @extends {Representative}
 *
 * @param {ThreadStereotype} thread ThreadStereotype instance
 */
var ChatBoxRep = function(thread) {
  Representative.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.minimized = false;

  ChatRegime.on(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(ChatBoxRep, Representative);


ChatBoxRep.prototype.setActive = function () {
  ChatRegime.setActiveChatBox(this.thread);
};


ChatBoxRep.prototype.close = function () {
  ChatRegime.removeChatBox(this.thread);
};


ChatBoxRep.prototype.minimize = function () {
  this.minimized = !this.minimized;

  ChatRegime.setActiveChatBox(this.minimized ? null : this.thread);
};


ChatBoxRep.prototype.getActive = function () {
  return this.thread == ChatRegime.activeChatBox;
};


ChatBoxRep.prototype.onUpdate = function () {
  this.emit(this.EventType.UPDATE);
};



ChatBoxRep.prototype.EventType = {
  UPDATE: 'update'
};


module.exports = ChatBoxRep;
