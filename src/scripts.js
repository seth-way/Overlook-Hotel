import './css/styles.css';
import './images/upTriangle.svg';

import { filterRooms, updateRoomFilterOptions } from './rooms';
import { loadContent, hideElement, showRooms } from './domUpdates';
import { getComplimentaryBtn } from './uiComponents/buttons';
import { createMenu } from './uiComponents/menu';

// temp sample data...
import { rooms } from '../test/data/sample-rooms';
import { bookings } from '../test/data/sample-bookings';

/*--- GLOBALS ---*/
var isSignedIn = false;
var allRooms = [...rooms];
var allBookings = [...bookings];
var roomFilters = { date: new Date(), roomType: '', bedSize: '' };
var filteredRooms = [...rooms];
//- menu functions -//
var menu = createMenu();
const { openMenu, closeMenu, toggleMenuBtns, hideCloseMenuBtns } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const loginBtn = document.getElementById('open-login-btn');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
const altCloseBtn = document.getElementById('alt-close-btn');
//- forms -//
const loginForm = document.getElementById('login-form');
const checkDatesForm = document.getElementById('check-dates-form');
const bookingsForm = document.getElementById('bookings-form');
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

checkDatesForm.oninput = e => {
  const { id, value } = e.target;
  roomFilters = updateRoomFilterOptions(id, value, roomFilters);
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showRooms(filteredRooms);
};

/*--- FUNCTIONS ---*/
function start() {
  loadContent(allRooms);
  // remove after testing...
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showRooms(filteredRooms);
}
