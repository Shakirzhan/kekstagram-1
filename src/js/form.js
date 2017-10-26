'use strict';

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

/**
 * [скрывает форму кадрирования и показывает форму  загрузки изображения]
 */
var showImgLoader = function () {
  uploadFile.value = '';

  uploadOverlay.classList.add('hidden');
  uploadImg.classList.remove('hidden');
};

var onShowImgLoaderClick = function () {
  showImgLoader();
};

/**
 * [Вещаем обработчик события по клавиатуре]
 * @param  {[object]} evt [передаем его в функцию показа формы загрузки]
 */
var onShowImgLoaderOnkeydown = function (evt) {
  if (window.utils.isActivateEvent(evt)) {
    showImgLoader(evt);
  }
};

/**
 * [функция обработчик события для enter]
 * @param  {[object]} evt [передаем его в функцию показа формы загрузки]
 */
var onEnterKeydown = function (evt) {
  if (window.utils.isDeactivateEvent(evt)) {
    showImgLoader();
  }
};

/**
 * [ показываем форму кадрирования & скрываем форму загрузки изображения]
 * [Вешаем обработчик события на эскейп для закрытия окна]
 * [отменяет закрытия окна по эскейп, когда фокус в комментарии]
 */
var showCroppForm = function () {
  uploadOverlay.classList.remove('hidden');
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

/**
 * [Валидация поля хэш-тег]
 * @type {Number}
 */
uploadHashrag.maxLength = 20;

/**
 * [Валидация поля для ввода комментариев]
 */
commentArea.required = true;
commentArea.minLength = 30;
commentArea.maxLength = 100;

/**
 * Обработчики событий
 */
uploadCancel.addEventListener('click', onShowImgLoaderClick);
uploadCancel.addEventListener('keydown', onShowImgLoaderOnkeydown);
uploadFile.addEventListener('change', onShowCroppFormClick);
showImgLoader();
window.filters();
window.controlScales(recizeControlFieldset, STEP_OF_ZOOM);
