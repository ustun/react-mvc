var util = require('util'),
    Representative = require('../../veiux/Representative'),
    ChatRegime = require('../ChatRegime');

var MotherPaneRep = function() {
  Representative.call(this);

  ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
};

util.inherits(MotherPaneRep, Representative);

MotherPaneRep.prototype.onInitialData = function() {
  this.activeThread = ChatRegime.activeThread;
  this.threads = ChatRegime.threads;
  this.owner = ChatRegime.owner;

  this.threads.some(function(thread) {
    if (thread.user.username == this.activeThread.user.username)
      thread.active = true;
  }.bind(this));

  this.emit(this.EventType.INITIAL_DATA);
};

MotherPaneRep.prototype.onUpdate = function(e) {
  e.data.some(function(data) {
    if (data.thread.user.username == this.activeThread.user.username) {
      this.activeThread.active = true;
    }
  }.bind(this));

  this.emit(this.EventType.UPDATE, e);
};


MotherPaneRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = MotherPaneRep;
