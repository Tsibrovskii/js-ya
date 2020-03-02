// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var params = command.split(' ');
  var operation = params[0];
  if (operation === 'ADD') {
    addPhone(params[1], params[2].split(','));
  } else if (operation === 'REMOVE_PHONE') {
    return removePhone(params[1]);
  } else if (operation === 'SHOW') {
    return showPhoneBook();
  }
};

function addPhone(name, phones) {
  if (!phoneBook.hasOwnProperty(name)) {
    phoneBook[name] = [];
  }
  for (var i = 0; i < phones.length; i++) {
    if (!phoneBook[name].includes(phones[i])) {
      phoneBook[name].push(phones[i]);
    }
  }
}

function removePhone(phone) {
  var keys = Object.keys(phoneBook);
  for (var i = 0; i < keys.length; i++) {
    if (phoneBook[keys[i]].includes(phone)) {
      phoneBook[keys[i]] = phoneBook[keys[i]].filter(function(element) {
        return element !== phone;
      });
      if (phoneBook[keys[i]].length === 0) {
        delete phoneBook[keys[i]];
      }
      return true;
    }
  }
  return false;
}

function showPhoneBook() {
  var result = [];
  var keys = Object.keys(phoneBook).sort();
  for (var i = 0; i < keys.length; i++) {
    var lineResult = keys[i] + ': ' + phoneBook[keys[i]].join(', ');
    result.push(lineResult);
  }
  return result;
}