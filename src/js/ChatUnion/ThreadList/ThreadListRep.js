var Representative = require('../../vieux/Representative'),
    ChatRegime = require('../ChatRegime'),
    util = require('util');

var ThreadListRep = function() {
  Representative.call(this);

  ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  ChatRegime.on(ChatRegime.EventType.UPDATE, this.onUpdate.bind(this));
};

util.inherits(ThreadListRep, Representative);

ThreadListRep.prototype.onInitialData = function() {
  this.threads = ChatRegime.threads;
  this.emit(this.EventType.INITIAL_DATA);
};

ThreadListRep.prototype.onUpdate = function(e) {
  this.emit(this.EventType.UPDATE, e);
};

/**
 * @enum {string}
 */
ThreadListRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  UPDATE: 'update'
};

module.exports = ThreadListRep;