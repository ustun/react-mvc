var util = require('util'),
    ViewModelresentative = require('../../ReactMVC/ViewModelresentative'),
    ChatModel = require('../ChatModel');

/**
 *
 * @constructor
 * @extends {ViewModelresentative}
 *
 * @param {Threadentity} thread Threadentity instance
 */
var ChatBoxViewModel = function(thread) {
  ViewModelresentative.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.minimized = false;

  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate.bind(this));
};

util.inherits(ChatBoxViewModel, ViewModelresentative);


ChatBoxViewModel.prototype.setActive = function () {
  ChatModel.setActiveChatBox(this.thread);
};


ChatBoxViewModel.prototype.close = function () {
  ChatModel.removeChatBox(this.thread);
};


ChatBoxViewModel.prototype.minimize = function () {
  this.minimized = !this.minimized;

  ChatModel.setActiveChatBox(this.minimized ? null : this.thread);
};


ChatBoxViewModel.prototype.getActive = function () {
  return this.thread == ChatModel.activeChatBox;
};


ChatBoxViewModel.prototype.onUpdate = function () {
  this.emit(this.EventType.UPDATE);
};



ChatBoxViewModel.prototype.EventType = {
  UPDATE: 'update'
};


module.exports = ChatBoxViewModel;
