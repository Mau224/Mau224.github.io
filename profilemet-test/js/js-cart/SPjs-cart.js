//оставил в самом конце тк,выдается ошибка на других страницах не придумал как сделать
//модальное услуг на странице cart.html ("появляется по клику на 'Добавить услугу'")
function modalCart() {
  let closerService = document.querySelector('.cart__service-modal-close');
  let openerService = document.querySelector('.cart__open-service');
  let cartServiceModal = document.querySelector('.cart__service-modal');
  let deliveryBlock = document.querySelector('.cart__delivery');
  let openDelivery = document.querySelector('.open-de');
  let openComment = document.querySelector('.hover-comment');
  let blockComment = document.querySelector('.cart__comment');

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

  openDelivery.addEventListener('click',function (){
    deliveryBlock.classList.toggle('active');
    openDelivery.classList.toggle('active');

    if (openDelivery.classList.contains('active')) {
      openDelivery.textContent = '- УДАЛИТЬ ДОСТАВКУ';
      openDelivery.classList.add('change-color');
    } else {
      openDelivery.textContent = '+ ДОБАВИТЬ ДОСТАВКУ';
      openDelivery.classList.remove('change-color');
    }
  })

  openComment.addEventListener('click',function (){
    blockComment.classList.toggle('active');
    openComment.classList.toggle('active');

    if (openComment.classList.contains('active')) {
      openComment.textContent = 'ИЗМЕНИТЬ КОММЕНТАРИЙ';
      openComment.classList.add('change-color');
    } else {
      openComment.textContent = '+ КОММЕНТАРИЙ';
      openComment.classList.remove('change-color');
    }
  })
}
modalCart();

window.addEventListener('resize', () => {
  modalCart();
});

