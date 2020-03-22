'use strict';

(function () {
  var SCALE_PARAM = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%',
  };

  var scale = document.querySelector('.scale');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var scaleControlValue = parseInt(scaleControlInput.value, 10);

  var photoSize = {};

  var resetPhotoSize = function () {
    scaleControlInput.value = SCALE_PARAM.MAX + SCALE_PARAM.MEASURE;
    fullsizePhoto.style.transform = '';
  };

  var setPhotoSize = function (value) {
    scaleControlInput.value = value + SCALE_PARAM.MEASURE;
    fullsizePhoto.style.transform = 'scale(' + value / 100 + ')';
  };

  var onScaleButtonClick = function (evt) {
    if (evt.target.classList.contains('scale__control--bigger') && scaleControlValue < SCALE_PARAM.MAX) {
      scaleControlValue = scaleControlValue + SCALE_PARAM.STEP;
    }
    if (evt.target.classList.contains('scale__control--smaller') && scaleControlValue > SCALE_PARAM.MIN) {
      scaleControlValue = scaleControlValue - SCALE_PARAM.STEP;
    }
    setPhotoSize(scaleControlValue);
  };

  scale.addEventListener('click', onScaleButtonClick);

  photoSize.resetValues = resetPhotoSize;
  window.photoSize = photoSize;
})();
