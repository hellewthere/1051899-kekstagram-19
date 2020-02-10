"use strict";

var COUNT = 25;
var MESSAGES = [
  "Всё отлично!",
  "Вцелом, всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
var NAMES = [
  "Мадам Бовари",
  "Профессор Преображенский",
  "Акакий Акакиевич",
  "Крошка Цахес",
  "Мамаша Кураж",
  "Сонечка Мармеладова"
];
var DESCRIPTIONS = [
  "В самом деле, что может быть лучше – сидеть вечером с книжкой у камина? Горит лампа, в окна стучится ветер...",
  "Никогда не читайте перед обедом советских газет...",
  "Вряд ли где можно было найти человека, который так жил бы в своей должности",
  "Я ничего на свете так не страшусь и не избегаю, как палящих лучей солнца",
  "Коль торговать, не всё равно ли, свинцом иль сыром торговать?",
  "Бог такого ужаса не допустит!"
];

// Генерируем случайное число
var getRandomNumber = function(minNumber, maxNumber) {
  var randomNum = Math.floor(Math.random() * maxNumber);
  return randomNum > minNumber ? randomNum : minNumber;
};

var createPhotoObj = function (index) {
  var photoCard = {
    url: 'photos/' + (index + 1) + '.jpg',
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    likes: getRandomNumber(15, 200),
    comments:[
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
  return photoCard
};

var createPhotosData = function () {
  var data = [];
  for (var i = 0; i < COUNT; i = i + 1) {
    data.push(createPhotoObj(i));
  }
  return data;
}


var sample = createPhotosData();
console.log(sample);

var createPhoto = function (photoCard) {
  var pictureTemplate = document.querySelector('#picture');
  var picture = pictureTemplate.content.querySelector('.picture');
  //var photoElement = picture.cloneNode(true);
console.log(picture.querySelector('.picture__img'), photoCard);
  picture.querySelector('.picture__img').src= photoCard.url;

  picture.querySelector('.picture__info');
  picture.querySelector('.picture__comments');
  picture.querySelector('.picture__likes');

  return picture;
};

var renderPhotos = function (photosData) {
  var pictures = document.querySelector('.pictures');
  var photoElement = document.querySelector('#picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosData.length; i++) {
    fragment.appendChild(createPhoto(photosData[i]));
  }
  pictures.appendChild(fragment);
};

renderPhotos (sample);

// 1. Объявить функцию генерации случайных данных
// 2. Объявить функцию создания DOM-элемента на основе JS-объекта
// 3. Объявить функцию заполнения блока DOM-элементами на основе массива JS-объектов
