var UserEntity = require('./UserEntity');

/**
 * @constructor

 * @param {Object} thread JSON object for a thread
 */
function ThreadEntity(thread) {
  this.id = thread.id;
  this.user = new UserEntity(thread.user);
  this.messages = thread.messages;
  this.active = false;
  this.unread = false;
}

ThreadEntity.prototype.updateMessages = function (newMessages) {
  this.messages = newMessages;
};

module.exports = ThreadEntity;
