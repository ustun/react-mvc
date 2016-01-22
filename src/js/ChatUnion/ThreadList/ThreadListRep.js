var Representative = require('../../ReactMVC/Representative'),
    ChatRegime = require('../ChatRegime'),
    util = require('util');

var ThreadListRep = function() {
  Representative.call(this);

  ChatRegime.on(ChatRegime.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  ChatRegime.on(ChatRegime.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ThreadListRep, Representative);

ThreadListRep.prototype.onInitialData = function() {
  this.threads = ChatRegime.threads;
  this.emit(this.EventType.INITIAL_DATA);
};

ThreadListRep.prototype.onNewMessage = function(e) {
  this.emit(this.EventType.NEW_MESSAGE, e);
};

/**
 * @enum {string}
 */
ThreadListRep.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  NEW_MESSAGE: 'new message'
};

module.exports = ThreadListRep;