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

'use strict';
let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');
    let modalClose = document.getElementsByClassName('.mini-modal__close');

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

    // modalClose.addEventListener('click', function () {
    //     select.classList.remove('is-active');
    // })
};

select();

//функция на мобильные телефоны

(function () {
    const overlayModal = document.querySelector('.overlay-modal');
    const modalPhone = document.querySelector('.modal-open');
    const headerTop = document.querySelector('.header__top');
    const modalClose = document.querySelector('.modal-close')
    modalPhone.addEventListener('click', function () {
        modalPhone.classList.toggle('active');
        overlayModal.classList.toggle('active');
        if (window.innerWidth < 867) {
            headerTop.classList.toggle('active');
        }
    })

    modalClose.addEventListener('click', function () {
        modalPhone.classList.remove('active');
        overlayModal.classList.remove('active');
        if (window.innerWidth < 867) {
            headerTop.classList.remove('active');
        }
    })
}());


var checkbox = document.querySelector('.switch-theme');

checkbox.addEventListener('change', function (){
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})

let spoiler = document.querySelectorAll('.home-adv__open');

for (let i = 0; i < spoiler.length; i++) {
    spoiler[i].addEventListener('click', function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling();
        if (content.style.display) {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    })
}

const tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav__item'), // Выбираем элементы навигации табов
        tabContent = document.querySelectorAll('.tabs-content__item'), // Выбираем самы табы
        tabName; // Переменная для имени таба

    // Проходим циклом по каждому элементу навигации и навешиваем обработчик клика, который вызывает функцию selectTabNav
    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            // Удаляем активный класс у всех элементов навигации табов
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');  // Добавляем активный укласс у элемента по которому кликнули
        tabName = this.getAttribute('data-tab-name'); // Получаем имя таба, который нам нужен
        selectTabContent(tabName); // Запускаем функцию, чтобы показать выбранный таб
    }

    function selectTabContent(tab) {
        // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной tabName). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
        });
    }
};

tab();

const tab2 = function () {
    let tabNav = document.querySelectorAll('.service__tabs-item'), // Выбираем элементы навигации табов
        tabContent = document.querySelectorAll('.service__tabs-contentitem'), // Выбираем самы табы
        tabName; // Переменная для имени таба

    // Проходим циклом по каждому элементу навигации и навешиваем обработчик клика, который вызывает функцию selectTabNav
    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            // Удаляем активный класс у всех элементов навигации табов
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');  // Добавляем активный укласс у элемента по которому кликнули
        tabName = this.getAttribute('data-tab-name'); // Получаем имя таба, который нам нужен
        selectTabContent(tabName); // Запускаем функцию, чтобы показать выбранный таб
    }

    function selectTabContent(tab) {
        // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной tabName). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
        });
    }
};

tab2();


const tab3 = function () {
    let tabNav = document.querySelectorAll('.tabs-nav__calc-item'), // Выбираем элементы навигации табов
        tabContent = document.querySelectorAll('.tabs-content__calc-item'), // Выбираем самы табы
        tabName; // Переменная для имени таба

    // Проходим циклом по каждому элементу навигации и навешиваем обработчик клика, который вызывает функцию selectTabNav
    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            // Удаляем активный класс у всех элементов навигации табов
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');  // Добавляем активный укласс у элемента по которому кликнули
        tabName = this.getAttribute('data-tab-name'); // Получаем имя таба, который нам нужен
        selectTabContent(tabName); // Запускаем функцию, чтобы показать выбранный таб
    }

    function selectTabContent(tab) {
        // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной tabName). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
        });
    }
};

tab3();

let mapLink = document.querySelectorAll('.svg-item');
let mapBlock = document.querySelector('.home-map__info');
    mapLink.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            mapBlock.style.display = 'block';
        });

            el.addEventListener('mouseleave', (e) => {
                mapBlock.style.display = 'none';
        });
    });

//cкрипт создающий тень при появлении окна городов и корректирующий его работу

let cityBtn = document.querySelector('.header-city__select');
let myNav =  document.getElementById("myNav");
const headerTop = document.querySelector('.header__top');
const headerBottom = document.querySelector('.header__menu');
const modalCity = document.querySelector('.modal-city');
var overlayCity = document.querySelector('.js-overlay-modal');

if (window.innerWidth < 870) {
    cityBtn.addEventListener('click', function() {
        myNav.style.height = "0%";
        headerTop.classList.add('index5k');
        overlayCity.classList.add('index5k');
    })

    headerBottom.addEventListener('click', function() {
        headerTop.classList.remove('index5k');
        overlayCity.classList.remove('index5k');
        modalCity.classList.remove('active');
        overlayCity.classList.remove('active');
    })
}

//тут скрипт модальных окон которые появляются через обращение к data-modal чаще всего это независимые окна ,которые поялвяются поверх всего
let body = document.querySelector('body');

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
            body.classList.add('dis');
        }); // end click

    }); // end foreach


    closeButtons.forEach(function(item){

        item.addEventListener('click', function(e) {
            var parentModal = this.closest('.modal');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('dis');
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
        body.classList.remove('dis');
    });




}); // end ready



//корректировка стилей для окна поиска
let searchOpen = document.querySelector('.modal-search__open');
let searchClose = document.querySelector('.modal-header__close');
let header = document.querySelector('.header');

searchOpen.addEventListener('click', function (){
    header.classList.add('active');
})

searchClose.addEventListener('click', function (){
    header.classList.remove('active');
})

let openPhone = document.querySelector('.modal-open__phones');

openPhone.addEventListener('click', function (){
    header.classList.toggle('index');
})

/* Open */
function openNav() {
    let openNav = document.getElementById("myNav");
    let menuBtn = document.querySelector('.header__menu');
    let mainText = document.querySelector('.header__menu-main-text');
    menuBtn.addEventListener('click', function () {
        openNav.style.height = "100%";
        body.classList.add('dis');
    })

    if (window.innerWidth < 870) {
        menuBtn.classList.remove('open__mega-menu');
        menuBtn.classList.add('open-menu');
        mainText.classList.remove('text-swap');
    } else  {
        menuBtn.classList.add('open__mega-menu');
        menuBtn.classList.remove('open-menu');
        mainText.classList.add('text-swap')
    }
}
openNav();



window.addEventListener('resize', () => {
    openNav();
});

/* Close */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    body.classList.remove('dis');
}

//окно мега меню

let openMega = document.querySelector('.open__mega-menu');
let textSwap = document.querySelector('.text-swap');
let overlay = document.querySelector('.overlay-modal');
let megaMenu = document.querySelector('.mega-menu');

openMega.addEventListener('click', function () {
    if(this.classList.contains('active')) {
        textSwap.textContent = 'Mеню';
        body.classList.remove('dis');
        // overlay.classList.remove('active');
    } else  {
        textSwap.textContent = 'Закрыть меню';
        body.classList.add('dis');
    }

    if(headerTop.classList.contains('index5k')) {
        headerTop.classList.remove('index5k');
    }
    megaMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    openMega.classList.toggle('active');
    header.classList.toggle('index-max');
})

//окно входа (маленькое)

let openLogin = document.querySelector('.header__login');
let loginBlock = document.querySelector('.header__log-block');
let closeLogin = document.querySelector('.log__closer');
openLogin.addEventListener('click', function (){
    loginBlock.style.display = "flex";
    overlay.classList.remove('active');
})

closeLogin.addEventListener('click', function () {
    loginBlock.style.display = "none";
    overlay.classList.remove('active');
})


// (function () {
//     let closeRigionModal = document.querySelector('.slect__body-footer');
//     let selectReg = document.querySelector('.select-reg');
//
//     closeRigionModal.addEventListener('click', function (){
//         selectReg.classList.remove('is-active');
//     })
// }());



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



//оставил в самом конце тк,выдается ошибка на других страницах не придумал как сделать
//модальное услуг на странице cart.html ("появляется по клику на 'Добавить услугу'")
function modalCart() {
  let closerService = document.querySelector('.cart__service-modal-close');
  let openerService = document.querySelector('.cart__open-service');
  let cartServiceModal = document.querySelector('.cart__service-modal');

  if (window.innerWidth > 870) {
    openerService.addEventListener('click', function () {
      cartServiceModal.classList.add('active');
      openerService.classList.add('change-color');
      openerService.textContent = '- УДАЛИТЬ УСЛУГУ';
    })


    closerService.addEventListener('click', function () {
      cartServiceModal.classList.remove('active');
      openerService.classList.remove('change-color');
      openerService.textContent = '+ ДОБАВИТЬ УСЛУГУ';
    })
  }
}
modalCart();

window.addEventListener('resize', () => {
  modalCart();
});

