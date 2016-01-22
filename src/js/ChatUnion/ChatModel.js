var util = require('util'),
    model = require('../ReactMVC/model'),
    Threadservice = require('./Threadservice'),
    Threadentity = require('./Threadentity');

var Chatmodel = function() {
  model.call(this);

  this.service = Threadservice;
  this.threads = [];
  this.activeThread = null;

  this.chatBoxes = [];
  this.activeChatBox = null;

  this.owner = null;
};

util.inherits(Chatmodel, model);

Chatmodel.prototype.init = function() {
  this.getThreads_();
  this.getOwner_();
};

/**
 * Fetches initial threads
 *
 * @private
 */
Chatmodel.prototype.getThreads_ = function() {
  this.service.getThreads(this.onInitialData.bind(this));
};

Chatmodel.prototype.setupUpdates_ = function() {
  setTimeout(function() {
    this.service.getUpdates(this.onUpdate.bind(this));
  }.bind(this), 1000);
};

Chatmodel.prototype.onInitialData = function(err, data) {

  if(err)
    return;

  this.threads = data.threads.map(function(thread) {
    return new Threadentity(thread);
  });

  this.activeThread = this.threads[0];
  this.activeThread.active = true;

  this.emit(this.EventType.INITIAL_DATA);

  this.setupUpdates_();
};


Chatmodel.prototype.getThreadById = function(id) {
  return this.threads.filter(function(thread) {
    return thread.id == id;
  })[0];
};


Chatmodel.prototype.onUpdate = function(err, data) {
  if(err || !data.length)
    return this.setupUpdates_();

  data = data.filter(function(data) {
    var correspondingThread = this.getThreadById(data.thread.id);

    if(!correspondingThread)
      return false;

    var newMessages = data.thread.messages.slice(correspondingThread.messages.length);

    if(!newMessages.length)
      return false;

    correspondingThread.messages.push(newMessages);

    correspondingThread.unread = data.thread.id != this.activeThread.id &&
        (this.activeChatBox ? this.activeChatBox.id != data.thread.id : true);

    correspondingThread.active = data.thread.id == this.activeThread.id;

    return true;
  }, this);

  if(!data.length)
    return this.setupUpdates_();

  this.emit(this.EventType.NEW_MESSAGE, {data: data});

  this.setupUpdates_();
};

Chatmodel.prototype.setActiveChatBox = function(thread) {
  if(this.activeChatBox == thread)
    return;

  this.activeChatBox = thread;

  if(thread)
    this.activeChatBox.unread = false;

  this.emit(this.EventType.SET_ACTIVE_CHAT_BOX);
};

Chatmodel.prototype.addChatBox = function(thread) {
  if(this.chatBoxes.indexOf(thread) == -1)
    this.chatBoxes.push(thread);

  this.setActiveChatBox(thread);

  this.emit(this.EventType.ADD_CHAT_BOX, {thread: thread});
};

Chatmodel.prototype.removeChatBox = function(thread) {
  var i = this.chatBoxes.indexOf(thread);
  if (i == -1)
    return;

  this.chatBoxes.splice(i, 1, 0);
  this.setActiveChatBox(null);

  this.emit(this.EventType.REMOVE_CHAT_BOX, {thread: thread});
};

Chatmodel.prototype.getUnreadCount = function() {
  return this.threads.filter(function(thread) {
    return thread.unread;
  }).length;
};

Chatmodel.prototype.setActive = function(thread) {
  if(this.activeThread == thread)
    return;

  this.activeThread = thread;
  this.activeThread.unread = false;

  this.emit(this.EventType.SET_ACTIVE_THREAD);
};

Chatmodel.prototype.getOwner_ = function() {
  this.service.getOwner(function(err, owner) {
    this.owner = owner;
  }.bind(this));
};

Chatmodel.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  SET_ACTIVE_THREAD: 'set active thread',
  SET_ACTIVE_CHAT_BOX: 'set active chat box',
  NEW_MESSAGE: 'new message',
  ADD_CHAT_BOX: 'add chat box',
  REMOVE_CHAT_BOX: 'remove chat box'
};

module.exports = new Chatmodel();
