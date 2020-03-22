'use strict';

(function () {
  var effectsList = document.querySelector('.effects__list');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var effectSlider = document.querySelector('.effect-level');

  var effects = {};
  var slider = window.slider;

  var currentEffect = null;

  var effectToType = {
    none: {
      className: 'effects__preview--none',
    },
    chrome: {
      name: 'grayscale',
      className: 'effects__preview--chrome',
      min: 0,
      max: 1,
      units: ''
    },
    sepia: {
      name: 'sepia',
      className: 'effects__preview--sepia',
      min: 0,
      max: 1,
      units: ''
    },
    marvin: {
      name: 'invert',
      className: 'effects__preview--marvin',
      min: 0,
      max: 100,
      units: '%'
    },
    phobos: {
      name: 'blur',
      className: 'effects__preview--phobos',
      min: 0,
      max: 3,
      units: 'px'
    },
    heat: {
      name: 'brightness',
      className: 'effects__preview--heat',
      min: 1,
      max: 2,
      units: ''
    }
  };

  var onEffectsListClick = function (evt) {
    slider.resetValues();
    currentEffect = effectToType[evt.target.value];
    fullsizePhoto.className = 'img-upload__preview ' + currentEffect.className;
    fullsizePhoto.style.filter = '';
    effectSlider.classList.add('hidden');

    if (evt.target.value !== 'none') {
      effectSlider.classList.remove('hidden');
    }
  };

  var resetEffect = function () {
    effectsList.querySelector('#effect-none').checked = true;
    fullsizePhoto.className = 'img-upload__preview ' + effectToType['none'].className;
  };

  var setEffect = function (value) {
    if (currentEffect) {
      var filterValue = currentEffect.name + '(' + (value * currentEffect.max + currentEffect.min) + currentEffect.units + ')';
      fullsizePhoto.style.filter = filterValue;
    }
  };

  slider.initialize(setEffect);
  effectsList.addEventListener('change', onEffectsListClick);

  effects.resetValues = resetEffect;
  window.effects = effects;
})();
