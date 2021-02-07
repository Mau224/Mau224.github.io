
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
