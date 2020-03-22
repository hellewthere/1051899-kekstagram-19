'use strict';

(function () {
  var effectsList = document.querySelector('.effects__list');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');

  var effects = {};
  var slider = window.slider;

  var currentEffect = null;

  var Effect = {
    NONE: {
      className: 'effects__preview--none',
    },
    CHROME: {
      type: 'grayscale',
      className: 'effects__preview--chrome',
      min: 0,
      max: 1,
      units: ''
    },
    SEPIA: {
      type: 'sepia',
      className: 'effects__preview--sepia',
      min: 0,
      max: 1,
      units: ''
    },
    MARVIN: {
      type: 'invert',
      className: 'effects__preview--marvin',
      min: 0,
      max: 100,
      units: '%'
    },
    PHOBOS: {
      type: 'blur',
      className: 'effects__preview--phobos',
      min: 0,
      max: 3,
      units: 'px'
    },
    HEAT: {
      type: 'brightness',
      className: 'effects__preview--heat',
      min: 1,
      max: 2,
      units: ''
    }
  };

  var onEffectsListClick = function (evt) {
    slider.resetValues();
    currentEffect = Effect[evt.target.value.toUpperCase()];
    fullsizePhoto.className = 'img-upload__preview ' + currentEffect.className;
    fullsizePhoto.style.filter = '';
    effectSlider.classList.add('hidden');

    if (evt.target.value !== 'none') {
      effectSlider.classList.remove('hidden');
    }
  };

  var resetEffect = function () {
    effectsList.querySelector('#effect-none').checked = true;
    fullsizePhoto.className = 'img-upload__preview ' + Effect.NONE.className;
  };

  var setEffect = function (value) {
    if (currentEffect) {
      var filterValue = currentEffect.type + '(' + (value * currentEffect.max + currentEffect.min) + currentEffect.units + ')';
      fullsizePhoto.style.filter = filterValue;
    }
  };

  slider.initialize(setEffect);
  effectsList.addEventListener('change', onEffectsListClick);

  effects.resetValues = resetEffect;
  window.effects = effects;
})();
