var Representative = require('../../ReactMVC/Representative'),
    Chatmodel = require('../Chatmodel'),
    util = require('util');

var ThreadListRep = function() {
  Representative.call(this);

  Chatmodel.on(Chatmodel.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  Chatmodel.on(Chatmodel.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ThreadListRep, Representative);

ThreadListRep.prototype.onInitialData = function() {
  this.threads = Chatmodel.threads;
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