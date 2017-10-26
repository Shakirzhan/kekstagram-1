'use strict';

window.utils = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    /**
     * [проверка была ли нажата кнопка enter]
     * @param  {[object]} evt [evt object]
     * @return {[number]}     [кей код]
     */
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEYCODE;
    },

      /**
       * [проверка была ли нажата кнопка escape]
       * @param  {[object]} evt [evt object]
       * @return {[number]}     [кей код]
       */
    isDeactivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEYCODE;
    },

    /**
     * [получаем и клонируем шаблон]
     * @param  {[string]} template      [шаблон для копирования]
     * @param  {[string]} innerSelector [класс]
     * @return {[DOM]}      [дом элемент]
     */
    getTemplateClone: function (template, innerSelector) {
      var templateElem = document.querySelector(template);
      var elemToClone;

      if ('content' in templateElem) {
        elemToClone = templateElem.content.querySelector(innerSelector);
      } else {
        elemToClone = templateElem.querySelector(innerSelector);
      }
      return elemToClone;

    }
  };
})();
