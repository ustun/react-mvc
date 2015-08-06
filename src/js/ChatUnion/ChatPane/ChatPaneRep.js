var util = require('util'),
    Representative = require('../../veiux/Representative'),
    ChatRegime = require('../ChatRegime');

var ChatPaneRep = function(thread) {
  Representative.call(this);

  this.thread = thread;
  this.user = this.thread.user;

  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onSetActiveThread.bind(this));
  ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
};

util.inherits(ChatPaneRep, Representative);

ChatPaneRep.prototype.onSetActiveThread = function() {
  this.thread = ChatRegime.activeThread;

  this.emit(this.EventType.CHANGE_ACTIVE_THREAD);
};

ChatPaneRep.prototype.onUpdate = function(e) {
  e.data.some(function(data) {

    if(data.thread.id != this.thread.id)
      return;

    this.emit(this.EventType.UPDATE, e);

    return true;
  }, this);
};

ChatPaneRep.prototype.EventType = {
  CHANGE_ACTIVE_THREAD: 'change active thread',
  UPDATE: 'update'
};

module.exports = ChatPaneRep;
