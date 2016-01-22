var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    ChatModel = require('../ChatModel');

var MotherPaneRep = function() {
  Representative.call(this);

  ChatModel.on(ChatModel.EventType.INITIAL_DATA, this.onUpdate.bind(this));
  ChatModel.on(ChatModel.EventType.SET_ACTIVE_THREAD, this.onUpdate.bind(this));
};

util.inherits(MotherPaneRep, Representative);

MotherPaneRep.prototype.getThreads = function() {
  return ChatModel.threads;
};

MotherPaneRep.prototype.getActiveThread = function() {
  return ChatModel.activeThread;
};

MotherPaneRep.prototype.onUpdate = function() {
  this.emit(this.EventType.UPDATE);
};

MotherPaneRep.prototype.setActive = function(thread) {
  ChatModel.setActive(thread);
};

MotherPaneRep.prototype.EventType = {
  UPDATE: 'update'
};

module.exports = MotherPaneRep;
