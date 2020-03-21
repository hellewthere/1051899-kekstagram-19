'use strict';

(function () {
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var effectSlider = document.querySelector('.effect-level');
  var uploadBtn = document.querySelector('#upload-file');
  var closeBtn = document.querySelector('#upload-cancel');
  var form = document.querySelector('.img-upload__form');
  var uploadFileInput = form.querySelector('.img-upload__input');
  var inputHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  // импорт сторонних модулей
  var userMessage = window.userMessage;
  var photoSize = window.photoSize;
  var effects = window.effects;
  var keyboard = window.utils.keyboard;

  var resetFormValues = function () {
    photoSize.resetValues();
    effects.resetValues();
    inputHashtags.value = '';
    textDescription.value = '';
    uploadFileInput.value = '';
  };

  var onPopupEscPress = function (evt) {
    keyboard.isEscEvent(evt, closePopup);
  };

  // открывает попап
  var openPopup = function () {
    document.querySelector('body').classList.add('modal-open');
    uploadOverlay.classList.remove('hidden');
    effectSlider.classList.add('hidden');
    // + обработчики
    closeBtn.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // закрывает попап
  var closePopup = function () {
    document.querySelector('body').classList.remove('modal-open');
    uploadOverlay.classList.add('hidden');
    resetFormValues();
    // - обработчики
    closeBtn.removeEventListener('click', openPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  closeBtn.addEventListener('keydown', function (evt) {
    keyboard.isEscEvent(evt, closePopup);
  });

  // Если фокус находится в области ввода хэштега/комментария - окно закрываться не должно.
  inputHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  inputHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  inputHashtags.addEventListener('keydown', function (evt) {
    keyboard.isEnterEvent(evt, openPopup);
  });

  textDescription.addEventListener('keydown', function (evt) {
    keyboard.isEnterEvent(evt, openPopup);
  });

  var onUpload = function () {
    closePopup();
    userMessage.showSuccess();
  };

  var onError = function () {
    closePopup();
    userMessage.showError();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.api.uploadData(formData, onUpload, onError);
  };

  form.addEventListener('submit', onFormSubmit);
  uploadBtn.addEventListener('change', openPopup);
})();
