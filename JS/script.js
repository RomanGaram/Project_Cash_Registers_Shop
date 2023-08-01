import { commodity } from './commodity.js';
import { createModalWindow } from './mw.js';
import { cartArray } from './modules.js';
import { getMenuTimer, setMenuTimer, getIsMenuClosing, setIsMenuClosing, rotateMenu, rotateMenuBack, returned, menuWraper } from './ff_menu.js';

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


// Function for Filters:

let filtersButton = document.querySelector('.filtrer_title');
let innerFiltersButton = document.querySelector('.inner');

innerFiltersButton.addEventListener('click', () => {
    innerFiltersButton.classList.add('hidden');
    filtersButton.classList.remove('hidden');
    document.querySelector('.filter_wraper').classList.add('hidden');
});

filtersButton.addEventListener('click', () => { showFilters() });

// MediaQueryList FOR Phone screen
if (window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches) {
    filtersButton.addEventListener('click', () => {
        showFilters();
        document.querySelector('.all_content').style.display = 'none';
    });
}
if (window.matchMedia("(max-width: 767px)").matches) {
    innerFiltersButton.addEventListener('click', () => {
        innerFiltersButton.classList.add('hidden');
        filtersButton.classList.remove('hidden');
        document.querySelector('.filter_wraper').classList.add('hidden');
        document.querySelector('.all_content').style.display = 'flex';
    });
}
// MediaQueryList FOR Phone screen END

function showFilters() {
    filtersButton.classList.add('hidden');
    document.querySelector('.filter_wraper').classList.remove('hidden');
    innerFiltersButton.classList.remove('hidden');
}
function hideFilters() {
    filtersButton.classList.remove('hidden');
    document.querySelector('.filter_wraper').classList.add('hidden');
}


// Functions for new card
let fieldForContent = document.querySelector('.all_content');

function createNewCard() {
    // Create card html structure
    let cardWraper = document.createElement('div');
    cardWraper.classList.add('card');
    let cardImgBlock = document.createElement('div');
    cardImgBlock.classList.add('card_img_block')
    let imgLink = document.createElement('a');
    imgLink.href = '';
    imgLink.classList.add('img_hyperlink');
    imgLink.setAttribute('target', '_blank');
    let cardImg = document.createElement('img');
    cardImg.classList.add('card_img');
    let cardBody = document.createElement('div');
    cardBody.classList.add('card_body');
    let cardTitle = document.createElement('h2');
    cardTitle.classList.add('card_title');
    let cardText = document.createElement('p');
    cardText.classList.add('card_text');
    let itemId = document.createElement('span');
    itemId.classList.add('item_id');
    itemId.classList.add('hidden');
    let priceNotice = document.createElement('div');
    priceNotice.classList.add('price_notice');
    let blockForButtons = document.createElement('div');
    blockForButtons.classList.add('block_for_buttons');
    let moreInfoBtn = document.createElement('input');
    moreInfoBtn.classList.add('more_info');
    moreInfoBtn.type = 'button';
    moreInfoBtn.value = 'More Info';
    let buyNowBtn = document.createElement('input');
    buyNowBtn.type = 'button';
    buyNowBtn.value = 'Add to Cart';
    buyNowBtn.classList.add('buy_now');

    cardImgBlock.append(imgLink)
    imgLink.append(cardImg);
    cardWraper.append(cardImgBlock);
    cardBody.append(cardTitle);
    cardBody.append(itemId);
    cardBody.append(cardText);
    cardBody.append(priceNotice);
    blockForButtons.append(moreInfoBtn);
    blockForButtons.append(buyNowBtn);
    cardBody.append(blockForButtons);
    cardWraper.append(cardBody);
    fieldForContent.appendChild(cardWraper);
}

window.addEventListener('DOMContentLoaded', () => {
    for (let index = 0; index < commodity.length; index++) {
        createNewCard();
        let currentCard = document.querySelectorAll('.card')[index];
        let article = commodity[index];
        fillContentForCard(currentCard, article);
    }
});
window.addEventListener('DOMContentLoaded', () => {
    let cartCounter = document.querySelector('.cart__items');
    let currentCount = cartArray.length;
    if (currentCount < 2) {
        cartCounter.innerText = currentCount + 'pc';
    } else {
        cartCounter.innerText = currentCount + 'pcs';
    }
});

function fillContentForCard(card, article) {
    let cardImg = card.querySelector('.card_img');
    let cardTitle = card.querySelector('.card_title');
    let cardText = card.querySelector('.card_text');
    let itemId = card.querySelector('.item_id');
    let priceNotice = card.querySelector('.price_notice');

    cardImg.src = article.main_img;
    cardTitle.innerText = article.name;
    cardText.innerText = article.top_description;
    itemId.innerText = article.item_num;
    priceNotice.innerText = article.price + ' $';
}


// Add function for all ADD TO CART buttons
fieldForContent.addEventListener('click', function (event) {
    if (event.target.classList.contains('buy_now')) {
        addToCart(event);
    }
});

function addToCart(event) {

    let cartCounter = document.querySelector('.cart__items');
    let currentCount = parseInt(cartCounter.innerText);
    let button = event.target;
    let card = button.parentNode.parentNode; // Get parent element
    let itemID = card.querySelector('.item_id').innerText; // Get item_id from current card
    let selectedItem = commodity.find(item => item.item_num === itemID);

    cartArray.push(selectedItem);
    localStorage.setItem('cartArray', JSON.stringify(cartArray));

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

    if (selectedItem) {
        currentCount += 1;
        cartCounter.innerHTML = currentCount;
        createModalWindow(titleText, mainContent, footerContent);
        if (currentCount < 2) {
            cartCounter.innerText = currentCount + 'pc';
        } else {
            cartCounter.innerText = currentCount + 'pcs';
        }

    }

    let proceedBtn = document.querySelector('.proceed_cart');
    proceedBtn.addEventListener('click', (currentCount) => {
        window.location.href = 'cart.html';
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
}

// Add function for all MORE INFO buttons
fieldForContent.addEventListener('click', function (event) {
    if (event.target.classList.contains('more_info')) {
        let button = event.target;
        let card = button.parentNode.parentNode; // Get parent element
        let itemID = card.querySelector('.item_id').innerHTML; // Get item_id from current card
        let selectedItem = commodity.find(item => item.item_num === itemID);
        let url = `item_page.html?id=${itemID}`;
        if (selectedItem) {
            window.location.href = url;
        }
    }
});

// FILTERS SECTION

// Function to show filter blocks
function showBlock(event) {
    let block = this.parentNode.parentNode.querySelector('.fhas');

    if (block) {
        block.classList.remove('hidden');
        this.classList.add('hidden');
        this.parentNode.parentNode.querySelector('.hide_f').classList.remove('hidden');
    }
}

// Function to hide filter blocks
function hideBlock(event) {
    let block = this.parentNode.parentNode.querySelector('.fhas');

    // Перевіряємо, чи знайдений блок
    if (block) {
        block.classList.add('hidden');
        this.classList.add('hidden');
        this.parentNode.parentNode.querySelector('.unhiden_f').classList.remove('hidden');
    }
}

// Buttons
let openButtons = document.querySelectorAll('.unhiden_f');
// Add click for all buttons
openButtons.forEach(function (button) {
    button.addEventListener('click', showBlock);
});


let closeButtons = document.querySelectorAll('.hide_f');
// Add click for all buttons
closeButtons.forEach(function (button) {
    button.addEventListener('click', hideBlock);
});
// Functions for Filters END



