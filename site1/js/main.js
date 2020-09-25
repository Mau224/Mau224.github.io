"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);
		console.log(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
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
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

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

$(document).ready(function() {
    $('.spoiler-open').click(function(event) {
        if($('.service__container').hasClass('one')){
        }
        $('.item-block').toggleClass('active').slideToggle(300);
        // $('body').toggleClass('lock');
    });

    // $('.opener-sp').click(function(event) {
    //     $('.spoiler-open-two').toggleClass('disabled-sp').slideToggle(300);
    //     // $('body').toggleClass('lock');
    // });
});

// $(document).ready(function() {
//     $('.spoiler-open').click(function(event) {

//         $(this).toggleClass('active').$('.item-block').slideToggle(300);
//     });
// });

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
        centerMode: true,
        variableWidth: true,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: false,
                    speed: 1000,
                    autoplaySpeed: 800,
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '5px',
                    rows: 0
                }
            },
        ]
    });

    $(window).on('load resize', function() {
        if ($(window).width() < 767) {
            $('.slider-mob:not(.slick-initialized)').slick({
                arrow: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1
            });
        } else {
            $(".slider-mob.slick-initialized").slick("unslick");
        }
    });
});


$(document).ready(function(){
    $('.quality__container').slick({
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
                    slidesToShow: 1,
                }
            },
        ]
    });

    $(window).on('load resize', function() {
        if ($(window).width() < 767) {
            $('.quality__container:not(.slick-initialized)').slick({
                arrow: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1
            });
        } else {
            $(".quality__container.slick-initialized").slick("unslick");
        }
    });
});

$(document).ready(function(){
    $('.slider__container').slick({
        infinite: false,
        arrow: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        responsive: [
                {
                    breakpoint: 1023,
                    settings: {
                        dots: true,
                        arrows: false,
                        autoplay: false,
                        speed: 1000,
                        autoplaySpeed: 800,
                        slidesToShow: 1
                    }
                },
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
        arrow: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        rows: 3
    });
    $(window).on('load resize', function() {
        if ($(window).width() < 767) {
            $('.service__container:not(.slick-initialized)').slick({
                arrow: false,
                dots: true,
                infinite: true,
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
  $('.form-open').click(function() {
    $('.map__select-block').fadeIn();
    body.classList.add('hidden');
    return false;
  });

  $('.form__close').click(function() {
    $(this).parents('.map__select-block').fadeOut();
    body.classList.remove('hidden');
    return false;
  });

  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.map__select-block').fadeOut();
      body.classList.remove('hidden');
    }
  });

  $('.map__select-block').click(function(e) {
    if ($(e.target).closest('.map__form ').length === 0) {
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
