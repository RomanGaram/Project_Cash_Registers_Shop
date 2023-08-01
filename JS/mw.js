let modalOverlay;

let createModalWindow = (titleText, mainContent, footerContent) => {
  modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  let wrapperForMD = document.createElement('div');
  wrapperForMD.classList.add('md-wrapper');

  let allContextOfMD = document.createElement('div');
  allContextOfMD.classList.add('md-all-context');

  let titleOfMD = document.createElement('div');
  titleOfMD.classList.add('md-title');
  titleOfMD.innerHTML = titleText; // Встановлюємо текст заголовка модального вікна

  let mainOfMD = document.createElement('div');
  mainOfMD.classList.add('md-main');
  mainOfMD.innerHTML = mainContent; // Встановлюємо HTML-контент основної частини модального вікна

  let footerOfMD = document.createElement('div');
  footerOfMD.classList.add('md-footer');
  footerOfMD.innerHTML = footerContent; // Встановлюємо HTML-контент підвалу модального вікна

  modalOverlay.style.position = 'fixed';
  modalOverlay.style.top = 0;
  modalOverlay.style.left = 0;
  modalOverlay.style.width = '100%';
  modalOverlay.style.height = '100%';
  modalOverlay.style.background = 'rgba(0, 0, 0, 0.5)';

  wrapperForMD.style.position = 'fixed';
  wrapperForMD.style.top = '50%';
  wrapperForMD.style.left = '50%';
  wrapperForMD.style.transform = 'translate(-50%, -50%)';
  wrapperForMD.style.height = '300px';
  wrapperForMD.style.padding = '20px';
  wrapperForMD.style.backgroundColor = '#262728';
  wrapperForMD.style.color = '#f8f9f9';
  wrapperForMD.style.borderRadius = '5px';
  wrapperForMD.style.zIndex = 9999;

  allContextOfMD.append(titleOfMD);
  allContextOfMD.append(mainOfMD);
  allContextOfMD.append(footerOfMD);
  wrapperForMD.append(allContextOfMD);
  modalOverlay.append(wrapperForMD);

  document.body.append(modalOverlay);
  if (window.matchMedia("(max-width: 767px)").matches) {
    wrapperForMD.style.position = 'absolut';
    wrapperForMD.style.width = 'max-content';
    wrapperForMD.style.margin = '40px auto';
    wrapperForMD.style.padding = '20px';
    wrapperForMD.style.height = '200px';
    wrapperForMD.style.transform = 'translate(-50%, -50%);';
    wrapperForMD.scrollIntoView({ behavior: "smooth" });
    modalOverlay.style.zIndex = 999;
  }
}


export { createModalWindow };
