var util = require('util'),
    Regime = require('../veiux/Regime'),
    ThreadsUndertaker = require('./ThreadsUndertaker'),
    ThreadStereotype = require('./ThreadStereotype');

var ChatRegime = function() {
  Regime.call(this);

  this.undertaker = ThreadsUndertaker;
  this.threads = [];
  this.activeThread = null;

  this.getThreads_();
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


ChatRegime.prototype.onInitialData = function(err, data) {

  if (err)
    return;

  this.threads = data.threads.map(function(thread) {
    return new ThreadStereotype(thread);
  });

  this.activeThread = this.threads[0];

  this.emit(this.EventType.INITIAL_DATA);
};


ChatRegime.prototype.setActive = function(thread) {
  this.activeThread = thread;

  this.emit(this.EventType.SET_ACTIVE_THREAD);
};


ChatRegime.prototype.EventType = {
  INITIAL_DATA: 'initial data',
  SET_ACTIVE_THREAD: 'set active thread'
};

module.exports = new ChatRegime();
