'use strict';
// module4-task2

// форма кадрирования
var uploadOverlay = document.querySelector('.upload-overlay');

var uploadImg = document.querySelector('.upload-image');
var uploadCancel = document.querySelector('.upload-form-cancel');
var uploadFile = document.querySelector('#upload-file');
var commentArea = document.querySelector('.upload-form-description');
var recizeControlFieldset = document.querySelector('.upload-resize-controls');
var uploadHashrag = document.querySelector('.upload-form-hashtags');
var uploadComment = document.querySelector('.upload-form-description');
var STEP_OF_ZOOM = 25;


var showImgLoader = function () {
  uploadFile.value = '';

  // скрываем форму кадрирования
  uploadOverlay.classList.add('hidden');

  // показываем форму загрузки изображения
  uploadImg.classList.remove('hidden');
};

var onShowImgLoaderClick = function () {
  showImgLoader();
};

var onShowImgLoaderOnkeydown = function (evt) {
  if (window.utils.isActivateEvent(evt)) {
    showImgLoader(evt);
  }
};

// функция обработчик события для enter
var onEnterKeydown = function (evt) {
  if (window.utils.isDeactivateEvent(evt)) {
    showImgLoader();
  }
};


var showCroppForm = function () {
  // показываем форму кадрирования
  uploadOverlay.classList.remove('hidden');

  // скрываем форму загрузки изображения
  uploadImg.classList.add('hidden');

  document.addEventListener('keydown', onEnterKeydown);

  uploadComment.addEventListener('keydown', function (evt) {
    if (window.utils.isDeactivateEvent(evt)) {
      evt.stopPropagation();
    }
  });
};

var onShowCroppFormClick = function () {
  showCroppForm();
};

uploadHashrag.maxLength = 20;

commentArea.required = true;
commentArea.minLength = 30;
commentArea.maxLength = 100;


uploadCancel.addEventListener('click', onShowImgLoaderClick);
uploadCancel.addEventListener('keydown', onShowImgLoaderOnkeydown);
uploadFile.addEventListener('change', onShowCroppFormClick);
showImgLoader();

window.filters();
window.controlScales(recizeControlFieldset, STEP_OF_ZOOM);
