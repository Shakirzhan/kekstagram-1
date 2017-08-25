'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    // проверка была ли нажата кнопка enter
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEYCODE;
    },
    // проверка была ли нажата кнопка escape
    isDeactivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEYCODE;
    }
  };

})();
