var util = require('util'),
    Representative = require('../../ReactMVC/Representative'),
    Chatmodel = require('../Chatmodel');


var RootRep = function() {
  Representative.call(this);

  Chatmodel.on(Chatmodel.EventType.ADD_CHAT_BOX, this.onAddChatbox.bind(this));
  Chatmodel.on(Chatmodel.EventType.REMOVE_CHAT_BOX, this.onRemoveChatbox.bind(this));
};

util.inherits(RootRep, Representative);

RootRep.prototype.onAddChatbox = function(e) {
  this.emit(this.EventType.ADD_CHAT_BOX, e);
};

RootRep.prototype.onRemoveChatbox = function(e) {
  this.emit(this.EventType.REMOVE_CHAT_BOX, e);
};

RootRep.prototype.getActive = function() {
  return !!Chatmodel.activeChatBox;
};

RootRep.prototype.deactivateChatBox = function() {
  Chatmodel.setActiveChatBox(null);
};

RootRep.prototype.EventType = {
  ADD_CHAT_BOX: 'add chat box',
  REMOVE_CHAT_BOX: 'remove chat box',
  SET_ACTIVE_CHAT_BOX: 'set active chat box'
};

module.exports = RootRep;
