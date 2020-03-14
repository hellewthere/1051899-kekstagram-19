'use strict';
// Наложение эффекта на изображение

(function () {
  var effectsList = document.querySelector('.effects__list');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');

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
})();
