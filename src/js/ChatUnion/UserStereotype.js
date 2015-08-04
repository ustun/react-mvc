/**
 * @constructor
 *
 * @param {Object} user JSON object for a user
 */
function UserStereotype(user) {
    this.gender = user.gender;
    this.name = user.name;
    this.picture = user.picture;
}


UserStereotype.prototype.getFullName = function() {
    return capitalize(this.name.first) + ' ' + capitalize(this.name.last);
};


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}


module.exports = UserStereotype;
