'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var COUNT = 25;
var MESSAGES = [
  'Всё отлично!',
  'Вцелом, всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Мадам Бовари',
  'Профессор Преображенский',
  'Акакий Акакиевич',
  'Крошка Цахес',
  'Мамаша Кураж',
  'Сонечка Мармеладова'
];
var DESCRIPTIONS = [
  'В самом деле, что может быть лучше – сидеть вечером с книжкой у камина? Горит лампа, в окна стучится ветер...',
  'Никогда не читайте перед обедом советских газет...',
  'Вряд ли где можно было найти человека, который так жил бы в своей должности',
  'Я ничего на свете так не страшусь и не избегаю, как палящих лучей солнца',
  'Коль торговать, не всё равно ли, свинцом иль сыром торговать?',
  'Вы напрасно, господа, ходите без калош. Во-первых, вы простудитесь, а во-вторых, вы наследите мне на коврах. А все ковры у меня персидские.'
];

var getRandomNumber = function (minNumber, maxNumber) {
  var randomNum = Math.floor(Math.random() * maxNumber);
  return randomNum > minNumber ? randomNum : minNumber;
};

var createPhotoObj = function (index) {
  var photoCard = {
    id: index + 1,
    url: 'photos/' + (index + 1) + '.jpg',
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    likes: getRandomNumber(15, 200),
    comments: [
      {
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        message: MESSAGES[getRandomNumber(0, MESSAGES.length)],
        name: NAMES[getRandomNumber(0, NAMES.length)]
      },
      {
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        message: MESSAGES[getRandomNumber(0, MESSAGES.length)],
        name: NAMES[getRandomNumber(0, NAMES.length)]
      }
    ]
  };
  return photoCard;
};

var createPhotosData = function () {
  var data = [];
  for (var j = 0; j < COUNT; j = j + 1) {
    data.push(createPhotoObj(j));
  }
  return data;
};

var data = createPhotosData();
console.log(data);

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

// добавляет класс по пункту 3 и обращается к главному объекту по классу
var bigPicture = document.querySelector('.big-picture');

// createCommentItem будет принимать объект с данными коммента, и заполнять шаблон
var createCommentItem = function (commentObj) {
  var commentItemTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentItem = commentItemTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = commentObj.avatar;
  commentItem.querySelector('.social__picture').alt = commentObj.message;
  commentItem.querySelector('.social__text').textContent = commentObj.name;
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
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  bigPicture.querySelector('.social__comments').appendChild(createComments(pictureData));
};

// прячет элементы по пункту 2.
var hideElements = function () {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

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

var closeBigPictureBtn = document.querySelector('#picture-cancel');
var picturesContainer = document.querySelector('.pictures');

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
  renderBigPicture(clickedPicture.id);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

renderPhotos(data);
hideElements();
