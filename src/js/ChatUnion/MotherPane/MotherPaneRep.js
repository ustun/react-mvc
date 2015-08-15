var util = require('util'),
    Representative = require('../../vieux/Representative'),
    ChatRegime = require('../ChatRegime');

var MotherPaneRep = function() {
  Representative.call(this);

  ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onUpdate.bind(this));
  ChatRegime.on(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
};

util.inherits(MotherPaneRep, Representative);

MotherPaneRep.prototype.getThreads = function() {
  return ChatRegime.threads;
};

MotherPaneRep.prototype.getActiveThread = function() {
  return ChatRegime.activeThread;
};

MotherPaneRep.prototype.onUpdate = function() {
  this.emit(this.EventType.UPDATE);
};

MotherPaneRep.prototype.setActive = function(thread) {
  ChatRegime.setActive(thread);
};

MotherPaneRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MotherPaneRep;
