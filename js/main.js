'use strict';


var COUNT = 25;
var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Мадам Бовари', 'Профессор Преображенский', 'Акакий Акакиевич', 'Крошка Цахес', 'Мамаша Кураж', 'Сонечка Мармеладова'];

// Генерируем случайное число
var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

getRandomNumber();

// Генерируем случайное число диапазона
var getRandomRangeNumber = function (minNumber, maxNumber) {
  var number = minNumber + Math.random() * (maxNumber + 1 - minNumber);
  return Math.floor(number);
};
getRandomRangeNumber(15, 200);

// Генерируем случайный элемент списка
var getRandomElement = function (elementList) {
  return elementList[getRandomNumber(elementList.length - 1)];
};
getRandomElement();

// Генерируем комментарий
var createComment = function () {
  var comment = {};
  comment.avatar = 'img/avatar-' + getRandomNumber(6) + '.svg';
  comment.message = getRandomElement(MESSAGES);
  comment.name = getRandomElement(NAMES);
  return comment;
};

// Генерируем список комментариев
var createCommentList = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments[i] = createComment();
  }
  return comments;
};

// Генерируем описание изображения
var createDescription = function (index) {
  var image = {};
  image.url = 'photos/' + (index + 1) + '.jpg';
  image.description = 'Описание фотографии';
  image.likes = getRandomRangeNumber(15, 200);
  image.comments = createCommentList(getRandomNumber(5));
  return image;
};

// Генерируем список из описаний
var createDescription = function (descriptionCount) {
  var images = [];
  for (var i = 0; i < descriptionCount; i++) {
    images[i] = createDescription(i);
  }
  return images;
};

// 1. Объявить функцию генерации случайных данных
// 2. Объявить функцию создания DOM-элемента на основе JS-объекта
// 3. Объявить функцию заполнения блока DOM-элементами на основе массива JS-объектов
