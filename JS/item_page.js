import { cartArray } from './modules.js';
import { getMenuTimer, setMenuTimer, getIsMenuClosing, setIsMenuClosing, rotateMenu, rotateMenuBack, returned, menuWraper } from './ff_menu.js';
import { commodity } from './commodity.js';
import { createModalWindow } from './mw.js';
let currentItem = [];

let price = document.querySelector('.price');


window.addEventListener('DOMContentLoaded', () => {
  let cartCounter = document.querySelector('.cart__items');
  let currentCount = cartArray.length;
  if (currentCount < 2) {
    cartCounter.innerText = currentCount + 'pc';
  } else {
    cartCounter.innerText = currentCount + 'pcs';
  }
  price.innerText = '$' + currentItemPriceValue + '/each';
  console.log(cartArray);
});

// Function to receive right item fm commodity

const encodedId = window.location.hash;
// Find the corresponding article in the 'commodity' array based on the 'id'
const selectedItem = commodity.find(item => item.item_num === encodedId);
if (selectedItem) {
  currentItem = selectedItem;
  console.log(currentItem);
};

let currentItemPriceValue = selectedItem.price;

// Functions for ROTATE AND OPEN - CLOSE MENU SECTION 
let hideMenu = () => {
  setMenuTimer(setTimeout(() => {
    rotateMenuBack();
  }, 3000));
};

menuWraper.addEventListener('mouseenter', () => {
  clearTimeout(getMenuTimer());
});

menuWraper.addEventListener('mouseleave', () => {
  if (!getIsMenuClosing()) {
    hideMenu();
  }
});

document.querySelector('#menu_btn').addEventListener('click', () => {
  if (getIsMenuClosing()) {
    return;
  }

  returned == false ? rotateMenu() : rotateMenuBack();
});


// Go back to previous page
let previousPageButton = document.querySelector('.previous_page');
if (previousPageButton) {
  previousPageButton.addEventListener('click', () => {
    history.go(-1);
  });
}


// FUNCTUIONS FOR LEFT SECTION 

// Access to HTML structure
let itemNameHeader = document.querySelector('.item_header_h1');
let bigImageWpaper = document.querySelector('.for_big');
let bigImg = document.createElement('img');
let forSmallImages = document.querySelector('.for_small');


bigImageWpaper.append(bigImg);

for (let i = 0; i < currentItem.imgLibrary.length; i++) {
  let smallImage = document.createElement('img');
  smallImage.src = currentItem.imgLibrary[i];
  let eachImgWraper = document.createElement('div');
  eachImgWraper.classList.add('small_imgs');
  eachImgWraper.append(smallImage);
  forSmallImages.append(eachImgWraper);
}
// Add class current_img to first picture
let imgGallery = document.querySelectorAll('.small_imgs');
imgGallery[0].lastChild.classList.add('current_img');

itemNameHeader.innerText = currentItem.name + `, ${currentItem.color}`;
bigImg.src = currentItem.main_img;

forSmallImages.addEventListener('mouseover', (event) => {
  let currentImg = event.target;
  for (let g = 0; g < imgGallery.length; g++) {
    if (imgGallery[g].lastChild.classList.contains('current_img')) {
      imgGallery[g].lastChild.classList.remove('current_img');
    }
  }
  if (currentImg.tagName === 'IMG') { // Check if the event target is an image
    bigImg.src = currentImg.src;
    document.body.style.scrollBehavior = 'smooth';
    currentImg.classList.add('current_img');
    stopAutoChange();
    lastHoveredIndex = Array.from(imgGallery).indexOf(currentImg.parentElement);
  }
});

forSmallImages.addEventListener('mouseout', (event) => {
  let currentImg = event.target;
  if (currentImg.tagName === 'IMG') { // Check if the event target is an image
    currentImg.classList.remove('current_img');
    resumeAutoChange();
  }
});


// For AUTO SCROLL IMAGE GALLERY

let autoChangeImgs;
let currentIndex = 0;
let lastHoveredIndex = 0;

// First time call
startAutoChange();

function startAutoChange() {
  autoChangeImgs = setTimeout(nextImage, 3500);
}

function stopAutoChange() {
  clearTimeout(autoChangeImgs);
  autoChangeImgs = null;
}

function resumeAutoChange() {
  currentIndex = lastHoveredIndex;
  imgGallery[currentIndex].lastChild.classList.add('current_img');
  autoChangeImgs = setTimeout(nextImage, 3500);
}


function nextImage() {
  imgGallery[currentIndex].lastChild.classList.remove('current_img');

  currentIndex = (currentIndex + 1) % imgGallery.length;

  imgGallery[currentIndex].lastChild.classList.add('current_img');
  bigImg.src = imgGallery[currentIndex].lastChild.src;

  if (autoChangeImgs) {
    autoChangeImgs = setTimeout(nextImage, 3500);
  }
}


// FOR DESCRIPTION SECTION
let descritionContent = document.querySelector('.description')
let description = currentItem.full_description;
let hat = document.createElement('span');
hat.classList.add('desc_hat');
hat.innerHTML = currentItem.top_description;
let parts = description.split('•');
console.log(parts);
let descList = document.createElement('ul');
descritionContent.append(hat);
descritionContent.append(descList);
descritionContent.classList.add('visible');

for (let d = 0; d < parts.length; d++) {
  let descListItem = document.createElement('li');
  descListItem.innerText = parts[d];
  descList.append(descListItem);
}


// FOR SPECIFICATION SECTION
const tableContainer = document.querySelector('.specs');
function createAndFillTable() {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // Create and fill rows for table
  const rowData = [
    { label: 'Item Number', value: currentItem.item_num },
    { label: 'Manufacturer Number', value: currentItem.manufacturer_number },
    { label: 'Print Technology', value: currentItem.print_technology },
    { label: 'Brand Name', value: currentItem.barand_name },
    { label: 'Manufacturer', value: currentItem.manufacturer },
    { label: 'Color', value: currentItem.color },
    { label: 'Cord Length', value: currentItem.cord_length },
    { label: 'Depth', value: currentItem.depth },
    { label: 'Height', value: currentItem.height },
    { label: 'Width', value: currentItem.width }
  ];

  rowData.forEach(data => {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.className = 'rowheader ' + data.label.toLowerCase().replace(/\s/g, '_');
    labelCell.textContent = data.label;
    const valueCell = document.createElement('td');
    valueCell.textContent = data.value;
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
  });

  tableContainer.appendChild(table);
}

createAndFillTable();

// REVIEWS SECTION

let reviewsContent = document.querySelector('.reviews');


// NAVIGATE BETWEEN INFO CONTENT
let infoBlock = document.querySelector('.info_header');
let descButton = document.querySelector('.desc');
let specButton = document.querySelector('.spec');
let reviewButton = document.querySelector('.review');
let descriptionContent = document.querySelector('.description');
let specificationsContent = document.querySelector('.specs');

infoBlock.addEventListener('click', (event) => {
  let buttons = [descButton, specButton, reviewButton];
  let contents = [descriptionContent, specificationsContent, reviewsContent];

  buttons.forEach(button => button.classList.remove('active'));
  contents.forEach(content => content.classList.remove('visible'));

  if (event.target.classList.contains('desc')) {
    descButton.classList.add('active');
    descriptionContent.classList.add('visible');
  } else if (event.target.classList.contains('spec')) {
    specButton.classList.add('active');
    specificationsContent.classList.add('visible');
  } else if (event.target.classList.contains('review')) {
    reviewButton.classList.add('active');
    reviewsContent.classList.add('visible');
  }
});

// CODE FOR RIGHT SECTION 

const numericInput = document.getElementById('numericInput');
const increaseBtn = document.querySelector('.plus_button');
const decreaseBtn = document.querySelector('.minus_button');

numericInput.addEventListener('keydown', function (e) {
  e.preventDefault();
});

increaseBtn.addEventListener('click', function () {
  let currentValue = parseInt(numericInput.value);
  if (!isNaN(currentValue)) {
    numericInput.value = String(Math.max(currentValue + 1, 0)); // Використовуємо Math.max для обмеження до мінімуму 0
  } else {
    numericInput.value = '0';
  }
});

decreaseBtn.addEventListener('click', function () {
  let currentValue = parseInt(numericInput.value);
  if (!isNaN(currentValue)) {
    numericInput.value = String(Math.max(currentValue - 1, 0)); // Використовуємо Math.max для обмеження до мінімуму 0
  } else {
    numericInput.value = '0';
  }
});


// FUNCTUIONS FOR RIGHT SECTION

let addToCartButton = document.querySelector('.buy_now');

addToCartButton.addEventListener('click', () => {
  let cartCounter = document.querySelector('.cart__items');
  let cerrentValue = parseInt(cartCounter.innerText);
  cartArray.push(selectedItem);
  localStorage.setItem('cartArray', JSON.stringify(cartArray));
  let newValue = cerrentValue + 1;
  if (newValue < 2) {
    cartCounter.innerText = newValue + 'pc';
  } else {
    cartCounter.innerText = newValue + 'pcs';
  }
  let titleText,
    mainContent,
    footerContent;

  let title = document.createElement('h2');
  title.innerText = "CONFIRMATION";
  titleText = title.innerHTML;
  let MSG = document.createElement('h4');
  MSG.innerText = `${selectedItem.name}` + `\n` + "Successfully added to your cart";
  mainContent = MSG.innerHTML;
  let footer = document.createElement('div');
  let backShoppingBtn = document.createElement('button');
  backShoppingBtn.classList.add('back_shopping');
  backShoppingBtn.innerText = 'Back to Shopping';
  let proceedToCartBtn = document.createElement('button');
  proceedToCartBtn.classList.add('proceed_cart');
  proceedToCartBtn.innerText = 'Proceed to Cart';
  footer.append(backShoppingBtn);
  footer.append(proceedToCartBtn);
  footerContent = footer.innerHTML;
  createModalWindow(titleText, mainContent, footerContent);
  let proceedBtn = document.querySelector('.proceed_cart');
  proceedBtn.addEventListener('click', (currentCount) => {
    window.location.href = './cart.html';
    localStorage.setItem('cartArray', JSON.stringify(cartArray))
    if (currentCount < 2) {
      cartCounter.innerText = currentCount + 'pc';
    } else {
      cartCounter.innerText = currentCount + 'pcs';
    }
  });

  let backBtn = document.querySelector('.back_shopping');
  backBtn.addEventListener('click', () => {
    if (document.querySelector('.modal-overlay')) {
      document.querySelector('.modal-overlay').remove();
    }
  });
})