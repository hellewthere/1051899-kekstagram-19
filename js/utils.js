'use strict';

(function () {
  var utils = {};

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var keyboard = {
    isEscEvent: function (evt, callback) {
      if (evt.key === ESC_KEY) {
        callback();
      }
    },
    isEnterEvent: function (evt, callback) {
      if (evt.key === ENTER_KEY) {
        callback();
      }
    }
  };

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNum = Math.floor(Math.random() * maxNumber);
    return randomNum > minNumber ? randomNum : minNumber;
  };

  utils.keyboard = keyboard;
  utils.getRandomNumber = getRandomNumber;
  // console.log(utils);
  window.utils = utils;
})();
