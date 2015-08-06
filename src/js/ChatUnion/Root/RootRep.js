var Representative = require('../../vieux/Representative'),
    util = require('util');

var RootRep = function() {
  Representative.call(this);
};

util.inherits(RootRep, Representative);

module.exports = RootRep;
