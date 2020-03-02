/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
  var arrayOfWords = tweet.split(' ');
  var resArray = [];
  for (var i = 0; i < arrayOfWords.length; i++) {
    if (arrayOfWords[i].indexOf('#') == 0) {
      resArray.push(arrayOfWords[i].slice(1));
    }
  }
  return resArray;
};
