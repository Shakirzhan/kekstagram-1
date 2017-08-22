'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesLike = document.querySelector('.picture-likes');
var picturesComments = document.querySelector('.picture-comments');
var fragment = document.createDocumentFragment();
var picturesNode = document.querySelector('.pictures');

// galleryOverlay.classList.remove('hidden');

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

var getRandomInt = function (min, max) {
  return Math.round(min + Math.random() * (max - min + 1));
};

var getData = function () {
  var pictures = [];

  for (var i = 1; i <= 25; i++) {
    var generateData = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInt(15, 200),
      comments: getRandomComment()
    };
    pictures.push(generateData);
  }
  return pictures;

};
var renderImg = function (img) {
  var imageElement = pictureTemplate.cloneNode(true);
  imageElement.querySelector('img').src = img.url;
  imageElement.querySelector('.picture-likes').textContent = img.likes;
  imageElement.querySelector('.picture-comments').textContent = img.comments;

  return imageElement;
};
for (var i = 0; i <= 25; i++) {
  fragment.appendChild(renderImg(getData()));
}
picturesNode.appendChild(fragment);
