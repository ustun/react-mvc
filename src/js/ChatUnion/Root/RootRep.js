var Representative = require('../../veiux/Representative'),
    util = require('util');

var RootRep = function() {
  Representative.call(this);
};

util.inherits(RootRep, Representative);

module.exports = RootRep;
