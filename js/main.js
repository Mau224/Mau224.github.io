$(function(){
    $("#datepicker").datepicker({
        monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        onSelect: function(date){
            $('#datepicker_value').val(date)
        }
    });
    // $("#datepicker").datepicker("setDate", $('#datepicker_value').val());
});

'use strict';

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.navigation,.header__tel-wrapper,.header__logo-block').toggleClass('active');
        // $('body').toggleClass('lock');
    });
});

let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');

    }

};


select();


$(document).ready(function(){
    $('.slider-mob').slick({
        arrows: false,
        dots: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: false,
                    speed: 1000,
                    autoplaySpeed: 800,
                    slidesToShow: 1
                }
            },
        ]
    });

    $(window).on('load resize', function() {
        if ($(window).width() < 767) {
            $('.slider-mob:not(.slick-initialized)').slick({
                dots: true,
                infinite: true,
                arrow: false,
                speed: 100,
                slidesToShow: 1
            });
        } else {
            $(".slider-mob.slick-initialized").slick("unslick");
        }
    });
});

$(document).ready(function(){
    $('.slider__container').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrow: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: false,
                    speed: 1000,
                    autoplaySpeed: 800,
                    slidesToShow: 1
                }
            },
        ]
    });
});


$(document).ready(function(){
    $('.service__container').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrow: false,
        rows: 3
    });
    $(window).on('load resize', function() {
        if ($(window).width() < 767) {
            $('.service__container:not(.slick-initialized)').slick({
                dots: true,
                infinite: true,
                arrow: false,
                speed: 100,
                slidesToShow: 1,
                rows: 3
            });
        } else {
            $(".service__container.slick-initialized").slick("unslick");
        }
    });
});

$(document).ready(function($) {
  var body = document.querySelector('body');
  $('.popup-open').click(function() {
    $('.popup-fade').fadeIn();
    $('#tel').focus();
    body.classList.add('hidden');
    return false;
  });

  $('.popup-close').click(function() {
    $(this).parents('.popup-fade').fadeOut();
    body.classList.remove('hidden');
    return false;
  });

  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').fadeOut();
      body.classList.remove('hidden');
    }
  });

  $('.popup-fade').click(function(e) {
    if ($(e.target).closest('.popup').length === 0) {
      $(this).fadeOut();
      body.classList.remove('hidden');
    }
  });
});


$(document).ready(function($) {
  var body = document.querySelector('body');
  $('#commentform').submit(function(e) {
    if (($('input').val().length > 8)) {
      $('.modal').fadeIn();
      body.classList.add('hidden');
      return;
    }
  });
//
//   $('#commentpopup').submit(function(e) {
//     if (($('input').val().length > 8)) {
//       $('.modal').fadeIn();
//       body.classList.add('hidden');
//       $('.popup-fade').fadeOut();
//       return false;
//     }
//   });

// $(document).ready(function($) {
//   var body = document.querySelector('body');
//   $('.modal-open').click(function() {
//     $('.modal').fadeIn();
//     body.classList.add('hidden');
//     return false;
//   });

  $('.modal__close').click(function() {
    $(this).parents('.modal').fadeOut();
    body.classList.remove('hidden');
    return false;
  });

  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.modal').fadeOut();
      body.classList.remove('hidden');
    }
  });

  $('.modal').click(function (e) {
    if ($(e.target).closest('.modal__container').length === 0) {
      $(this).fadeOut();
      body.classList.remove('hidden');
    }
  });
});

$(document).ready(function($) {
  $('#tel,#phone').on('input', function() {
    $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''));
  });
});
