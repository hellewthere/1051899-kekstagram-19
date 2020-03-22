'use strict';

(function () {
  var ScaleParam = {
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
    scaleControlInput.value = ScaleParam.MAX + ScaleParam.MEASURE;
    fullsizePhoto.style.transform = '';
  };

  var setPhotoSize = function (value) {
    scaleControlInput.value = value + ScaleParam.MEASURE;
    fullsizePhoto.style.transform = 'scale(' + value / 100 + ')';
  };

  var onScaleButtonClick = function (evt) {
    if (evt.target.classList.contains('scale__control--bigger') && scaleControlValue < ScaleParam.MAX) {
      scaleControlValue = scaleControlValue + ScaleParam.STEP;
    }
    if (evt.target.classList.contains('scale__control--smaller') && scaleControlValue > ScaleParam.MIN) {
      scaleControlValue = scaleControlValue - ScaleParam.STEP;
    }
    setPhotoSize(scaleControlValue);
  };

  scale.addEventListener('click', onScaleButtonClick);

  photoSize.resetValues = resetPhotoSize;
  window.photoSize = photoSize;
})();
