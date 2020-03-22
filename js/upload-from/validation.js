'use strict';

(function () {
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_REG_EXP = /^#([а-я]|[А-Я]|[a-zA-Z]|[0-9]){1,20}$/;

  var USER_MESSAGE = {
    LESS_THEN_FIVE: 'Нельзя указать больше пяти хэш-тегов',
    NO_DUPLICATES: 'один и тот же хэш-тег не может быть использован дважды',
    CORRECT: 'Не верный формат хештега'
  };

  var inputHashtags = document.querySelector('.text__hashtags');

  var onInputHashtagsKeyup = function () {
    var hashtagsArr = inputHashtags.value.replace(/ +/g, ' ').trim().toLowerCase().split(' ');

    var isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

    var isHashtagCorrect = hashtagsArr.every(function (item) {
      return HASHTAG_REG_EXP.test(item);
    });

    var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    inputHashtags.setCustomValidity('');

    if (!isHashtagsLessThanFive) {
      inputHashtags.setCustomValidity(USER_MESSAGE.LESS_THEN_FIVE);
    }

    if (!isHashtagCorrect) {
      inputHashtags.setCustomValidity(USER_MESSAGE.CORRECT);
    }

    if (!isHastagsNoDuplicates) {
      inputHashtags.setCustomValidity(USER_MESSAGE.NO_DUPLICATES);
    }

    if (isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive) {
      inputHashtags.style.border = '';
      inputHashtags.style.background = '';
    } else {
      inputHashtags.style.border = '2px solid red';
      inputHashtags.style.background = 'pink';
    }
  };

  inputHashtags.addEventListener('keyup', onInputHashtagsKeyup);
})();
