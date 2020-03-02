/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var offsetInitial = new Date().getTimezoneOffset();
    var initialDate = new Date(2011, 1, 1, hours, minutes - offsetInitial, 0);
    var res = initialDate.getTime() + interval*60000;
    var rezHours = new Date(res).getUTCHours().toString();
    var rezMinutes = new Date(res).getUTCMinutes().toString();
    if (parseInt(rezHours) < 10) {
        rezHours = '0' + rezHours;
    }
    if (parseInt(rezMinutes) < 10) {
        rezMinutes = '0' + rezMinutes;
    }
    var rez = rezHours + ':' + rezMinutes;
    return rez;
};
