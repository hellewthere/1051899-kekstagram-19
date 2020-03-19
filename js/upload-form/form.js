'use strict';

(function () {
  var checkForm = window.validation.checkForm;
  var keyboard = window.utils.keyboard;

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  // поле выбора изображения, открывает попап загрузки
  var uploadBtn = document.querySelector('#upload-file');
  // кнопка для закрытия формы
  var closeBtn = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  // форма редактирования изображения
  var inputHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var effectsSlider = document.querySelector('.effect-level');


  var onPopupEscPress = function (evt) {
    keyboard.isEscEvent(evt, closePopup);
  };

  // открывает попап
  var openPopup = function () {
    document.querySelector('body').classList.add('modal-open');
    effectsSlider.classList.add('hidden');
    uploadOverlay.classList.remove('hidden');
    // + обработчики
    closeBtn.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // закрывает попап
  var closePopup = function () {
    document.querySelector('body').classList.remove('modal-open');
    uploadOverlay.classList.add('hidden');
    // - обработчики
    closeBtn.removeEventListener('click', openPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Если окно открыто и фокус находится на кнопке закрытия окна,
  // то нажатие клавиши ENTER должно приводить к закрытию диалога
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

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();

    var isFormValid = checkForm();
    if (isFormValid) {
      // var formData = new FormData(form);
    } else {
      window.console.log('Форма невалидна');
    }
  };

  uploadBtn.addEventListener('change', openPopup);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
})();
