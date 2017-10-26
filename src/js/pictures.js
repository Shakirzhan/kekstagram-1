'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var galleryClose = document.querySelector('.gallery-overlay-close');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');


var picturesContainer = document.querySelector('.pictures');

// функция обработчик события для enter
var onEnterOnKeydown = function (evt) {
  if (window.utils.isDeactivateEvent(evt)) {
    closeGallery();
  }
};

// открытия галереи
var openGallery = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEnterOnKeydown);
};

// закрытия галерии
var closeGallery = function () {
  galleryOverlay.classList.add('hidden');
};

// вешаем обработчик события на закрытие по клику
var onCloseGalleryClick = function () {
  closeGallery();
};

// вешаем обработчик события на закрытие по нажатию на клавишу
var onCloseGalleryOnKeydown = function (evt) {
  if (window.utils.isActivateEvent(evt)) {
    closeGallery();
  }
};

/**
 * [получаем случайный элемент массива]
 * @return {[number]} [description]
 */
var getRandomComment = function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var randomElementIndex = Math.floor(Math.random() * comments.length);

  return comments[randomElementIndex];
};

/**
 * [получаем рандомное целое число]
 * @param  {[number]} min [минимальное число]
 * @param  {[number]} max [Максимальное число]
 * @return {[number]}     [случайное целое число]
 */
var getRandomInt = function (min, max) {
  return Math.round(min + Math.random() * (max - min + 1));
};

/**
 * [собирает массив объектов]
 * @return {[object]} [возращает готовый объект с данными]
 */
var getData = function () {
  var pictures = [];

  for (var i = 1; i <= 26; i++) {
    var generateData = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getRandomComment()
    };
    pictures.push(generateData);
  }
  return pictures;
};

/**
 * [открывает галерею с заполнеными даными]
 * @param  {[evt]} evt  [evt объект]
 * @param  {[object]} data [объект с данными]
 */
var showGallery = function (evt, data) {
  evt.preventDefault();
  renderGalleryImg(data);
  openGallery(evt.target);
};

// открывает галерею по клику
var onOpenPictureClick = function (imgDataObj) {
  return function (evt) {
    showGallery(evt, imgDataObj);
  };
};

// открывает галерею по нажатию на энтер
var onOpenPictureKeydown = function (imgDataObj) {
  return function (evt) {
    if (window.utils.isActivateEvent(evt)) {
      showGallery(evt, imgDataObj);
    }
  };
};

/**
 * [рендерит картинки]
 * @param  {[object]} dataObj [Объект с данными]
 * @return {[DOM]}  [Возрзщает дом элемент с заполнеными данными]
 */
var renderImg = function (dataObj) {
  var elementToClone = window.utils.getTemplateClone('#picture-template', '.picture');
  var imageElement = elementToClone.cloneNode(true);

  imageElement.querySelector('img').src = dataObj.url;
  imageElement.querySelector('.picture-likes').textContent = dataObj.likes;
  imageElement.querySelector('.picture-comments').textContent = dataObj.comments.length;

  imageElement.addEventListener('click', onOpenPictureClick(dataObj));
  imageElement.addEventListener('keydown', onOpenPictureKeydown(dataObj));

  return imageElement;
};

/**
 * [рендерит картинку для галереи]
 * @param  {[object]} previewDataObj [объект с данными]
 */
var renderGalleryImg = function (previewDataObj) {
  galleryOverlayImage.src = previewDataObj.url;
  likesCount.textContent = previewDataObj.likes;
  commentsCount.textContent = previewDataObj.comments.length;
};

// сохраняем в переменую массив объектов
var arrMyData = getData();

/**
 * [добавляет в DOM картинки. Оптимизиует добавления путем использования fragment]
 */
var appendNodes = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= 25; i++) {
    fragment.appendChild(renderImg(arrMyData[i]));
  }
  picturesContainer.appendChild(fragment);
};

appendNodes();
galleryClose.addEventListener('click', onCloseGalleryClick);
galleryClose.addEventListener('keydown', onCloseGalleryOnKeydown);
