'use strict';

(function () {
  var rangeSlider = document.querySelector('.effect-level');
  var pin = rangeSlider.querySelector('.effect-level__pin');
  var barInput = rangeSlider.querySelector('.effect-level__value');
  var barDepth = rangeSlider.querySelector('.effect-level__depth');
  var slider = {};

  var initializeSlider = function (callBack) {
    pin.addEventListener('mousedown', function (evt) {
      if (typeof callBack === 'function') {
        onPinMousedown(evt, callBack);
      }
    });
  };

  var resetSliderValues = function () {
    pin.style.left = 100 + '%';
    barDepth.style.width = 100 + '%';
    barInput.value = 100;
  };

  var updateSliderValues = function (ratio) {
    pin.style.left = (ratio * 100) + '%';
    barDepth.style.width = (ratio * 100) + '%';
    barInput.value = Math.round(ratio * 100);
  };

  var onPinMousedown = function (evt, action) {
    var ratio = null;
    var currentPointX = evt.clientX;
    var parentWidth = evt.target.parentNode.offsetWidth;

    var onMouseMove = function (moveEvent) {
      var pressedX = currentPointX - moveEvent.clientX;
      var passedX = evt.target.offsetLeft - pressedX;

      if (passedX < 0) {
        passedX = 0;
      }

      if (passedX > parentWidth) {
        passedX = parentWidth;
      }

      currentPointX = moveEvent.clientX;
      ratio = passedX / parentWidth;

      updateSliderValues(ratio);
      action(ratio);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  slider.resetValues = resetSliderValues;
  slider.initialize = initializeSlider;
  window.slider = slider;
})();
