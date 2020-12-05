"use strict";

(function () {
  var originalPositions = [];
  var daElements = document.querySelectorAll('[data-da]');
  var daElementsArray = [];
  var daMatchMedia = []; //Заполняем массивы

  if (daElements.length > 0) {
    var number = 0;

    for (var index = 0; index < daElements.length; index++) {
      var daElement = daElements[index];
      var daMove = daElement.getAttribute('data-da');

      if (daMove != '') {
        var daArray = daMove.split(',');
        var daPlace = daArray[1] ? daArray[1].trim() : 'last';
        var daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
        var daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
        var daDestination = document.querySelector('.' + daArray[0].trim());

        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number); //Заполняем массив первоначальных позиций

          originalPositions[number] = {
            "parent": daElement.parentNode,
            "index": indexInParent(daElement)
          }; //Заполняем массив элементов

          daElementsArray[number] = {
            "element": daElement,
            "destination": document.querySelector('.' + daArray[0].trim()),
            "place": daPlace,
            "breakpoint": daBreakpoint,
            "type": daType
          };
          number++;
        }
      }
    }

    dynamicAdaptSort(daElementsArray);
    console.log(daElementsArray); //Создаем события в точке брейкпоинта

    for (var _index = 0; _index < daElementsArray.length; _index++) {
      var el = daElementsArray[_index];
      var _daBreakpoint = el.breakpoint;
      var _daType = el.type;
      daMatchMedia.push(window.matchMedia("(" + _daType + "-width: " + _daBreakpoint + "px)"));

      daMatchMedia[_index].addListener(dynamicAdapt);
    }
  } //Основная функция


  function dynamicAdapt(e) {
    for (var _index2 = 0; _index2 < daElementsArray.length; _index2++) {
      var _el = daElementsArray[_index2];
      var _daElement = _el.element;
      var _daDestination = _el.destination;
      var _daPlace = _el.place;
      var _daBreakpoint2 = _el.breakpoint;
      var daClassname = "_dynamic_adapt_" + _daBreakpoint2;

      if (daMatchMedia[_index2].matches) {
        //Перебрасываем элементы
        if (!_daElement.classList.contains(daClassname)) {
          var actualIndex = indexOfElements(_daDestination)[_daPlace];

          if (_daPlace === 'first') {
            actualIndex = indexOfElements(_daDestination)[0];
          } else if (_daPlace === 'last') {
            actualIndex = indexOfElements(_daDestination)[indexOfElements(_daDestination).length];
          }

          _daDestination.insertBefore(_daElement, _daDestination.children[actualIndex]);

          _daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (_daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(_daElement);

          _daElement.classList.remove(daClassname);
        }
      }
    }

    customAdapt();
  } //Вызов основной функции


  dynamicAdapt(); //Функция возврата на место

  function dynamicAdaptBack(el) {
    var daIndex = el.getAttribute('data-da-index');
    var originalPlace = originalPositions[daIndex];
    var parentPlace = originalPlace['parent'];
    var indexPlace = originalPlace['index'];
    var actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  } //Функция получения индекса внутри родителя


  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  } //Функция получения массива индексов элементов внутри родителя


  function indexOfElements(parent, back) {
    var children = parent.children;
    var childrenArray = [];

    for (var i = 0; i < children.length; i++) {
      var childrenElement = children[i];

      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i);
        }
      }
    }

    return childrenArray;
  } //Сортировка объекта


  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1;
      } else {
        return -1;
      }
    });
  } //Дополнительные сценарии адаптации


  function customAdapt() {
    var viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
})();

'use strict';

var select = function select() {
  var selectHeader = document.querySelectorAll('.select__header');
  var selectItem = document.querySelectorAll('.select__item');
  selectHeader.forEach(function (item) {
    item.addEventListener('click', selectToggle);
  });
  selectItem.forEach(function (item) {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
    var text = this.innerText,
        select = this.closest('.select'),
        currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
  }
};

select();
!function (e) {
  "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) {
    for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;) {
      ++n;
    }

    return Boolean(o[n]);
  }), "function" != typeof e.closest && (e.closest = function (e) {
    for (var t = this; t && 1 === t.nodeType;) {
      if (t.matches(e)) return t;
      t = t.parentNode;
    }

    return null;
  });
}(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
     Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
      overlay = document.querySelector('.js-overlay-modal'),
      closeButtons = document.querySelectorAll('.js-modal-close');
  /* Перебираем массив кнопок */

  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = this.getAttribute('data-modal'),
          modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      /* После того как нашли нужное модальное окно, добавим классы
         подложке и окну чтобы показать их. */

      modalElem.classList.add('active');
      overlay.classList.add('active');
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');
      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }); // end foreach

  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    }

    ;
  }, false);
  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
}); // end ready

(function () {
  var burger = document.querySelector('.header__burger');
  var body = document.querySelector('.body');
  var overlay = document.querySelector('.overlay-menu');
  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('dis');
  });
})();

(function () {
  var burger = document.querySelector('.header__link-call-mob');
  var body = document.querySelector('.body');
  var overlay = document.querySelector('.overlay-mob-tel');
  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('dis');
  });
})();

(function () {
  var action = document.querySelector('.header__link-action');
  var headercontainer = document.querySelector('.header__container');
  var body = document.querySelector('.body');
  var overlay = document.querySelector('.overlay-menu');
  var burger = document.querySelector('.header__burger');
  action.addEventListener('click', function () {
    action.classList.add('active');
    headercontainer.classList.add('active');
    body.classList.add('dis');
    overlay.classList.remove('active');
    burger.classList.remove('active');
  });
})();

(function () {
  var action = document.querySelector('.header__link-action');
  var headercontainer = document.querySelector('.header__container');
  var closeaction = document.querySelector('.close__action ');
  var body = document.querySelector('.body');
  closeaction.addEventListener('click', function () {
    action.classList.remove('active');
    headercontainer.classList.remove('active');
    body.classList.remove('dis');
  });
})();

var spoiler2 = document.querySelectorAll('.open-spoiler');

for (var i = 0; i < spoiler2.length; i++) {
  spoiler2[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling();

    if (content.style.display) {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

var checkbox = document.querySelectorAll('.calc__switch-block');

for (var _i = 0; _i < checkbox.length; _i++) {
  checkbox[_i].addEventListener('change', function () {
    this.classList.toggle('color');
  });
}