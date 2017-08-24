'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var galleryClose = document.querySelector('.gallery-overlay-close');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');


var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;
var fragment = document.createDocumentFragment();

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// проверка была ли нажата кнопка enter
var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEYCODE;
};

// проверка была ли нажата кнопка escape
var isDeactivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ESC_KEYCODE;
};

// функция обработчик события для enter
var onEnterOnKeydown = function (evt) {
  if (isDeactivateEvent(evt)) {
    closeGallery();
  }
};

// открываем галерею
var openGallery = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('onkeydown', onEnterOnKeydown);
};

// закрываем галерею
var closeGallery = function () {
  galleryOverlay.classList.add('hidden');
};

// вешаем обработчик события на закрытие по клику
var onCloseGalleryClick = function () {
  closeGallery();
};

// вешаем обработчик события на закрытие по нажатию на клавишу
var onCloseGalleryOnKeydown = function (evt) {
  if (isActivateEvent(evt)) {
    closeGallery();
  }
};

// получаем рандомный элемент массива
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

// получаем рандомное целое число
var getRandomInt = function (min, max) {
  return Math.round(min + Math.random() * (max - min + 1));
};

// собираем массив объектов
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

// рендерим картинки
var renderImg = function (img) {
  var imageElement = pictureTemplate.cloneNode(true);
  imageElement.querySelector('img').src = img.url;
  imageElement.querySelector('.picture-likes').textContent = img.likes;
  imageElement.querySelector('.picture-comments').textContent = img.comments.length;

  return imageElement;
};

// рендерим картинку для галереи
var renderGalleryImg = function (bigImg) {
  galleryOverlayImage.src = bigImg.url;
  likesCount.textContent = bigImg.likes;
  commentsCount.textContent = bigImg.comments;
};

// сохраняем в переменую массив объектов
var arr = getData();

// добавляем в DOM картинки
var appendNodess = function () {
  for (var i = 0; i <= 25; i++) {
    fragment.appendChild(renderImg(arr[i]));
  }
  picturesContainer.appendChild(fragment);
};

// ищем содержит ли элемент класс picture
var activeGallery = function (evt) {
  var currentElemnt = evt.target.classList.contains('picture') ? evt.target : evt.target.parentNode.previousElementSibling;
  if (currentElemnt) {
    openGallery(currentElemnt);
  }
};

// вешаем обработчик события на картинки по клику
var onActiveGallryClick = function (evt) {
  activeGallery(evt);
};

// вешаем обработчик события на картинки по нажатию на enter
var onActiveGallryOnKeydown = function (evt) {
  if (isActivateEvent(evt)) {
    activeGallery(evt);
  }
};

appendNodess();
galleryOverlay.appendChild(renderGalleryImg(arr[0]));
picturesContainer.addEventListener('click', onActiveGallryClick);
picturesContainer.addEventListener('onkeydown', onActiveGallryOnKeydown);
galleryClose.addEventListener('click', onCloseGalleryClick);
galleryClose.addEventListener('onkeydown', onCloseGalleryOnKeydown);
