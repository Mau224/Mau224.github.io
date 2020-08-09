"use strict";

$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger,.header__menu,.header__body').toggleClass('active');
    $('body').toggleClass('lock');
  });
});
$(document).ready(function () {
  $('.header__link').click(function () {
    $('.header__burger,.header__menu,.header__body').removeClass('active');
    $('body').removeClass('lock');
  });
});
$('.header-content__input--name').on('input', function () {
  $(this).val($(this).val().replace(/^[ 0-9]+$/, ''));
});
$(function () {
  $('#tel').mask('+7 (999)–999–99-99');
});
"use strict";

ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    center: [59.938635, 30.323118],
    zoom: 16,
    controls: []
  });
  myMap.panes.get('ground').getElement().style.filter = 'grayscale(50%)';
  var placemark3 = new ymaps.Placemark([59.938635, 30.323118], {
    hintContent: 'Вам сюда',
    iconContent: 'Вам сюда'
  }, {
    'preset': 'islands#greenStretchyIcon'
  });
  myMap.geoObjects.add(placemark3);
});
"use strict";

if (window.localStorage) {
  var elements = document.querySelectorAll('[name]');

  for (var i = 0, length = elements.length; i < length; i++) {
    (function (element) {
      var name = element.getAttribute('name');
      element.value = localStorage.getItem(name) || '';

      element.onkeyup = function () {
        localStorage.setItem(name, element.value);
      };
    })(elements[i]);
  }
}