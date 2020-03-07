'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// форма редактирования изображения
var uploadOverlay = document.querySelector('.img-upload__overlay');
// поле выбора изображения, открывает попап загрузки
var uploadBtn = document.querySelector('#upload-file');
// кнопка для закрытия формы
var closeBtn = document.querySelector('#upload-cancel');
var uploadForm = document.querySelector('.img-upload__form');
var inputHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');


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

var onPopupEscPress = function (evt) {
  keyboard.isEscEvent(evt, closePopup);
};

// открывает попап
var openPopup = function () {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  // + обработчики
  closeBtn.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
};

// закрывает попап
var closePopup = function () {
  document.querySelector('body').classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  // - обработчики
  closeBtn.removeEventListener('click', openPopup);
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadBtn.addEventListener('change', openPopup);

// Если фокус находится в области ввода хэштега/комментария - окно закрываться не должно.
inputHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

inputHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

inputHashtags.addEventListener('keydown', function (evt) {
  keyboard.isEnterEvent(evt, openPopup);
});

textDescription.addEventListener('keydown', function (evt) {
  keyboard.isEnterEvent(evt, openPopup);
});

// Если окно открыто и фокус находится на кнопке закрытия окна,
// то нажатие клавиши ENTER должно приводить к закрытию диалога
closeBtn.addEventListener('keydown', function (evt) {
  keyboard.isEscEvent(evt, closePopup);
});


// Наложение эффекта на изображение
var filter = {
  none: {
    className: 'effects__preview--none',
  },
  chrome: {
    className: 'effects__preview--chrome',
  },
  sepia: {
    className: 'effects__preview--sepia',
  },
  marvin: {
    className: 'effects__preview--marvin',
  },
  phobos: {
    className: 'effects__preview--phobos',
  },
  heat: {
    className: 'effects__preview--heat',
  }
};

// НЕ ЗАБЫТЬ УДАЛИТЬ СТРОЧКУ НИЖЕ
// document.querySelector('.img-upload__overlay').classList.remove('hidden');
var effectsList = document.querySelector('.effects__list');
var fullsizePhoto = document.querySelector('.img-upload__preview');
var effectSlider = document.querySelector('.effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var onPinMouseup = function () {
};

var onFiltersListClick = function (evt) {
  fullsizePhoto.className = 'img-upload__preview ' + filter[evt.target.value].className;
  effectSlider.classList.add('hidden');
  if (evt.target.value !== 'none') {
    effectSlider.classList.remove('hidden');
  }
};
effectsList.addEventListener('change', onFiltersListClick);
effectLevelPin.addEventListener('mouseup', onPinMouseup);

// Изменение масштаба изображения

var scale = document.querySelector('.scale');
var scaleControlInput = document.querySelector('.scale__control--value');
var scaleControlValue = parseInt(scaleControlInput.value, 10);

var scaleParam = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  MEASURE: '%',
};

var setPhotoSize = function (value) {
  scaleControlInput.value = value + scaleParam.MEASURE;
  fullsizePhoto.style.transform = 'scale(' + value / 100 + ')';
};

var onScaleButtonClick = function (evt) {
  if (evt.target.classList.contains('scale__control--bigger') && scaleControlValue < scaleParam.MAX) {
    scaleControlValue = scaleControlValue + scaleParam.STEP;
  }
  if (evt.target.classList.contains('scale__control--smaller') && scaleControlValue > scaleParam.MIN) {
    scaleControlValue = scaleControlValue - scaleParam.STEP;
  }
  setPhotoSize(scaleControlValue);
};

scale.addEventListener('click', onScaleButtonClick);

// Валидация

// var HASHTAG_MAX_COUNT = 5;
// var HASHTAG_MAX_LENGTH = 20;
// var HASHTAG_MIN_LENGTH = 2;
// var hashtagArr = [];
// var HASHTAG_SEPARATOR = ' ';

// console.log(uploadForm);

var checkHashtagSymbol = function () {
  var hashtagsArr = inputHashtags.value.split(' ').filter(function (item) {
    return item !== '';
  });
  console.log(hashtagsArr);

  var isHashtagsLessThanFive = hashtagsArr.length <= 5;
  console.log(isHashtagsLessThanFive, 'Хештегов меньше 5');

  var isHashtagCorrect = hashtagsArr.every(function (item) {
    return /^#[a-zA-Z]{1,20}$/.test(item);
  });
  console.log(isHashtagCorrect, 'Хештег имеет валидный формат');

  var isHastagsNoDuplicates = hashtagsArr.every(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  console.log(isHastagsNoDuplicates, 'Нет дублирования одинаковых хештегов');

  return isHashtagCorrect && isHastagsNoDuplicates && isHashtagsLessThanFive;
};


var onUploadFormSubmit = function (evt) {
  evt.preventDefault();

  var isFormValid = checkHashtagSymbol();

  if (isFormValid) {
    // var formData = new FormData(form);
  } else {
    console.log('Форма невалидна');
  }
};

var onInputHashtagsBlur = function () {
  // console.log(1);
  if (checkHashtagSymbol()) {
    inputHashtags.style.border = '';
  } else {
    inputHashtags.style.border = '2px solid red';
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);
inputHashtags.addEventListener('blur', onInputHashtagsBlur);

