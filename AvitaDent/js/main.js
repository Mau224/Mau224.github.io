const slides = document.querySelectorAll('.service__img-hover');

// const swiperMax = document.querySelector('#swiper-max');
// swiperMax.textContent = slides.length;
//
// const swiperCount = document.querySelector('#swiper-count');
var swiperCounter = document.getElementById('swiper-counter');
let slider_serv_main_block = new Swiper('.slider-serv-main-block', {
    slidesPerView: 1,
    slidesOffsetAfter: 0,
    spaceBetween: 0,
    speed: 800,
    initialSlide:0,
    // on: {
    //     slideNextTransitionStart() {
    //         swiperCount.textContent = +swiperCount.textContent === slides.length ? 1 : +swiperCount.textContent + 1;
    //     },
    //     slidePrevTransitionStart() {
    //         swiperCount.textContent = +swiperCount.textContent === 1 ? slides.length : +swiperCount.textContent - 1
    //     }
    // },
    pagination: {
        el: '.serv-main__dots',
        clickable: true,
    },
    navigation: {
        nextEl: '.offer-serv-main__arrow-next',
        prevEl: '.offer-serv-main__arrow-prev',
    },
    // hashNavigation: {
    //     watchState: true,
    // }
    on: {
        init: function () {
            swiperCounter.innerHTML = '<h3>0</h3>' + '1' + '<p>/</p>' + '<p>0</p>' + '<p>' +this.slides.length + '</p>';
        },
    }
});

slider_serv_main_block.on('slideChange', function () {
    swiperCounter.innerHTML = '<h3>0</h3>' + (slider_serv_main_block.activeIndex+1)+ '<p>/</p>' + '<p>0</p>' + '<p>' +(slider_serv_main_block.slides.length) + '</p>';
});

$('.service__link').on('mouseover',function(){
    var idx = $('.service__link').index(this);
    slider_serv_main_block.slideTo(idx);
    $(".service__link").removeClass('active');
    $(this).addClass('active');
});

// Wrap every word in a span
$('.ml16').each(function() {
    let text = $(this).text();
    let words = text.split(' ');

    // Clear current element
    this.innerHTML = '';

    // Loop through each word, wrap each letter in a span
    for(let word of words) {
        let word_split = word.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

        console.log('<span class="word">' + word_split + '</span>');

        // Wrap another span around each word, add word to header
        this.innerHTML += '<span class="word">' + word_split + '</span>';
    }
});

anime.timeline({
    loop: false
})
    .add({
        targets: '.ml16 .letter',
        translateY: [100, 0],
        easing: "easeOutExpo",
        duration: 1400,
        delay: function(el, i) {
            return 30 * i;
        }
    }).add({
    // targets: '.ml16',
    // opacity: 1,
    // duration: 1000,
    // easing: "easeOutExpo",
    // delay: 1000
});

