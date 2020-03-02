/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  var resArray = [];
  for (var i = 0; i < hashtags.length; i++) {
    var word = hashtags[i];
    if (!resArray.includes(word.toLowerCase())) {
      resArray.push(word.toLowerCase());
    }
  }
  return resArray.join(', ');
};