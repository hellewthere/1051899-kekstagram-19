'use strict';

(function () {
  var HASHTAGS_MAX_COUNT = 5;
  var HASHTAG_REG_EXP = /^#([а-я]|[А-Я]|[a-zA-Z]){1,20}$/;
  var inputHashtags = document.querySelector('.text__hashtags');

  var userMessage = {
    lessThanFive: 'Нельзя указать больше пяти хэш-тегов',
    noDuplicates: 'один и тот же хэш-тег не может быть использован дважды',
    correct: 'Не верный формат хештега'
  };

  var onInputHashtagsKeyup = function () {
    var hashtagsArr = inputHashtags.value.toLowerCase().split(' ').filter(function (item) {
      return item !== '';
    });

    var isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;

    var isHashtagCorrect = hashtagsArr.every(function (item) {
      return HASHTAG_REG_EXP.test(item);
    });

    var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });

    inputHashtags.setCustomValidity('');

    if (!isHashtagsLessThanFive) {
      inputHashtags.setCustomValidity(userMessage.lessThanFive);
    }
    if (!isHashtagCorrect) {
      inputHashtags.setCustomValidity(userMessage.correct);
    }
    if (!isHastagsNoDuplicates) {
      inputHashtags.setCustomValidity(userMessage.noDuplicates);
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
