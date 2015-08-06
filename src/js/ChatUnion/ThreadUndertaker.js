var db = require('../db');

/**
 * @constructor
 */
function ThreadUndertaker() {}

ThreadUndertaker.prototype.getThreads = function (cb) {
  var dbCopy = JSON.parse(JSON.stringify(db.db));

  setTimeout(cb.bind(null, null, dbCopy), 300);
};

ThreadUndertaker.prototype.getUpdates = function (cb) {
  setTimeout(function () {
    var updatesCopy = JSON.parse(JSON.stringify(db.updates));

    cb(null, updatesCopy);
    db.updates.length = 0;
  }, 100);
};

ThreadUndertaker.prototype.getOwner = function(cb) {
  var ownerCopy = JSON.parse(JSON.stringify(db.owner));

  cb(null, ownerCopy);
};


module.exports = new ThreadUndertaker();
