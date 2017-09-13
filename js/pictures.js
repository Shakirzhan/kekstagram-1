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

// открываем галерею
var openGallery = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEnterOnKeydown);
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
  if (window.utils.isActivateEvent(evt)) {
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

// открываем галерею с заполнеными даными
var showGallery = function (evt, data) {
  evt.preventDefault();
  renderGalleryImg(data);
  openGallery(evt.target);
};

var onOpenPictureClick = function (imgDataObj) {
  return function (evt) {
    showGallery(evt, imgDataObj);
  };
};

var onOpenPictureKeydown = function (imgDataObj) {
  return function (evt) {
    if (window.utils.isActivateEvent(evt)) {
      showGallery(evt, imgDataObj);
    }
  };
};

// рендерим картинки
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

// рендерим картинку для галереи
var renderGalleryImg = function (previewDataObj) {
  galleryOverlayImage.src = previewDataObj.url;
  likesCount.textContent = previewDataObj.likes;
  commentsCount.textContent = previewDataObj.comments.length;
};

// сохраняем в переменую массив объектов
var arrMyData = getData();

// добавляем в DOM картинки
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
