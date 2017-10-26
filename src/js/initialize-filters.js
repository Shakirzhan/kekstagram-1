'use strict';
window.filters = (function () {
  var controlFilters = document.querySelector('.upload-effect-controls');
  var imgFilterPreview = document.querySelector('.effect-image-preview');

/**
 * [применяем выбраный фильтр]
 * @param  {[DOM]} currentFilterName [текущий дом элемент]
 */
  var applyFilter = function (currentFilterName) {
    var currentFilter = 'effect-' + currentFilterName.value;
    imgFilterPreview.setAttribute('class', currentFilter);
  };

/**
 * [через делегирование выбираем какой фильтр активен]
 * @param  {[object]} evt [находим нужный элемент и передаем его в функцию applyFilter]
 */
  var activeFilter = function (evt) {
    var currentElement = evt.target.classList.contains('upload-effect') ? evt.target : evt.target.parentNode.previousElementSibling;
    if (currentElement) {
      applyFilter(currentElement);
    }
  };

  // вызываем обработчик события по нажатию мышки
  var onFilterClick = function (evt) {
    activeFilter(evt);
  };

  // вызываем обработчик события по клавитуре
  var onFilterKeydown = function (evt) {
    if (window.utils.isActivateEvent(evt)) {
      activeFilter(evt);
    }
  };

  // инициализируем фильтры
  var initializeFilters = function () {
    controlFilters.addEventListener('click', onFilterClick);
    controlFilters.addEventListener('keypress', onFilterKeydown);
  };
  return initializeFilters;

})();
