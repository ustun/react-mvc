var util = require('util'),
    Regime = require('../vieux/Regime'),
    ThreadUndertaker = require('./ThreadUndertaker'),
    ThreadStereotype = require('./ThreadStereotype');

var ChatRegime = function() {
  Regime.call(this);

  this.undertaker = ThreadUndertaker;
  this.threads = [];
  this.activeThread = null;

  this.getThreads_();
  this.setupUpdates_();
  this.getOwner_();
};

util.inherits(ChatRegime, Regime);


/**
 * Fetches initial threads
 *
 * @private
 */
ChatRegime.prototype.getThreads_ = function() {
  this.undertaker.getThreads(this.onInitialData.bind(this));
};

ChatRegime.prototype.setupUpdates_ = function() {
  //setTimeout(function() {
  //  this.undertaker.getUpdates(this.onUpdate.bind(this));
  //}.bind(this), 1000);
};

ChatRegime.prototype.onInitialData = function(err, data) {

  if(err)
    return;

  this.threads = data.threads.map(function(thread) {
    return new ThreadStereotype(thread);
  });

  this.activeThread = this.threads[0];

  this.emit(this.EventType.INITIAL_DATA);
};


ChatRegime.prototype.getThreadById = function(id) {
  return this.threads.filter(function(thread) {
    return thread.id == id;
  })[0];
};


ChatRegime.prototype.onUpdate = function(err, data) {
  if(err || !data.length)
    return this.setupUpdates_();

  data.forEach(function(d, i) {
    var correspondingThread = this.getThreadById(d.thread.id);
    correspondingThread.messages.push(d.thread.messages.slice(correspondingThread.messages.length));
    correspondingThread.unread = d.thread.id != this.activeThread.id;
  }, this);

  this.emit(this.EventType.UPDATE, {data: data});

  this.setupUpdates_();
};

ChatRegime.prototype.getUnreadCount = function() {
  return this.threads.filter(function(thread) {
    return thread.unread;
  }).length;
};

ChatRegime.prototype.setActive = function(thread) {
  this.activeThread = thread;
  this.activeThread.unread = false;

  this.emit(this.EventType.SET_ACTIVE_THREAD);
};

ChatRegime.prototype.getOwner_ = function() {
  this.undertaker.getOwner(function(err, owner) {
    this.owner = owner;
  }.bind(this));
};

ChatRegime.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  SET_ACTIVE_THREAD: 'set active thread',
  UPDATE: 'update'
};

module.exports = new ChatRegime();
