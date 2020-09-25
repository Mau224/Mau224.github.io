'use strict';

$(function () {
  $('#phone').mask('+7(999) 999-99-99');
  $('#tel').mask('+7(999) 999-99-99');
});

$(document).ready(function () {
  $('.footer__block-title').click(function (event) {
    if($('.footer__link-block').hasClass('one')) {
      $('.footer__block-title').not($(this)).removeClass('active');
      $('.footer__list').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  })
})

$(document).ready(function() {
  function checkWidth() {
    var windowWidth = $('body').innerWidth(),
      elem = $('.footer__list');

    if(windowWidth > 768) {
      $(elem.attr('style', ''));
      $('.footer__block-title').removeClass('active');
    }
  }

  checkWidth();

  $(window).resize(function() {
    checkWidth();
  });
});
