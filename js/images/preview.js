'use strict';

(function () {
// добавляет класс по пункту 3 и обращается к главному объекту по классу
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPictureBtn = document.querySelector('#picture-cancel');
  var picturesContainer = document.querySelector('.pictures');
  var keyboard = window.utils.keyboard;
  var data = window.data.createPhotos();
  // console.log(utils);

  // createCommentItem будет принимать объект с данными коммента, и заполнять шаблон
  var createCommentItem = function (commentObj) {
    var commentItemTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = commentObj.avatar;
    commentItem.querySelector('.social__picture').alt = commentObj.name;
    commentItem.querySelector('.social__text').textContent = commentObj.message;
    return commentItem;
  };

  var createComments = function (photoComments) {
  // контейнер для нод вне дом-дерева
    var fragment = document.createDocumentFragment();
    // метод выполняет функцию 1раз для каждого элемента массива
    photoComments.comments.forEach(function (commentObj) {
      // createCommentItem() вставляет новый элемент ДОМ в конец fragment
      fragment.appendChild(createCommentItem(commentObj));
    });
    return fragment;
  };

  // заполняет информацией главный объект
  var getBigPicture = function (pictureData) {
    var commentsNode = bigPicture.querySelector('.social__comments');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;
    while (commentsNode.firstChild) {
      commentsNode.firstChild.remove();
    }
    commentsNode.appendChild(createComments(pictureData));
  };

  // прячет элементы по пункту 2.
  var hideElements = function () {
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  };

  var closeBigPicturePopup = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureBtn.removeEventListener('click', closeBigPicturePopup);
    document.removeEventListener('keydown', onCloseBigPictureBtnKeydown);
  };

  var onCloseBigPictureBtnKeydown = function (evt) {
    keyboard.isEscEvent(evt, closeBigPicturePopup);
  };

  var renderBigPicture = function (pictureId) {
    var pictureData = data.find(function (item) {
      return item.id === +pictureId;
    });

    getBigPicture(pictureData);
    closeBigPictureBtn.addEventListener('click', closeBigPicturePopup);
    document.addEventListener('keydown', onCloseBigPictureBtnKeydown);
  };

  var onPicturesContainerClick = function (evt) {
    var clickedPicture = evt.target.closest('.picture');
    if (clickedPicture === null) {
      return;
    }
    renderBigPicture(clickedPicture.id);
  };

  picturesContainer.addEventListener('click', onPicturesContainerClick);

  hideElements();
})();
