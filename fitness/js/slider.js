'use strict';

$(function () {
  $('#phone').mask('8(999) 999-99-99');
});

$('.trainers__slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  adaptiveHeight: false,
  slidesToScroll: 4,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        adaptiveHeight: true,
        variableWidth: true
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        infinite: true,
        variableWidth: false,
        slidesToScroll: 1
      }
    }
  ]
});

$('.reviews__container').slick({
  speed: 300,
  variableWidth: true,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        variableWidth: false,
      },
    }
  ]
});

