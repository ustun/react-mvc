var util = require('util'),
    Representative = require('../../veiux/Representative'),
    ChatRegime = require('../ChatRegime');

var ChatPaneRep = function(thread) {
  Representative.call(this);

  this.thread = thread;
  this.user = this.thread ? this.thread.user : {};

  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
};

util.inherits(ChatPaneRep, Representative);

ChatPaneRep.prototype.onSetActiveThread = function() {
  this.thread = ChatRegime.activeThread;

  this.emit(this.EventType.CHANGE_ACTIVE_THREAD);
};

ChatPaneRep.prototype.EventType = {
  CHANGE_ACTIVE_THREAD: 'change active thread'
};

module.exports = ChatPaneRep;
