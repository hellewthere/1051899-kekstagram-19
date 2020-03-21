'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count span');
  var loader = bigPicture.querySelector('.comments-loader');
  var commentsNode = bigPicture.querySelector('.social__comments');
  var closeBigPictureBtn = document.querySelector('#picture-cancel');
  var picturesContainer = document.querySelector('.pictures');
  var commentsLoaderCount = 0;
  var COMMENTS_AMOUNT = 5;

  var keyboard = window.utils.keyboard;

  var loadingComments = [];

  var removeNodes = function (node) {
    while (node.firstChild) {
      node.firstChild.remove();
    }
  };

  var createCommentItem = function (commentObj) {
    var commentItemTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentItem = commentItemTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = commentObj.avatar;
    commentItem.querySelector('.social__picture').alt = commentObj.name;
    commentItem.querySelector('.social__text').textContent = commentObj.message;
    return commentItem;
  };

  var closeBigPicturePopup = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureBtn.removeEventListener('click', closeBigPicturePopup);
    document.removeEventListener('keydown', onCloseBigPictureBtnKeydown);
  };

  var onCloseBigPictureBtnKeydown = function (evt) {
    keyboard.isEscEvent(evt, closeBigPicturePopup);
  };

  var getPictureData = function (data, pictureId) {
    var pictureData = data.find(function (item) {
      return item.id === +pictureId;
    });
    return pictureData;
  };

  var fillPictureTemplate = function (pictureData) {
    bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;
    bigPicture.querySelector('.social__comment-count span').textContent = commentsLoaderCount;
    bigPicture.classList.remove('hidden');
  };

  var renderComments = function (picData) {
    var fragment = document.createDocumentFragment();

    picData.forEach(function (commentObj) {
      fragment.appendChild(createCommentItem(commentObj));
      commentsLoaderCount++;
    });
    commentsNode.appendChild(fragment);
  };

  var updateCountNode = function () {
    var commentsCount = document.querySelector('.comments-count').textContent;
    loader.classList.remove('hidden');
    if (document.querySelectorAll('.social__comment').length === +commentsCount) {
      loader.classList.add('hidden');
    }
  };

  var updateLoader = function (commentsArr) {
    var tempArray = commentsArr.slice(COMMENTS_AMOUNT, commentsArr.length);
    if (loadingComments.length === 0) {
      loadingComments = tempArray.concat();
    }
    updateCountNode();
  };

  var bindListeners = function () {
    closeBigPictureBtn.addEventListener('click', closeBigPicturePopup);
    document.addEventListener('keydown', onCloseBigPictureBtnKeydown);
  };

  var renderBigPicture = function (pictureId) {
    var picData = getPictureData(window.data.photos, pictureId);
    var fiveComments = picData.comments.slice(0, COMMENTS_AMOUNT);
    commentsLoaderCount = 0;

    removeNodes(commentsNode);
    renderComments(fiveComments);
    fillPictureTemplate(picData);
    updateLoader(picData.comments);
    bindListeners();
  };

  var onLoaderClick = function () {
    var fragment = document.createDocumentFragment();
    var loaderComments = loadingComments.splice(0, COMMENTS_AMOUNT);

    renderComments(loaderComments);
    socialCommentCount.textContent = commentsLoaderCount;
    commentsNode.appendChild(fragment);
    updateLoader(loadingComments);
  };

  var onPicturesContainerClick = function (evt) {
    var clickedPicture = evt.target.closest('.picture');
    if (clickedPicture === null) {
      return;
    }
    renderBigPicture(clickedPicture.id);
  };

  loader.addEventListener('click', onLoaderClick);
  picturesContainer.addEventListener('click', onPicturesContainerClick);
})();
