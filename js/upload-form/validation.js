'use strict';

(function () {
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_INVALID = 'Неверный формат';
  var HASHTAG_REG_EXP = /^#[a-zA-Z]{1,20}$/;
  var inputHashtags = document.querySelector('.text__hashtags');
  var validation = {};

  var checkHashtagSymbol = function () {
    var hashtagsArr = inputHashtags.value.split(' ').filter(function (item) {
      return item !== '';
    });

    var isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

    var isHashtagCorrect = hashtagsArr.every(function (item) {
      return HASHTAG_REG_EXP.test(item);
    });

    var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    return isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive;
  };

  var onInputHashtagsBlur = function () {
    if (checkHashtagSymbol()) {
      inputHashtags.style.border = '';
      inputHashtags.style.background = '';
      inputHashtags.setCustomValidity('');
    } else {
      inputHashtags.style.border = '2px solid red';
      inputHashtags.style.background = 'pink';
      inputHashtags.setCustomValidity(HASHTAG_INVALID);
    }
  };

  inputHashtags.addEventListener('blur', onInputHashtagsBlur);

  validation.checkForm = checkHashtagSymbol;
  window.validation = validation;
})();
