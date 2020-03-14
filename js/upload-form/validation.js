'use strict';
// Валидация
(function () {
  var validation = {};
  var HASHTAGS_MAX_COUNT = 5;
  var inputHashtags = document.querySelector('.text__hashtags');

  var checkHashtagSymbol = function () {
    var hashtagsArr = inputHashtags.value.split(' ').filter(function (item) {
      return item !== '';
    });
    // console.log(hashtagsArr);

    var isHashtagsLessThanFive = hashtagsArr.length <= HASHTAGS_MAX_COUNT;
    // console.log(isHashtagsLessThanFive, 'Хештегов меньше 5');

    var isHashtagCorrect = hashtagsArr.every(function (item) {
      return /^#[a-zA-Z]{1,20}$/.test(item);
    });
    // console.log(isHashtagCorrect, 'Хештег имеет валидный формат');

    var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
      return array.indexOf(item) === index;
    });
    // console.log(isHastagsNoDuplicates, 'Нет дублирования одинаковых хештегов');

    return isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive;
  };

  var onInputHashtagsBlur = function () {
    if (checkHashtagSymbol()) {
      inputHashtags.style.border = '';
      inputHashtags.style.background = '';
    } else {
      inputHashtags.style.border = '2px solid red';
      inputHashtags.style.background = 'pink';
    }
  };

  inputHashtags.addEventListener('blur', onInputHashtagsBlur);

  validation.checkForm = checkHashtagSymbol;
  window.validation = validation;
})();
