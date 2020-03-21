'use strict';

(function () {
  var gallery = {};

  var pictures = document.querySelector('.pictures');

  var dropPhotos = function () {
    var photos = document.querySelectorAll('.picture');
    photos.forEach(function (item) {
      pictures.removeChild(item);
    });
  };

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
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(createPhoto(photosData[i]));
    }
    pictures.appendChild(fragment);
  };

  gallery.renderPhotos = renderPhotos;
  gallery.dropPhotos = dropPhotos;
  window.gallery = gallery;
})();
