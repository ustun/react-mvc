var Userentity = require('./Userentity');

/**
 * @constructor

 * @param {Object} thread JSON object for a thread
 */
function Threadentity(thread) {
  this.id = thread.id;
  this.user = new Userentity(thread.user);
  this.messages = thread.messages;
  this.active = false;
  this.unread = false;
}

Threadentity.prototype.updateMessages = function (newMessages) {
  this.messages = newMessages;
};

module.exports = Threadentity;
