'use strict';
// Изменение масштаба изображения

(function () {
  var scale = document.querySelector('.scale');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var fullsizePhoto = document.querySelector('.img-upload__preview');
  var scaleControlValue = parseInt(scaleControlInput.value, 10);

  var photoSize = {};

  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%',
  };

  var resetPhotoSize = function () {
    scaleControlInput.value = scaleParam.MAX + scaleParam.MEASURE;
    fullsizePhoto.style.transform = '';
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

  photoSize.resetValues = resetPhotoSize;
  window.photoSize = photoSize;
})();
