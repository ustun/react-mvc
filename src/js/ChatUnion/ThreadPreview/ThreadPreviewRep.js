var Representative = require('../../vieux/Representative'),
    ChatRegime = require('../ChatRegime'),
    util = require('util');

var ThreadPreviewRep = function(thread) {
  Representative.call(this);
  this.thread = thread;
  this.user = thread.user;
  this.lastMessage = thread.messages.slice(-1);

  // TODO: This Culture should be a subculture and its Parent should listen this event instead
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
  ChatRegime.on(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate.bind(this));
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.onSetActiveChatBox.bind(this));
};

util.inherits(ThreadPreviewRep, Representative);

ThreadPreviewRep.prototype.getActive = function() {
  return this.thread == ChatRegime.activeThread;
};

ThreadPreviewRep.prototype.onUpdate = function(e) {
  e.data.some(function(data) {
    if(data.thread.id != this.thread.id)
      return;

    this.lastMessage = this.thread.messages.slice(-1);

    this.emit(this.EventType.NEW_MESSAGE);

    return true;
  }, this);
};

ThreadPreviewRep.prototype.onSetActiveThread = function() {
  this.emit(this.EventType.SET_ACTIVE_THREAD);
};

ThreadPreviewRep.prototype.onSetActiveChatBox = function() {
  this.emit(this.EventType.SET_ACTIVE_CHAT_BOX);
};

ThreadPreviewRep.prototype.EventType = {
  SET_ACTIVE_THREAD: 'set active thread',
  NEW_MESSAGE: 'new message',
  SET_ACTIVE_CHAT_BOX: 'set active chat box'
};


module.exports = ThreadPreviewRep;
