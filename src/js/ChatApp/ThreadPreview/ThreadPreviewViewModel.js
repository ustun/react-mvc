var ViewModel = require('../../ReactMVC/ViewModel'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var ThreadPreviewViewModel = function(thread) {
  ViewModel.call(this);
  this.thread = thread;
  this.user = thread.user;
  this.lastMessage = thread.messages.slice(-1);

  // TODO: This View should be a subView and its Parent should listen this event instead
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_CHAT_BOX, this.onSetActiveChatBox.bind(this));
};

util.inherits(ThreadPreviewViewModel, ViewModel);

ThreadPreviewViewModel.prototype.getActive = function() {
  return this.thread == ChatModel.activeThread;
};

ThreadPreviewViewModel.prototype.onUpdate = function(e) {
  e.data.some(function(data) {
    if(data.thread.id != this.thread.id)
      return;

    this.lastMessage = this.thread.messages.slice(-1);

    this.emit(this.EventType.NEW_MESSAGE);

    return true;
  }, this);
};

ThreadPreviewViewModel.prototype.onSetActiveThread = function() {
  this.emit(this.EventType.SET_ACTIVE_THREAD);
};

ThreadPreviewViewModel.prototype.onSetActiveChatBox = function() {
  this.emit(this.EventType.SET_ACTIVE_CHAT_BOX);
};

ThreadPreviewViewModel.prototype.EventType = {
  SET_ACTIVE_THREAD: 'set active thread',
  NEW_MESSAGE: 'new message',
  SET_ACTIVE_CHAT_BOX: 'set active chat box'
};


module.exports = ThreadPreviewViewModel;
