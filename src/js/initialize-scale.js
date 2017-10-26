'use strict';

/**
 * [Функция возращает другую функцию в глобальную область видимости]
 * @return {[function]} [из замыкания возращаем функцию]
 */
window.controlScales = (function () {
  var imgFilterPreview = document.querySelector('.effect-image-preview');
  var resizeControlValue = document.querySelector('.upload-resize-controls-value');

  /**
   * [Функция описывает всю работу с увелечением\уменшением изображения]
   * @param  {[DOM]} element [контейнер в котором, лежат кнопки + и -]
   * @param  {[number]} step    [Шаг с котороым мы увелечением\уменшением изображения]
   */
  var initializeScale = function (element, step) {

    // добавляем zoom изображению
    var zoomImg = function (zoomValue) {
      var transformCoeff = zoomValue / 100;
      var inputValue = zoomValue + '%';
      imgFilterPreview.style.transform = 'scale(' + transformCoeff + ')';
      resizeControlValue.setAttribute('value', inputValue);
    };

    // получает текущие значения
    var getCurrentValue = function () {
      return parseInt(resizeControlValue.value, 10);
    };

    var decreaseBtn = element.querySelector('.upload-resize-controls-button-dec');
    var increaseBtn = element.querySelector('.upload-resize-controls-button-inc');

    // уменьшаем zoom
    var decreaseZoom = function () {
      var inputValue = getCurrentValue();
      if (inputValue <= 100 && inputValue > step) {
        inputValue -= step;
        zoomImg(inputValue);
      }
    };

    // увеличиваем zoom
    var increaseZoom = function () {
      var inputValue = getCurrentValue();
      if (inputValue < 100 && inputValue >= step) {
        inputValue += step;
        zoomImg(inputValue);
      }
    };

    // вызываем обработчик события по нажатию мышки
    var onIncreaseZoomBtnClick = function () {
      increaseZoom();
    };

    // вызываем обработчик события по нажатию мышки
    var onDecreaseZoomBtnClick = function () {
      decreaseZoom();
    };

    decreaseBtn.addEventListener('click', onDecreaseZoomBtnClick);
    increaseBtn.addEventListener('click', onIncreaseZoomBtnClick);
  };

  return initializeScale;

})();
