'use strict';

(function () {
  var utils = {};

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNum = Math.floor(Math.random() * maxNumber);
    return randomNum > minNumber ? randomNum : minNumber;
  };

  utils.getRandomNumber = getRandomNumber;
  console.log(utils);

  window.utils = utils;
  console.log(window);

})();
