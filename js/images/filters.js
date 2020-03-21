'use strict';

(function () {
  var filters = {};
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filtersForm = document.querySelector('.img-filters__form');

  var utils = window.utils;

  var defaultFilter = function (dataArr) {
    return dataArr;
  };

  var randomFilter = function (dataArr) {
    var copyDataArr = dataArr.slice(0);
    var randomPictures = [];

    for (var i = 0; randomPictures.length < PICTURES_AMOUNT; i++) {
      var randomIndex = utils.getRandomNumber(0, copyDataArr.length - 1);
      var randomElement = copyDataArr[randomIndex];
      randomPictures.push(randomElement);
      randomPictures.splice(randomIndex, 1);
    }

    return randomPictures;
  };

  var discussedFilter = function (dataArr) {
    var discussedPictures = dataArr.slice(0);
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPictures;
  };

  var filtersType = {
    'filter-default': defaultFilter,
    'filter-random': randomFilter,
    'filter-discussed': discussedFilter
  };

  var initializeFilters = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onFiltersFormMouseDown = function (evt) {
    var btns = document.querySelectorAll('.img-filters__button');
    btns.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };

  var onFiltersFormClick = function (evt) {
    var photosData = window.data.photos;
    var gallery = window.gallery;
    var currentFilter = evt.target.id;
    var filtredData = filtersType[currentFilter](photosData);

    gallery.dropPhotos();
    gallery.renderPhotos(filtredData);
  };

  filtersForm.addEventListener('mousedown', onFiltersFormMouseDown);
  filtersForm.addEventListener('click', utils.debounce(onFiltersFormClick, DEBOUNCE_INTERVAL));

  filters.initialize = initializeFilters;
  window.filters = filters;
})();
