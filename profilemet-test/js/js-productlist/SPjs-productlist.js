let closeProductSel = document.querySelector('.select__body-region');
closeProductSel.addEventListener('click', function () {
  select.classList.remove('is-active');
  closeProductSel.classList.add('text')
});

let slectProductlist = document.querySelector('.select-reg');

let slectCloser = document.querySelector('.close_reg-modal');

slectCloser.addEventListener('click', function () {
  slectProductlist.classList.remove('is-active');
})
