import { imageURLs } from './data';
import { createCloseBtn } from './uiComponents/buttons';
/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
const menuDrawer = document.getElementById('menu-drawer');
const allMenus = document.querySelectorAll('.menu');
//- buttons -//
const openMenuBtns = document.querySelectorAll('.open-menu-btn');
const userLoginBtns = document.getElementById('user-login-grp');
let closeMenuBtns;
/*--- FUNCTIONS ---*/
export function loadContent() {
  updateMenuButtons();
  updateHeaderBackgroundImg();
}

function updateMenuButtons() {
  openMenuBtns.forEach(button => {
    createCloseBtn(button);
  });

  closeMenuBtns = document.querySelectorAll('.close-menu-btn');
}

function updateHeaderBackgroundImg(idx = 0) {
  idx = idx % imageURLs.length;
  const imgUrl = `url('${imageURLs[idx]}')`;
  headerImg.style.backgroundImage = imgUrl;

  setTimeout(() => {
    updateHeaderBackgroundImg(idx + 1);
  }, 10000);
}

export function toggleLoginBtns() {
  const { children } = userLoginBtns;
  const [loginBtn, logoutBtn] = children;
  if (loginBtn.classList.contains('hidden')) {
    hideElement(logoutBtn, 'hidden');
    unhideElement(loginBtn);
  } else {
    hideElement(loginBtn, 'hidden');
    unhideElement(logoutBtn);
  }
}

export function toggleMenuBtns(clickedBtn, otherBtn) {
  const { id } = clickedBtn;
  if (id.includes('open')) {
    const menuType = getMenuType(clickedBtn);
    openMenu(menuType);
    openMenuBtns.forEach(btn => {
      if (btn.id !== id) hideElement(btn, 'clear');
    });
  } else {
    closeMenu(clickedBtn);
  }

  clickedBtn.disabled = 'true';
  unhideElement(otherBtn);

  setTimeout(() => {
    hideElement(clickedBtn, 'clear');
    otherBtn.querySelector('img') &&
      otherBtn.querySelector('img').classList.remove('clear');
  }, 500);
}

export function hideCloseMenuBtns() {
  closeMenuBtns.forEach(button => {
    hideElement(button, 'hidden');
    button.querySelector('img').classList.add('clear');
  });
}

function getMenuType(button) {
  const { id } = button;
  return id.split('-')[1];
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
//- toggle menu drawer -//
export function openMenu(menuType) {
  displayMenu(menuType);
  unhideElement(menuDrawer);
}

export function closeMenu(closeBtn) {
  openMenuBtns.forEach(button => unhideElement(button));
  hideElement(menuDrawer, 'minimized');

  if (closeBtn) {
    setTimeout(() => {
      hideElement(closeBtn, 'hidden');
      closeBtn.querySelector('img').classList.add('clear');
    }, 500);
  }
}
//- display menu views -//
export function displayMenu(menuType) {
  allMenus.forEach(menu => {
    if (menu.id.includes(menuType)) {
      unhideElement(menu);
    } else {
      hideElement(menu, 'hidden');
    }
  });
}
