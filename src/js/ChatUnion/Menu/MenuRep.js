var Representative = require('../../veiux/Representative'),
    util = require('util');

var MenuRep = function() {
  Representative.call(this);
};

util.inherits(MenuRep, Representative);

module.exports = MenuRep;
