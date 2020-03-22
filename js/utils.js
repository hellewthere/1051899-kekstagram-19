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

  var fisherYates = function (array, length) {
    var len = length < array.length ? length : array.length;
    var copy = array.slice(0);
    var result = [];
    var temp;

    for (var i = 0; i < len; i++) {
      temp = getRandomNumber(0, copy.length - 1);
      result.push(copy.splice(temp, 1)[0]);
    }

    return result;
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
  utils.fisherYates = fisherYates;
  utils.keyboard = keyboard;
  utils.debounce = debounce;
  window.utils = utils;
})();
