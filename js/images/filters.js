'use strict';

(function () {
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filters = {};
  var filtersForm = document.querySelector('.img-filters__form');

  var utils = window.utils;

  var defaultFilter = function (photos) {
    return photos;
  };

  var randomFilter = function (photos) {
    return utils.fisherYates(photos, PICTURES_AMOUNT);
  };

  var discussedFilter = function (photos) {
    var discussedPictures = photos.slice(0);
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPictures;
  };

  var filterTypeToAction = {
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
    var filtredData = filterTypeToAction[currentFilter](photosData);

    gallery.dropPhotos();
    gallery.renderPhotos(filtredData);
  };

  filtersForm.addEventListener('mousedown', onFiltersFormMouseDown);
  filtersForm.addEventListener('click', utils.debounce(onFiltersFormClick, DEBOUNCE_INTERVAL));

  filters.initialize = initializeFilters;
  window.filters = filters;
})();
