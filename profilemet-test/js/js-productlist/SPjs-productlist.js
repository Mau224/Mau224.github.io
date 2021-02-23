let closeProductSel = document.querySelector('.select-reg');
closeProductSel.addEventListener('click', function () {
  select.classList.remove('is-active');
  closeProductSel.classList.add('text');
});

let slectProductlist = document.querySelector('.select__body-size');

let slectCloser = document.querySelector('.close_reg-modal');

slectCloser.addEventListener('click', function () {
  console.log('1');
  slectProductlist.classList.remove('is-active');
})

let btnRegion = document.querySelector('.select__body-reg');
// let blockReg = document.querySelector('.select__body-reg');
let bodySize = document.querySelector('.select__body-size-main');

btnRegion.addEventListener('click', function (){
  bodySize.classList.remove('is-active');
})
