var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    Chatmodel = require('../Chatmodel');

var MotherPaneRep = function() {
  Representative.call(this);

  Chatmodel.on(Chatmodel.EventType.INITIAL_DATA, this.onUpdate.bind(this));
  Chatmodel.on(Chatmodel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
};

util.inherits(MotherPaneRep, Representative);

MotherPaneRep.prototype.getThreads = function() {
  return Chatmodel.threads;
};

MotherPaneRep.prototype.getActiveThread = function() {
  return Chatmodel.activeThread;
};

MotherPaneRep.prototype.onUpdate = function() {
  this.emit(this.EventType.UPDATE);
};

MotherPaneRep.prototype.setActive = function(thread) {
  Chatmodel.setActive(thread);
};

MotherPaneRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MotherPaneRep;
