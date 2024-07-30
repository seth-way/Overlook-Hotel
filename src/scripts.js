import './css/styles.css';
import './images/upTriangle.svg';

import { loadContent } from './domUpdates';
import {
  handleLoginBtnClick,
  handleMenuBtnClick,
  handleCloseBtnClick,
} from './uiComponents/buttons';

/*--- GLOBALS ---*/
var isSignedIn = false;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
/*--- EVENT LISTENERS ---*/
window.onload = start;
userLoginBtns.onclick = handleLoginBtnClick;
menuBtnGroups.forEach(buttonGrp => (buttonGrp.onclick = handleMenuBtnClick));
closeFormBtns.forEach(button => button.onclick = handleCloseBtnClick)

/*--- FUNCTIONS ---*/
function start() {
  loadContent();
}
