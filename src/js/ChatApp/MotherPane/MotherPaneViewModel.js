var util = require('util'),
    ViewModel = require('../../ReactMVC/ViewModel'),
    ChatModel = require('../ChatModel');

var MotherPaneViewModel = function() {
  ViewModel.call(this);

  ChatModel.on(ChatModel.EventType.INITIAL_DATA, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
};

util.inherits(MotherPaneViewModel, ViewModel);

MotherPaneViewModel.prototype.getThreads = function() {
  return ChatModel.threads;
};

MotherPaneViewModel.prototype.getActiveThread = function() {
  return ChatModel.activeThread;
};

MotherPaneViewModel.prototype.onUpdate = function() {
  this.emit(this.EventType.UPDATE);
};

MotherPaneViewModel.prototype.setActive = function(thread) {
  ChatModel.setActive(thread);
};

MotherPaneViewModel.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MotherPaneViewModel;
