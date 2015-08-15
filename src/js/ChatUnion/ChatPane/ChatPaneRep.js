var util = require('util'),
    Representative = require('../../vieux/Representative'),
    ChatRegime = require('../ChatRegime');

var ChatPaneRep = function(thread) {
  Representative.call(this);

  this.thread = thread;
  this.user = this.thread.user;
  this.owner = ChatRegime.owner;

  ChatRegime.on(ChatRegime.EventType.NEW_MESSAGE, this.onNewMessage.bind(this));
};

util.inherits(ChatPaneRep, Representative);

ChatPaneRep.prototype.onNewMessage = function(e) {
  e.data.some(function(data) {
    if (this.thread.id != data.thread.id)
      return;

    this.emit(e);

    return true;
  }, this);
};

ChatPaneRep.prototype.EventType = {
  NEW_MESSAGE: 'new message'
};

module.exports = ChatPaneRep;
