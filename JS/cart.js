import { cartArray } from './modules.js';
import { getMenuTimer, setMenuTimer, getIsMenuClosing, setIsMenuClosing, rotateMenu, rotateMenuBack, returned, menuWraper } from './ff_menu.js';

let addedItems = [];

let cartCounter = document.querySelector('.cart__items');
let currentCount = cartArray.length;
document.addEventListener('DOMContentLoaded', () => {
  if (cartArray === undefined) {
    cartArray = addedItems;
  }
  if (currentCount < 2) {
    cartCounter.innerText = currentCount + 'pc';
  } else {
    cartCounter.innerText = currentCount + 'pcs';
  }
  createCartItems();
  console.log(cartArray);
});

let itemsSection = document.querySelector('.items_section');

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

// EMPTY CART NOTICE
if (cartArray.length <= 0) {
  showNotice();
}

function showNotice() {
  let emptyNotice = document.createElement('h2');
  emptyNotice.innerText = 'YOUR CART IS EMPTY';
  emptyNotice.classList.add('empty_notice');
  emptyNotice.style.position = 'absolute';
  emptyNotice.style.top = '50%';
  emptyNotice.style.left = '50%';
  emptyNotice.style.transform = 'translate(-50%, -50%)';
  itemsSection.style.height = '120px';
  itemsSection.appendChild(emptyNotice);
}

// FOR CREATE AND FILL BLOCKS OF ITEMS

function createCartItems() {


  for (let i = 0; i < cartArray.length; i++) {
    let item = cartArray[i];

    // Check if item already added
    if (addedItems.includes(item.item_num)) {
      continue;
    }

    addedItems.push(item.item_num);

    // Create for_items block
    let currentItem = document.createElement('div');
    currentItem.classList.add('for_items');

    // for_items childs
    let imgDiv = document.createElement('div');
    imgDiv.classList.add('for_img');
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('for_info');
    let quantityDiv = document.createElement('div');
    quantityDiv.classList.add('for_quantity');
    let priceDiv = document.createElement('div');
    priceDiv.classList.add('for_price');

    // fill img
    let img = document.createElement('img');
    img.src = item.main_img;
    imgDiv.appendChild(img);

    // Fill name
    infoDiv.innerText = item.name;

    // Calculate and fill correct quantity of items
    let count = cartArray.filter(obj => obj.item_num === item.item_num).length;
    if (count < 2) {
      quantityDiv.innerText = count + 'pc';
    } else {
      quantityDiv.innerText = count + 'pcs';
    }


    // Fill price
    priceDiv.innerText = Math.round((item.price * count) * 100) / 100 + ' $ ';

    // Append childs to current item
    currentItem.appendChild(imgDiv);
    currentItem.appendChild(infoDiv);
    currentItem.appendChild(quantityDiv);
    currentItem.appendChild(priceDiv);

    // Append the created item to the items_section
    itemsSection.appendChild(currentItem);
  }
}

// CODE FOR RIGHT SUMMARY SECTION

// SUMMARY OF PRODUCTS

let productSummaryValue = document.querySelector('.tsn');
let shippingValue = document.querySelector('.scn');
let valueOfVAT = document.querySelector('.tav');
let totalValueOfAll = document.querySelector('.tan');

let totalValue = 0;
let sumOfVat = 0;
let sumOfShipping = 15;

let calculateTotalValue = () => {
  totalValue = 0;
  addedItems.forEach((addedItem) => {
    let count = cartArray.filter((obj) => obj.item_num === addedItem).length;
    let item = cartArray.find((item) => item.item_num === addedItem);
    if (item) {
      let value = parseFloat(item.price) * count;
      totalValue += value;
    }
  });
  return totalValue;
}

let updateSummary = () => {
  totalValue = calculateTotalValue(totalValue);
  calculateVAT(sumOfVat);
  productSummaryValue.innerHTML = totalValue.toFixed(2) + " $";
  valueOfVAT.innerHTML = `(${sumOfVat.toFixed(2)}  $)`;
  totalValueOfAll.innerHTML = (parseFloat(totalValue) + parseFloat(sumOfShipping)).toFixed(2) + ' $';
}


window.addEventListener('DOMContentLoaded', () => {
  updateSummary();
  productSummaryValue.innerHTML = totalValue.toFixed(2) + " $";
  if (cartArray.length == 0) {
    document.querySelector('.data_od').innerText = '';
  } else { document.querySelector('.data_od').innerText = '01.05.2025'; }
  if (cartArray.length == 0) {
    sumOfShipping = 0;
  } else { sumOfShipping = 15; }
  shippingValue.innerText = sumOfShipping + ' $';

  if (cartArray.length > 3) {
    itemsSection.style.cssText = "scrollbar-width:auto";
  }

  sumOfVat = calculateVAT(sumOfVat);
  valueOfVAT.innerHTML = `(${sumOfVat.toFixed(2)}  $)`;

  // TOTAL TOTAL
  totalValueOfAll.innerHTML = (parseFloat(totalValue) + parseFloat(sumOfShipping)).toFixed(2) + ' $';

});

// VAT

let calculateVAT = () => {
  sumOfVat = totalValue.toFixed(2) * 0.2
  return sumOfVat;
}


// Function for clear cart
let clearButton = document.querySelector('.clear_cart');

let remuveAllItems = () => {
  let allItemsArr = document.querySelectorAll('.for_items');
  allItemsArr.forEach(element => {
    element.remove();
  })
    ;
}


clearButton.addEventListener('click', () => {
  totalValue = 0;
  addedItems = [];
  localStorage.removeItem('cartArray');
  remuveAllItems();
  cartCounter.innerText = 0 + 'ps';
  document.querySelector('.data_od').innerText = '';
  totalValue = 0;
  shippingValue.innerText = 0 + " $";
  sumOfShipping = 0;
  updateSummary();
  showNotice();
})

