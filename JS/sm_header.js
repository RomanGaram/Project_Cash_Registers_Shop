let menuButton = document.querySelector('.container__left');
let menuListWraper = document.querySelector('.menu_wraper');
let mainSection = document.getElementById('ms_wraper');
let filtersButton = document.querySelector('.filtrer_title');
let menuClosed = true;
if (window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches) {
  console.log(location.href);
  menuButton.addEventListener('click', () => {
    if (menuClosed) {
      menuListWraper.classList.remove('hidden');
      if (window.location.href.endsWith('index.html')) {
        mainSection.style.paddingTop = '185px';
        filtersButton.style.paddingTop = '130px';
      }
      if (window.location.href.includes('item_page.html?id=')) {
        document.querySelector('#main_wraper').style.paddingTop = '180px';
        document.querySelector('.previous_page').style.top = '175px';
      }
      if (window.location.href.endsWith('cart.html')) {
        document.querySelector('.cart_wraper').style.marginTop = '170px';
      }
    } else {
      menuListWraper.classList.add('hidden');
      if (window.location.href.endsWith('index.html')) {
        mainSection.style.paddingTop = '60px';
        filtersButton.style.paddingTop = '5px';
      }
      if (window.location.href.includes('item_page.html?id=')) {
        document.querySelector('#main_wraper').style.paddingTop = '50px';
        document.querySelector('.previous_page').style.top = '50px';
      }
      if (window.location.href.endsWith('cart.html')) {
        document.querySelector('.cart_wraper').style.marginTop = '45px';
      }
    }

    menuClosed = !menuClosed;
  });

}





