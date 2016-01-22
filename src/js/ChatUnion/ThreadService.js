var db = require('../db');

/**
 * @constructor
 */
function Threadservice() {}

Threadservice.prototype.getThreads = function (cb) {
  var dbCopy = JSON.parse(JSON.stringify(db.db));

  setTimeout(cb.bind(null, null, dbCopy), 300);
};

Threadservice.prototype.getUpdates = function (cb) {
  setTimeout(function () {
    var updatesCopy = JSON.parse(JSON.stringify(db.updates));

    cb(null, updatesCopy);
    db.updates.length = 0;
  }, 100);
};

Threadservice.prototype.getOwner = function(cb) {
  var ownerCopy = JSON.parse(JSON.stringify(db.owner));

  cb(null, ownerCopy);
};


module.exports = new Threadservice();
