'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsNode = bigPicture.querySelector('.social__comments');
  var COMMENTS_AMOUNT = 5;
  var comments = {};

  var createCommentItem = function (commentObj) {
    var commentItemTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentItem = commentItemTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = commentObj.avatar;
    commentItem.querySelector('.social__picture').alt = commentObj.name;
    commentItem.querySelector('.social__text').textContent = commentObj.message;
    return commentItem;
  };

  var createComments = function (photoComments) {
    var fragment = document.createDocumentFragment();
    commentsLoader.classList.remove('hidden');

    if (photoComments.length <= COMMENTS_AMOUNT) {
      commentsLoader.classList.add('hidden');
    }

    photoComments.splice(0, COMMENTS_AMOUNT).forEach(function (commentObj) {
      fragment.appendChild(createCommentItem(commentObj));
    });

    commentsLoader.addEventListener('click', function () {
      createComments(photoComments);
    });

    commentsNode.appendChild(fragment);
  };


  comments.create = createComments;
  window.comments = comments;
})();
