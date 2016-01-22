var Representative = require('../../ReactMVC/Representative'),
    ChatModel = require('../ChatModel'),
    util = require('util');

var ThreadListRep = function() {
  Representative.call(this);

  ChatModel.on(ChatModel.EventType.INITIAL_DATA, this.onInitialData.bind(this));
  ChatModel.on(ChatModel.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ThreadListRep, Representative);

ThreadListRep.prototype.onInitialData = function() {
  this.threads = ChatModel.threads;
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