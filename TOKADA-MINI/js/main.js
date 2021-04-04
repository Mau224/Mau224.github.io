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



var callname = $('#call__form-name');
var callphone = document.getElementById('call__form-phone');

$('.call-form-btn').on('click', function(e){
    if(callname.val() != '' && callphone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendCallForm();
        $('.modal-check').addClass('active');
        return false
    }
});


function sendCallForm(){
    var callnameVal = callname.val();
    var callphoneVal = callphone.inputmask.unmaskedvalue();
    $.ajax({
        url: "/phpexport/callexport.php",
        method: "POST",
        data: {
            callname: callnameVal,
            callphone: callphoneVal
        }
    });
};

var furniturephone = document.getElementById('mob');

$('.time__sub-btn').on('click', function(e){
    if(furniturephone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendFurnitureForm();
        $('.modal-check').addClass('active');
        return false
    }
    
});

function sendFurnitureForm(){
    
    var furniturephoneVal = furniturephone.inputmask.unmaskedvalue();
    $.ajax({
        url: "/phpexport/furnitureexport.php",
        method: "POST",
        data: {
            furniturephone: furniturephoneVal
        }
    });
};


$('.type-radio').on('click', function(){
    $(this).parents('.calc__row-wrap').attr('value', $(this).text()) 
});
$('.select__item').on('click', function(){
    $(this).parents('.select__body').attr('value', $(this).text()) 
});
$('.window-radio').on('click', function(){
    $(this).parents('.calc__second-wrap').attr('value', $(this).find('p').text()) 
});
$('.pane-radio').on('click', function(){
    $(this).parents('.calc-fourth').attr('value', $(this).text()) 
});


var calcFirst = $('.calc__row-wrap');
var calcSecond = $('.select__body');
var calcThird = $('.calc__second-wrap');
var calcFourth = $('.calc-fourth');
var calcFifth = $('.calc-windowsill');
var calcSix = $('.calc-color');
var calcSeven = $('.calc-mont');
var calcName = $('.calc-name');
var calcphone = document.getElementById('mobile');

$('.calc__sub-btn').on('click', function(e){
    if(calcName.val() != '' && calcphone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendCalcForm();
        $('.modal-check').addClass('active');
        return false
    }
    
});


function sendCalcForm(){
    var calcFirstVal = calcFirst.attr('value');
    var calcSecondVal = calcSecond.attr('value');
    var calcThirdVal = calcThird.attr('value');
    var calcFourthVal = calcFourth.attr('value');
    var calcFifthVal = calcFifth.attr('value');
    var calcSixVal = calcSix.attr('value');
    var calcSevenVal = calcSeven.attr('value');
    var calcNameVal = calcName.val();
    var calcPhoneVal = calcphone.inputmask.unmaskedvalue();
    $.ajax({
        url: "/phpexport/calcexport.php",
        method: "POST",
        data: {
            calcfirst : calcFirstVal,
            calcsecond : calcSecondVal,
            calcthird : calcThirdVal,
            calcfourth : calcFourthVal,
            calcfifth : calcFifthVal,
            calcsix : calcSixVal,
            calcseven : calcSevenVal,
            calcname : calcNameVal,
            calcphone: calcPhoneVal
        }
    });
};

var measureName = $('#username');
var measurephone = document.getElementById('phone-num');

$('.form__sub-btn').on('click', function(e){
    if(measureName.val() != '' && measurephone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendMeasureForm();
        $('.modal-check').addClass('active');
        return false
    }
});

function sendMeasureForm(){
    
    var measureNameVal = measureName.val();
    var measurePhoneVal = measurephone.inputmask.unmaskedvalue();
    
    $.ajax({
        url: "/phpexport/measureexport.php",
        method: "POST",
        data: {
            measurename : measureNameVal,
            measurephone: measurePhoneVal
        }
    });
    
};

var modalmeasureName = $('#name-modal');
var modalmeasurephone = document.getElementById('phone-modal');

$('.modal-measure').on('click', function(e){
    if(modalmeasureName.val() != '' && modalmeasurephone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendModalMeasureForm();
        $('.modal').removeClass('active');
        $('.modal-check').addClass('active');
        return false
    }
    
});

function sendModalMeasureForm(){
    
    var modalmeasureNameVal = modalmeasureName.val();
    var modalmeasurePhoneVal = modalmeasurephone.inputmask.unmaskedvalue();
    
    $.ajax({
        url: "/phpexport/modalmeasureexport.php",
        method: "POST",
        data: {
            modalmeasurename : modalmeasureNameVal,
            modalmeasurephone: modalmeasurePhoneVal
        }
    });
};

var modalcallname = $('#name-modal-call');
var modalcallphone = document.getElementById('phone-modal-call');

$('.modal-call-btn').on('click', function(e){
    if(modalcallname.val() != '' && modalcallphone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendModalCallForm();
        $('.modal').removeClass('active');
        $('.modal-check').addClass('active');
        return false
    }
    
});


function sendModalCallForm(){
    var modalcallnameVal = modalcallname.val();
    var modalcallphoneVal = modalcallphone.inputmask.unmaskedvalue();
    $.ajax({
        url: "/phpexport/modalcallexport.php",
        method: "POST",
        data: {
            modalcallname: modalcallnameVal,
            modalcallphone: modalcallphoneVal
        }
    });
};

var modaldirname = $('#name-modal-dir');
var modaldirmail = $('#email-dir');
var modaldirmessage = $('#message-dir');

$('.director-sub-btn').on('click', function(e){
    
    if(modaldirname.val() != '' && modaldirmail.val() != '' && modaldirmessage.val() != ''){
        e.preventDefault();
        sendModalDirForm();
        $('.modal').removeClass('active');
        $('.modal-check').addClass('active');
        return false 
    }
    
});


function sendModalDirForm(){
    var modaldirnameVal = modaldirname.val();
    var modaldirmailVal = modaldirmail.val();
    var modaldirmessageVal = modaldirmessage.val();
    $.ajax({
        url: "/phpexport/modaldirexport.php",
        method: "POST",
        data: {
            modaldirname: modaldirnameVal,
            modaldirmail: modaldirmailVal,
            modaldirmessage: modaldirmessageVal,
        }
    });
};

var modalvacname = $('#name-modal-vacancies');
var modalvacphone = document.getElementById('phone-modal-vacancies');
var modalvacmessage = $('#vac-message');

$('.vac-sub-btn').on('click', function(e){
        if(modalvacname.val() != '' && modalvacphone.inputmask.unmaskedvalue() != '' && modalvacmessage.val() != ''){

            e.preventDefault();
            sendModalVacForm();
            $('.modal').removeClass('active');
            $('.modal-check').addClass('active');
            return false
        }
});


function sendModalVacForm(){
    var modalvacnameVal = modalvacname.val();
    var modalvacphoneVal = modalvacphone.inputmask.unmaskedvalue();
    var modalvacmessageVal = modalvacmessage.val();
    
    $.ajax({
        url: "/phpexport/modalvacexport.php",
        method: "POST",
        data: {
            modalvacname: modalvacnameVal,
            modalvacphone: modalvacphoneVal,
            modalvacmessage: modalvacmessageVal,
        }
    });
};

var questioncallname = $('#question-name');
var questioncallphone = document.getElementById('question-phone');

$('.action__sub-btn').on('click', function(e){
    if(questioncallname.val() != '' && questioncallphone.inputmask.unmaskedvalue() != ''){
        e.preventDefault();
        sendQuestionCallForm();
        $('.modal-check').addClass('active');
        return false
    }
    
});


function sendQuestionCallForm(){
    var questioncallnameVal = questioncallname.val();
    var questioncallphoneVal = questioncallphone.inputmask.unmaskedvalue();
    $.ajax({
        url: "/phpexport/questioncallexport.php",
        method: "POST",
        data: {
            questioncallname: questioncallnameVal,
            questioncallphone: questioncallphoneVal
        }
    });
};
'use strict';
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
        this.parentElement.classList.toggle('is-open');
    }


    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-open');
    }
};

select();


const inputs = document.querySelectorAll('.swaper');

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', function () {
            if (inputs[i].checked) {
                inputs[i].setAttribute('value', 'да');
            } else {
                inputs[i].setAttribute('value', 'нет');
            }
        })
    }
});

// let removeBtn = document.querySelector('.header__link-action');
// if (window.innerWidth < 870) {
//     removeBtn.classList.remove('js-open-modal');
// } else  {
//     removeBtn.classList.add('js-open-modal');
// }

// // const container = document.querySelector('.container');
//
// inputs.forEach(el => {
//     el.addEventListener('click', () => {
//         // container.textContent = '';
//         let inputCh = document.querySelectorAll('.swaper:checked');
//
//         inputCh.forEach(el_checked => {
//             if (this.checked) {
//                 inputCh.setAttribute('value', 'lf');
//             }
//         });
//     });
// });




!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function() {

    /* Записываем в переменные массив элементов-кнопок и подложку.
       Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay      = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');


    /* Перебираем массив кнопок */
    modalButtons.forEach(function(item){

        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener('click', function(e) {

            e.preventDefault();

            var modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


            /* После того как нашли нужное модальное окно, добавим классы
               подложке и окну чтобы показать их. */
            modalElem.classList.add('active');
            overlay.classList.add('active');
        }); // end click

    }); // end foreach


    closeButtons.forEach(function(item){

        item.addEventListener('click', function(e) {
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
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });




}); // end ready

let modalZamer = document.querySelector('.header__mob-avatar');
const overlay = document.querySelector('.overlay-menu');
const burger = document.querySelector('.header__burger');
const body = document.querySelector('.body');
const closeModalZamer = document.querySelectorAll('.close_modal_window');
const megaBlock = document.querySelector('.header__mega-menu-block ');
const megaBlockText = document.querySelector('.header__mega-menu-block-text');
const megaBlockLinks = document.querySelector('.header__main-list-hover-links');
const linkPrice = document.querySelector('.what-price');
const modalTel = document.querySelector('.overlay-mob-tel');
const modalTelBtn = document.querySelector('.header__link-call-mob ');

closeModalZamer.forEach(function(item){
    item.addEventListener('click', function (){
        body.style.overflow = 'auto';
        overlay.classList.remove('active');
        burger.classList.remove('active');
        megaBlock.classList.remove('active');
        megaBlockText.classList.remove('active');
        megaBlockLinks.classList.remove('active');
    })
})


if(window.innerWidth < 870) {
    modalZamer.addEventListener('click',function (){
        overlay.classList.remove('active');
        burger.classList.remove('active');
        body.classList.remove('dis');
        modalTel.classList.remove('active');
        modalTelBtn.classList.remove('active');
    })

    linkPrice.addEventListener('click',function (){
        overlay.classList.remove('active');
        burger.classList.remove('active');
        body.classList.remove('dis');
        // body.style.overflow = 'auto';
    })
}

(function () {
    const burger = document.querySelector('.header__burger');
    const burgerWrap = document.querySelector('.header__burger-mega-block');
    const tabDis = document.querySelector('.header__link-call-mob');
    const body = document.querySelector('.body');
    const overlay = document.querySelector('.overlay-menu');
    const menuText = document.querySelector('.header__mega-menu-block-text');
    const mainList = document.querySelector('.header__main-list-hover-links');
    const megaList = document.querySelector('.header__mega-menu-block');
    burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        overlay.classList.toggle('active');
        menuText.classList.toggle('active');
        mainList.classList.toggle('active');
        megaList.classList.toggle('active');
        burgerWrap.classList.toggle('active');
        body.classList.toggle('dis');

        if (burger.classList.contains('active')) {
            body.style.overflow = 'hidden';
            tabDis.addEventListener('click', function (){
                burger.classList.remove('active');
                overlay.classList.remove('active');
            })
        } else {
            body.style.overflow = 'auto';
        }
    });
}());

(function () {
    const burger = document.querySelector('.header__link-call-mob');
    const tabDis = document.querySelector('.header__burger');
    const body = document.querySelector('.body');
    const overlay = document.querySelector('.overlay-mob-tel');
    burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('dis');

        if (burger.classList.contains('active')) {
            body.style.overflow = 'hidden';
            tabDis.addEventListener('click', function (){
                burger.classList.remove('active');
                overlay.classList.remove('active');
            })
        } else {
            body.style.overflow = 'auto'
        }
    });
}());

(function () {
    const action = document.querySelector('.header__link-action');
    const headercontainer = document.querySelector('.header__container');
    const body = document.querySelector('.body');
    const overlay = document.querySelector('.overlay-menu');
    const burger = document.querySelector('.header__burger');
    action.addEventListener('click', function () {
        action.classList.add('active');
        headercontainer.classList.add('active');
        body.classList.add('dis');
        overlay.classList.remove('active');
        burger.classList.remove('active');
    });
}());

(function () {
    const action = document.querySelector('.header__link-action');
    const headercontainer = document.querySelector('.header__container');
    const closeaction = document.querySelector('.close__action ');
    const body = document.querySelector('.body');
    closeaction.addEventListener('click', function () {
        action.classList.remove('active');
        headercontainer.classList.remove('active');
        body.classList.remove('dis');
    });
}());

//блок окна акций на мобильном
let actionLink = document.querySelector('.header__link-action');

if (window.innerWidth < 870) {
    actionLink.classList.remove('js-open-modal');
} else {
    actionLink.classList.add('js-open-modal');
}

//метрика
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(70714834, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
});

const swiper = new Swiper('.recomend__slider', {
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // centeredSlides: true,
    // clickable: true,
    spaceBetween: 14,
    // loop: true,
    // updateOnWindowResize: true,

    slidesPerView: 1.34,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,

    breakpoints: {
    867: {
        slidesPerView: 3.1,
        loop: true,
        spaceBetween: 40,
        // slidesOffsetBefore: 100,
        // slidesOffsetAfter: 100,
    },
    }
});

const slide = document.querySelector('.recomend__item')

swiper.on('slideChange', function () {
    slide.classList.remove('recomend__item--first');
});

// const slider = document.querySelector('.whyus__wrapper');
const sliders = document.querySelectorAll('.slider');

function mobileSlider() {
    sliders.forEach((el) => {
        let swiperMob = new Swiper(el, {
            slidesPerView: 1.34,
            // loop: true,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 110,
            spaceBetween: 22,
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },

            breakpoints: {
                500: {
                    slidesOffsetAfter: 450,
                },

                700: {
                    slidesOffsetAfter: 550,
                }
            }
    });


        if (window.innerWidth > 867) {
            el.dataset.mobile = 'false';
            if (el.classList.contains('swiper-container-initialized')) {
                swiperMob.destroy();
            }
        }
    });
}

mobileSlider()

window.addEventListener('resize', () => {
	mobileSlider();
});

const sliderMini = document.querySelectorAll('.slider-mini');

function mobileSliderMini() {
    sliderMini.forEach((el) => {
        let swiperMobMini = new Swiper(el, {
            slidesPerView: 1.5,
            spaceBetween: 22,
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },
        });


        if (window.innerWidth > 867) {
            el.dataset.mobile = 'false';
            if (el.classList.contains('swiper-container-initialized')) {
                swiperMobMini.destroy();
            }
        }
    });
}

mobileSliderMini()

window.addEventListener('resize', () => {
    mobileSliderMini();
});


const sliderWhyus = document.querySelectorAll('.sliderWhyus');

function SliderWhyus() {
    sliderWhyus.forEach((el) => {
        let swiperWhyus = new Swiper(el, {
            slidesPerView: 1.34,
            // loop: true,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 90,
            spaceBetween: 22,
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },

            breakpoints: {
                500: {
                    slidesOffsetAfter: 400,
                    slidesPerView: 'auto'
                },

                700: {
                    slidesOffsetAfter: 400,
                    slidesPerView: 'auto'
                }
            }

        });


        if (window.innerWidth > 867) {
            el.dataset.mobile = 'false';
            if (el.classList.contains('swiper-container-initialized')) {
                swiperWhyus.destroy();
            }
        }
    });
}



SliderWhyus()

window.addEventListener('resize', () => {
    SliderWhyus();
});





let spoiler2 = document.querySelectorAll('.open-spoiler');

for (let i = 0; i < spoiler2.length; i++) {
    spoiler2[i].addEventListener('click', function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling();
        if (content.style.display) {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    })
}

var checkbox = document.querySelectorAll('.calc__switch-block');

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('change', function () {
        this.classList.toggle('color');

    })
}



document.addEventListener('DOMContentLoaded', () => {
	const newYear = new Date('Dec 28 2021 00:00:00');

	// const daysVal = document.querySelector('.time-count__days .time-count__val');
	const hoursVal = document.querySelector('.time-count__hours .time-count__val');
	const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
	const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

	// const daysText = document.querySelector('.time-count__days .time-count__text');
	const hoursText = document.querySelector('.time-count__hours .time-count__text');
	const minutesText = document.querySelector('.time-count__minutes .time-count__text');
	const secondsText = document.querySelector('.time-count__seconds .time-count__text');

	function declOfNum(number, titles) {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	}

	const timeCount = () => {
		let now = new Date();
		let leftUntil = newYear - now;

		// let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
		let seconds = Math.floor(leftUntil / 1000) % 60;

		if (hours < 10) {
			hoursVal.textContent = '0' + hours;
			hoursVal.style.letterSpacing = '7vw';
		} else if (hours < 20) {
			hoursVal.textContent = hours;
			hoursVal.style.letterSpacing = '8.7vw';
		} else {
			hoursVal.textContent = hours;
			hoursVal.style.letterSpacing = '7vw';
		}

		if (minutes < 10) {
			minutesVal.textContent = '0' + minutes;
			minutesVal.style.letterSpacing = '6.8vw';
		} else if (minutes < 20) {
			minutesVal.textContent = minutes;
			minutesVal.style.letterSpacing = '7.7vw';
		} else {
			minutesVal.textContent = minutes;
			minutesVal.style.letterSpacing = '6.8vw';
		}

		if (seconds < 10) {
			secondsVal.textContent = '0' + seconds;
			secondsVal.style.letterSpacing = '6.75vw';
		} else if (seconds < 20) {
			secondsVal.textContent = seconds;
			secondsVal.style.letterSpacing = '7.7vw';
		} else {
			secondsVal.textContent = seconds;
			secondsVal.style.letterSpacing = '6.75vw';
		}

		if (window.innerWidth > 1600) {
			if (hours < 10) {
				hoursVal.textContent = '0' + hours;
				hoursVal.style.letterSpacing = '5.8vw';
			} else if (hours < 20) {
				hoursVal.textContent = hours;
				hoursVal.style.letterSpacing = '7.7vw';
			} else {
				hoursVal.textContent = hours;
				hoursVal.style.letterSpacing = '5.8vw';
			}

			if (minutes < 10) {
				minutesVal.textContent = '0' + minutes;
				minutesVal.style.letterSpacing = '5.8vw';
			} else if (minutes < 20) {
				minutesVal.textContent = minutes;
				minutesVal.style.letterSpacing = '6.7vw';
			} else {
				minutesVal.textContent = minutes;
				minutesVal.style.letterSpacing = '5.8vw';
			}

			if (seconds < 10) {
				secondsVal.textContent = '0' + seconds;
				secondsVal.style.letterSpacing = '5.7vw';
			} else if (seconds < 20) {
				secondsVal.textContent = seconds;
				secondsVal.style.letterSpacing = '6.1vw';
			} else {
				secondsVal.textContent = seconds;
				secondsVal.style.letterSpacing = '5.7vw';
			}
		}


		if (window.innerWidth < 870) {
			if (hours < 10) {
				hoursVal.textContent = '0' + hours;
				hoursVal.style.letterSpacing = '57px';
			} else if (hours < 20) {
				hoursVal.textContent = hours;
				hoursVal.style.letterSpacing = '65px';
			} else {
				hoursVal.textContent = hours;
				hoursVal.style.letterSpacing = '57px';
			}

			if (minutes < 10) {
				minutesVal.textContent = '0' + minutes;
				minutesVal.style.letterSpacing = '57px';
			} else if (minutes < 20) {
				minutesVal.textContent = minutes;
				minutesVal.style.letterSpacing = '65px';
			} else {
				minutesVal.textContent = minutes;
				minutesVal.style.letterSpacing = '57px';
			}

			if (seconds < 10) {
				secondsVal.textContent = '0' + seconds;
				secondsVal.style.letterSpacing = '57px';
			} else if (seconds < 20) {
				secondsVal.textContent = seconds;
				secondsVal.style.letterSpacing = '65px';
			} else {
				secondsVal.textContent = seconds;
				secondsVal.style.letterSpacing = '57px';
			}
		}

		hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
		minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
		secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
	};

	timeCount();
	setInterval(timeCount, 1000);
});

let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

let selector2 = document.querySelector('input[type="tel"]');

selector2.addEventListener('input', function(){
  console.log(selector2.value)


  const re = /^\d*(\.\d+)?$/

  console.log(selector2.value.match(/[0-9]/g).length)


  console.log(selector2.value.replace(/[0-9]/g, "0"));

});


let validEmail = document.querySelectorAll('input[type="email"]');

let im2 = new Inputmask("*{3,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{3,20}[.*{2,6}][.*{1,2}].*{2,20}[.*{2,6}][.*{1,2}]");
im2.mask(validEmail);

let validEmail2 = document.querySelector('input[type="email"]');

validEmail2.addEventListener('input', function(){
  console.log(selector2.value)


  const re2 = /^\d*(\.\d+)?$/

  console.log(validEmail2.value.match(/[0-9]/g).length)


  console.log(validEmail2.value.replace(/[0-9]/g, "0"));
});


(function (){

//корректировки для спойлера в услугах

  let plusService = document.querySelector('.service__plus-open');
  let linkServie = document.querySelector('.service__item-lin-title');
  plusService.addEventListener('click', function () {
    linkServie.classList.toggle('active');
  })
})

