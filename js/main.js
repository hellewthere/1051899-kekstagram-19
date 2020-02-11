'use strict';

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
  'Бог такого ужаса не допустит!'
];

var getRandomNumber = function (minNumber, maxNumber) {
  var randomNum = Math.floor(Math.random() * maxNumber);
  return randomNum > minNumber ? randomNum : minNumber;
};

var createPhotoObj = function (index) {
  var photoCard = {
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
  for (var i = 0; i < COUNT; i = i + 1) {
    data.push(createPhotoObj(i));
  }
  return data;
};

var sample = createPhotosData();

var createPhoto = function (photoCard) {
  var pictureTemplate = document.querySelector('#picture');
  var picture = pictureTemplate.content.cloneNode(true);

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

renderPhotos(sample);


var getBigPicture = function () {
  var bigPicture = document.querySelector('.big-picture').classList.remove('hidden');
  // window.console.log(bigPicture);

  bigPicture.querySelector('.big-picture__img').src = photoCard.url;
  bigPicture.querySelector('.likes-count').textContent = photoCard.likes;
  bigPicture.querySelector('.comments-count').textContent = photoCard.comments.length;
  // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
  bigPicture.querySelector('.social__comments');
  bigPicture.querySelector('.social__picture').src = avatar.url.alt = NAMES.length.width = '35'.height = '35';
  bigPicture.querySelector('.social__text').textContent = MESSAGES.length;
  // Описание фотографии description вставьте строкой в блок .social__caption
  bigPicture.querySelector('.social__caption').textContent = DESCRIPTIONS.length;

  // Спрячьте блоки счётчика комментариев .social__comment-count
  // и загрузки новых комментариев .comments-loader, добавив им класс hidden.
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // Добавьте на <body> класс modal-open
  bigPicture.querySelector('body').classList.add('modal-open');

};

getBigPicture();
