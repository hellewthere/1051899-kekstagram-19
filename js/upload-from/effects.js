'use strict';

(function () {
  var effectsList = document.querySelector('.effects__list');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');

  var effects = {};
  var slider = window.slider;

  var currentEffect = null;
  // Наложение эффекта на изображение
  var effect = {
    none: {
      className: 'effects__preview--none',
    },
    chrome: {
      type: 'grayscale',
      className: 'effects__preview--chrome',
      max: 1,
      units: ''
    },
    sepia: {
      type: 'sepia',
      className: 'effects__preview--sepia',
      max: 1,
      units: ''
    },
    marvin: {
      type: 'invert',
      className: 'effects__preview--marvin',
      max: 100,
      units: '%'
    },
    phobos: {
      type: 'blur',
      className: 'effects__preview--phobos',
      max: 3,
      units: 'px'
    },
    heat: {
      type: 'brightness',
      className: 'effects__preview--heat',
      max: 3,
      units: ''
    }
  };

  var onEffectsListClick = function (evt) {
    slider.resetValues();
    currentEffect = effect[evt.target.value];
    fullsizePhoto.className = 'img-upload__preview ' + currentEffect.className;
    fullsizePhoto.style.filter = '';
    effectSlider.classList.add('hidden');

    if (evt.target.value !== 'none') {
      effectSlider.classList.remove('hidden');
    }
  };

  var resetEffect = function () {
    effectsList.querySelector('#effect-none').checked = true;
    fullsizePhoto.className = 'img-upload__preview ' + effect.none.className;
  };

  var setEffect = function (value) {
    if (currentEffect) {
      var filterValue = currentEffect.type + '(' + value * currentEffect.max + currentEffect.units + ')';
      fullsizePhoto.style.filter = filterValue;
    }
  };

  slider.initialize(setEffect);
  effectsList.addEventListener('change', onEffectsListClick);

  effects.resetValues = resetEffect;
  window.effects = effects;
})();
