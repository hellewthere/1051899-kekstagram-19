'use strict';
(function () {
  var rangeSlider = document.querySelector('.effect-level');
  var rangeLine = rangeSlider.querySelector('.effect-level__depth');
  var filterLine = rangeSlider.querySelector('.effect-level__line');
  var pin = rangeSlider.querySelector('.effect-level__pin');

  var resetSliderValues = function () {
    rangeLine.style.width = 100 + '%';
    filterLine.value = 100;
    pin.style.left = 100 + '%';
  };

  var updateSliderValues = function (ratio) {
    pin.style.left = (ratio * 100) + '%';
    rangeLine.style.width = (ratio * 100) + '%';
    filterLine.value = Math.round(ratio * 100);
  };

  var onPinMouseDown = function (evt) {
    var ratio = null;
    var currentPointX = evt.clientX;
    var parentWidth = evt.target.parentNode.offsetWidth;

    var onPinMouseMove = function (moveEvent) {
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
    };

    var onPinMouseUp = function () {
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };
    document.addEventListener('mouseup', onPinMouseUp);
    document.addEventListener('mousemove', onPinMouseMove);
  };

  pin.addEventListener('mousedown', onPinMouseDown);

  resetSliderValues();
})();
