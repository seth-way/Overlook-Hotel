import { imageURLs } from './data';
import { createCloseBtn } from './uiComponents/buttons';
/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
//- buttons -//
const openMenuBtns = document.querySelectorAll('.open-menu-btn');
/*--- FUNCTIONS ---*/
export function loadContent() {
  updateMenuButtons();
  updateHeaderBackgroundImg();
}

function updateMenuButtons() {
  openMenuBtns.forEach(button => {
    createCloseBtn(button);
  });
}

function updateHeaderBackgroundImg(idx = 0) {
  idx = idx % imageURLs.length;
  const imgUrl = `url('${imageURLs[idx]}')`;
  headerImg.style.backgroundImage = imgUrl


  setTimeout(() => {
    updateHeaderBackgroundImg(idx + 1);
  }, 10000);
}

//- hide / unhide element -//
export function hideElement(element, ...hiddenClasses) {
  element.classList.add(...hiddenClasses);
  element.setAttribute('aria-hidden', 'true');
  element.disabled = 'true';
}

function unhideElement(element) {
  element.classList.remove('clear', 'minimized', 'hidden');
  element.setAttribute('aria-hidden', 'false');
  element.removeAttribute('disabled');
}
