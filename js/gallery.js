'use strict';

(function () {
  var photos = window.data.createPhotos();

  var createPhoto = function (photoCard) {
    var pictureTemplate = document.querySelector('#picture');
    var picture = pictureTemplate.content.cloneNode(true);

    picture.querySelector('.picture').setAttribute('id', photoCard.id);
    picture.querySelector('.picture__img').src = photoCard.url;
    picture.querySelector('.picture__comments').textContent = photoCard.comments.length;
    picture.querySelector('.picture__likes').textContent = photoCard.likes;

    return picture;
  };

  var renderPhotos = function (photosData) {
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(createPhoto(photosData[i]));
    }
    pictures.appendChild(fragment);
  };

  renderPhotos(photos);
})();
