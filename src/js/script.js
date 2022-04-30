const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const scores = document.querySelectorAll('.skills__rates-item-score'),
      scales  = document.querySelectorAll('.skills__rates-item-scale span');

scores.forEach( (item, i) => {
    scales[i].style.width = item.innerHTML;     
});