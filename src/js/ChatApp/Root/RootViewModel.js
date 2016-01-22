var util = require('util'),
    ViewModelresentative = require('../../ReactMVC/ViewModelresentative'),
    ChatModel = require('../ChatModel');


var RootViewModel = function() {
  ViewModelresentative.call(this);

  ChatModel.on(ChatModel.EventType.ADD_CHAT_BOX, this.onAddChatbox.bind(this));
  ChatModel.on(ChatModel.EventType.REMOVE_CHAT_BOX, this.onRemoveChatbox.bind(this));
};

util.inherits(RootViewModel, ViewModelresentative);

RootViewModel.prototype.onAddChatbox = function(e) {
  this.emit(this.EventType.ADD_CHAT_BOX, e);
};

RootViewModel.prototype.onRemoveChatbox = function(e) {
  this.emit(this.EventType.REMOVE_CHAT_BOX, e);
};

RootViewModel.prototype.getActive = function() {
  return !!ChatModel.activeChatBox;
};

RootViewModel.prototype.deactivateChatBox = function() {
  ChatModel.setActiveChatBox(null);
};

RootViewModel.prototype.EventType = {
  ADD_CHAT_BOX: 'add chat box',
  REMOVE_CHAT_BOX: 'remove chat box',
  SET_ACTIVE_CHAT_BOX: 'set active chat box'
};

module.exports = RootViewModel;
