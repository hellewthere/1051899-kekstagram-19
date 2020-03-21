'use strict';

(function () {

  var data = {};

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

  var createPhotoObj = function (index) {
    var photoCard = {
      id: index + 1,
      url: 'photos/' + (index + 1) + '.jpg',
      description: DESCRIPTIONS[window.utils.getRandomNumber(0, DESCRIPTIONS.length)],
      likes: window.utils.getRandomNumber(15, 200),
      comments: [
        {
          avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
          message: MESSAGES[window.utils.getRandomNumber(0, MESSAGES.length)],
          name: NAMES[window.utils.getRandomNumber(0, NAMES.length)]
        },
        {
          avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
          message: MESSAGES[window.utils.getRandomNumber(0, MESSAGES.length)],
          name: NAMES[window.utils.getRandomNumber(0, NAMES.length)]
        }
      ]
    };
    return photoCard;
  };

  var createPhotosData = function () {
    var dataArr = [];
    for (var j = 0; j < COUNT; j = j + 1) {
      dataArr.push(createPhotoObj(j));
    }
    return dataArr;
  };

  data.createPhotos = createPhotosData;
  window.data = data;
})();
