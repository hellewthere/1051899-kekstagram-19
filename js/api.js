'use strict';

(function () {
  var URL_SEND = 'https://js.dump.academy/kekstagram/';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 5000;
  var api = {};

  var SERVER_MESSAGE = {
    PAGE_SUCCESS: 200,
    PAGE_NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var USER_MESSAGE = {
    PAGE_NOT_FOUND: 'Страница не найдена',
    SERVER_ERROR: 'Ошибка сервера',
    DEFAULT: 'Неизвестный статус: ',
    CONNECTION_FAIL: 'Произошла ошибка соединения',
    TIMEOUT_FAIL: 'Запрос не успел выполниться за '
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SERVER_MESSAGE.PAGE_SUCCESS:
          onLoad(xhr.response);
          break;
        case SERVER_MESSAGE.PAGE_NOT_FOUND:
          onError(USER_MESSAGE.PAGE_NOT_FOUND);
          break;
        case SERVER_MESSAGE.SERVER_ERROR:
          onError(USER_MESSAGE.SERVER_ERROR);
          break;
        default:
          onError(USER_MESSAGE.DEFAULT + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(USER_MESSAGE.CONNECTION_FAIL);
    });

    xhr.addEventListener('timeout', function () {
      onError(USER_MESSAGE.TIMEOUT_FAIL + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  api.uploadData = upload;
  api.loadData = load;
  window.api = api;
})();
