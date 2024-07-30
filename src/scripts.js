import './css/styles.css';
import './images/upTriangle.svg';

import { loadContent, hideElement } from './domUpdates';
import { getComplimentaryBtn } from './uiComponents/buttons';
import { createMenu } from './uiComponents/menu';

/*--- GLOBALS ---*/
var isSignedIn = false;
//- menu functions -//
var menu = createMenu();
const { openMenu, closeMenu, toggleMenuBtns, hideCloseMenuBtns } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
/*--- EVENT LISTENERS ---*/
window.onload = start;

userLoginBtns.onclick = e => {
  const clickedBtn = e.target.closest('button');
  const { id } = clickedBtn;
  hideCloseMenuBtns();
  if (id.includes('sign-in')) {
    openMenu('login');
  } else {
    openMenu('logout');
  }
};

menuBtnGroups.forEach(
  buttonGrp =>
    (buttonGrp.onclick = e => {
      const clickedBtn = e.target.closest('button');
      const otherBtn = getComplimentaryBtn(clickedBtn);
      toggleMenuBtns(clickedBtn, otherBtn);
    })
);

closeFormBtns.forEach(
  button =>
    (button.onclick = e => {
      const menu = e.target.closest('.menu');
      hideElement(menu);
      closeMenu();
    })
);

/*--- FUNCTIONS ---*/
function start() {
  loadContent();
}
