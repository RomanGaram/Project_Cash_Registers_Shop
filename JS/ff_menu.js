// Function for menu bars rotation & open menu list
let menuWraper = document.querySelector('.menu_wraper');
let returned = false;
let menuTimer;
let isMenuClosing = false;

let getMenuTimer = () => {
  return menuTimer;
};

let setMenuTimer = (timer) => {
  menuTimer = timer;
};

let getIsMenuClosing = () => {
  return isMenuClosing;
};

let setIsMenuClosing = (value) => {
  isMenuClosing = value;
};

let rotateMenu = () => {
  document.querySelector('#menu_btn').style.transform = "rotate(90deg)";
  document.querySelector('#menu_btn').style.transition = 'transform';
  document.querySelector('#menu_btn').style.transitionDuration = '0.8s';
  setIsMenuClosing(false);
  clearTimeout(getMenuTimer());
  menuWraper.classList.remove('hidden');
  menuWraper.classList.add('slide-in');
  menuWraper.classList.remove('scale_out');
  menuTimer = setTimeout(rotateMenuBack, 3000);
  returned = true;
};

let rotateMenuBack = () => {
  if (isMenuClosing) {
    return;
  }
  document.querySelector('#menu_btn').style.transform = "rotate(0deg)";
  document.querySelector('#menu_btn').style.transition = 'transform';
  document.querySelector('#menu_btn').style.transitionDuration = '0.8s';
  menuWraper.classList.add('scale_out');
  menuWraper.classList.remove('slide-in');
  menuWraper.classList.add('scale_out');
  returned = false;
  setIsMenuClosing(true);
  setTimeout(() => {
    setIsMenuClosing(false);
  }, 800);
};

export { getMenuTimer, setMenuTimer, getIsMenuClosing, setIsMenuClosing, rotateMenu, rotateMenuBack, returned, menuWraper };
