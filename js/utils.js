'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var utils = {};

  var debounce = function (callBack, intervalal) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack.apply(null, parameters);
      }, intervalal);
    };
  };

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNum = Math.floor(Math.random() * maxNumber);
    return randomNum > minNumber ? randomNum : minNumber;
  };

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

  utils.getRandomNumber = getRandomNumber;
  utils.keyboard = keyboard;
  utils.debounce = debounce;
  window.utils = utils;
})();
