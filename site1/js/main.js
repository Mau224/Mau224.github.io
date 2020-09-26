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

jQuery.datetimepicker.setLocale('ru');

$(function() {
    $("#date").datetimepicker({
        inline: false,
        format:'d.m H:i',
        formatDate:'m/d',
        dayOfWeekStart: 1,
        monthChangeSpinner: false,
        onChangeMonth: false,
        yearOffset: 0,
        todayButton: false,
        defaultSelect:false,
        scrollMonth: false,
        minDate: 0,
        allowTimes: ['8:00','09:00','10:00','11:00','12:00','13:00','14:00', '15:00','16:00','17:00','18:00'],
    });
});

// $(document).ready(function() {
//     $('#date').datetimepicker({
//         inline: true,
//         format:'d.m H:i',
//         formatDate:'m/d',
//         dayOfWeekStart: 1,
//         monthChangeSpinner: false,
//         onChangeMonth: false,
//         yearOffset: 0,
//         todayButton: false,
//         defaultSelect:false,
//         scrollMonth: false,
//         minDate: 0,
//         allowTimes: ['8:00','09:00','10:00','11:00','12:00','13:00','14:00', '15:00','16:00','17:00','18:00'],
//     });
// });

// $('#date').CustomFormat = "MMMM dd";

'use strict';

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.navigation,.header__tel-wrapper,.header__logo-block').toggleClass('active');
        // $('body').toggleClass('lock');
    });
});

// $(document).ready(function() {
//     $('.spoiler-open').click(function(event) {
//         if($('.service__container').hasClass('one')){
//         }
//         $('.item-block').toggleClass('active').slideToggle(300);
//         // $('body').toggleClass('lock');
//     });
//
//     // $('.opener-sp').click(function(event) {
//     //     $('.spoiler-open-two').toggleClass('disabled-sp').slideToggle(300);
//     //     // $('body').toggleClass('lock');
//     // });
// });

$(document).ready(function(){
    $('.spoiler-open').click(function(){
        $('.item-block').slideDown(200);
        $(this).hide();
        $('.spoiler-close').show(200);
    });
    $('.spoiler-close').click(function(){
        $('.item-block').slideUp(200);
        $(this).hide();
        $('.spoiler-open').show(200);
    });
});


$(document).ready(function(){
    setTimeout(function(){
        window.scrollTo(0, 0);
    }, 1);
});

var map;
var directionsService;

var markerArr = [];
var directions = [];

function initMap() {
    directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 55.4792046,
            lng: 37.3273304
        },
        zoom: 10,
    });
    google.maps.event.addListener(map, 'click', function(e) {
        placeMarker(e.latLng);
    });
}

function placeMarker(position) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function(marker) {
        calculateAndDisplayRoute();
    });
    marker.addListener("click", () => {
        for (let i = 0; i < markerArr.length; i++) {
            if (markerArr[i] == marker) {
                markerArr[i].setMap(null);
                markerArr = markerArr.filter(elem => elem.map != null);
            }
        }
        calculateAndDisplayRoute();
    });
    markerArr.push(marker);
    calculateAndDisplayRoute();
}

function calculateAndDisplayRoute() {
    for (var i = 0; i < directions.length; i++) {
        directions[i].setMap(null);
    }
    directions = [];
    for (let i = 0; i < markerArr.length - 1; i++) {
        directionsService.route({
                origin: new google.maps.LatLng(markerArr[i].position.lat(), markerArr[i].position.lng()),
                destination: new google.maps.LatLng(markerArr[i + 1].position.lat(), markerArr[i + 1].position.lng()),
                travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if (status === "OK") {
                    var dirRenderer = new google.maps.DirectionsRenderer({
                        map: map,
                        suppressMarkers: true,
                        suppressInfoWindows: true
                    });
                    dirRenderer.setDirections(response);
                    directions.push(dirRenderer);
                }
            }
        );
    }
}

function initsecondMap() {
    var mapProp = {
        center: new google.maps.LatLng(55.63591045, 37.6814969),
        zoom: 10,
        disableDefaultUI: true,
    };

    var maps = new google.maps.Map(document.getElementById("map__about"), mapProp);
    var coordinates = {lat: 55.63591045, lng: 37.6814969};
    var marker = new google.maps.Marker({
        position: coordinates,
        map: maps,
    });
}

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
        dotsClass: 'slider__dots slick-dots',
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

    var dots = $('.slider__container li');
    //вешаем обработчик на наши точки
    dots.click(function(){
        var $this = $(this);
        dots.removeClass('before after');
        //отображаем 2 предыдущие точки
        $this
            .prev().addClass('before')
            .prev().addClass('before');
        //отображаем 2 следующие точки
        $this
            .next().addClass('after')
            .next().addClass('after');


        //если мы в самом начале - добавляем пару последующих точек
        if(!$this.prev().length) {
            $this.next().next().next()
                .addClass('after').next()
                .addClass('after');
        }
        //на 2й позиции - добавляем одну точку
        if(!$this.prev().prev().length) {
            $this.next().next().next()
                .addClass('after');
        }
        //в самом конце - добавляем пару доп. предыдущих точек
        if(!$this.next().length) {
            $this.prev().prev().prev()
                .addClass('before').prev()
                .addClass('before');
        }
        //предпоследний элемента - добавляем одну пред. точку
        if(!$this.next().next().length) {
            $this.prev().prev().prev()
                .addClass('before');
        }
    });
    dots.eq(0).click();//кликаем на первую точку
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
  $('.modal-open').click(function() {
    $('.modal').fadeIn();
    body.classList.add('hidden');
    return false;
  });


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


$(document).ready(function() {
  function checkWidth() {
    var windowWidth = $('body').innerWidth(),
        elem = $(".header-content__btn-sub"); // лучше сохранять объект в переменную, многократно чтобы не насиловать
    // страницу для поиска нужного элемента
    if(windowWidth < 768){
      elem.removeClass('modal-open');
      elem.addClass('popup-open');
    }
    else{
      elem.removeClass('popup-open');
      elem.addClass('modal-open');
    }
  }

  checkWidth(); // проверит при загрузке страницы

  $(window).resize(function(){
    checkWidth(); // проверит при изменении размера окна клиента
  });
});
