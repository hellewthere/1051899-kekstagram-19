'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// форма редактирования изображения
var uploadOverlay = document.querySelector('.img-upload__overlay');
// поле выбора изображения, открывает попап загрузки
var uploadBtn = document.querySelector('#upload-file');
// кнопка для закрытия формы
var closeBtn = document.querySelector('#upload-cancel');

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
  uploadOverlay.classList.add('hidden');
  // - обработчики
  closeBtn.removeEventListener('click', openPopup);
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadBtn.addEventListener('change', function () {
  openPopup();
});
