var util = require('util'),
    Representative = require('../../veiux/Representative'),
    ChatRegime = require('../ChatRegime');

var MotherPaneRep = function() {
  Representative.call(this);

  ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
};

util.inherits(MotherPaneRep, Representative);

MotherPaneRep.prototype.onInitialData = function() {
  this.activeThread = ChatRegime.activeThread;
  this.threads = ChatRegime.threads;

  this.threads.some(function(thread) {
    if (thread.user.username == this.activeThread.user.username)
      thread.active = true;
  }.bind(this));

  this.emit(this.EventType.INITIAL_DATA);
};


MotherPaneRep.prototype.EventType = {
  INITIAL_DATA: 'initial data'
};

module.exports = MotherPaneRep;
