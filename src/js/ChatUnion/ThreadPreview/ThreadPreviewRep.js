var Representative = require('../../veiux/Representative'),
    ChatRegime = require('../ChatRegime'),
    util = require('util');

var ThreadPreviewRep = function(thread) {
  Representative.call(this);
  this.thread = thread;
  this.user = thread.user;
  this.lastMessage = thread.messages.slice(-1);
  this.active = ChatRegime.activeThread == thread;

  // TODO:
  // This will throw warnings as there are more than 10 listeners for the same event.
  // This Culture should be a subculture and its Parent should listen this event instead
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
};

util.inherits(ThreadPreviewRep, Representative);


ThreadPreviewRep.prototype.setActive = function() {
  ChatRegime.setActive(this.thread);
};


ThreadPreviewRep.prototype.onSetActiveThread = function() {
  var newActive = ChatRegime.activeThread == this.thread;

  if (this.active != newActive) {
    this.active = newActive;

    this.emit(this.EventType.UPDATE_ACTIVE_THREAD);
  }
};


ThreadPreviewRep.prototype.EventType = {
  UPDATE_ACTIVE_THREAD: 'update active thread'
};


module.exports = ThreadPreviewRep;
