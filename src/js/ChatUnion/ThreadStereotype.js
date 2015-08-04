var UserStereotype = require('./UserStereotype');

/**
 * @constructor

 * @param {Object} thread JSON object for a thread
 */
function ThreadStereotype(thread) {
    this.user = new UserStereotype(thread.user);
    this.messages = thread.messages;
    this.active = false;
}


module.exports = ThreadStereotype;
