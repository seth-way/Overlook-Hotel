import './css/styles.css';
import './images/upTriangle.svg';

import { loadContent, hideElement } from './domUpdates';
import { getComplimentaryBtn } from './uiComponents/buttons';
import { createMenu } from './uiComponents/menu';

// temp sample data...
import { rooms } from '../test/data/sample-rooms';

/*--- GLOBALS ---*/
var isSignedIn = false;
var allRooms = [...rooms];
//- menu functions -//
var menu = createMenu();
const { openMenu, closeMenu, toggleMenuBtns, hideCloseMenuBtns } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const loginBtn = document.getElementById('open-login-btn');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
const altCloseBtn = document.getElementById('alt-close-btn');
/*--- EVENT LISTENERS ---*/
window.onload = start;
//- button clicks -//
loginBtn.onclick = () => {
  openMenu('login');
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

altCloseBtn.onclick = () => closeMenu();

/*--- FUNCTIONS ---*/
function start() {
  loadContent(allRooms);
}
