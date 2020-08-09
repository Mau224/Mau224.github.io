'use strict';

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu,.header__body').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

$(document).ready(function(){
    $('.header__link').click(function () {
        $('.header__burger,.header__menu,.header__body').removeClass('active');
        $('body').removeClass('lock');
    });
});

$('.header-content__input--name').on('input', function() {
    $(this).val($(this).val().replace(/^[ 0-9]+$/, ''))
});

$(function () {
    $('#tel').mask('+7 (999)–999–99-99');
});


if (window.localStorage) {
  var elements = document.querySelectorAll('[name]');

  for (var i = 0, length = elements.length; i < length; i++) {
    (function(element) {
      var name = element.getAttribute('name');

      element.value = localStorage.getItem(name) || '';

      element.onkeyup = function() {
        localStorage.setItem(name, element.value);
      };
    })(elements[i]);
  }
}
