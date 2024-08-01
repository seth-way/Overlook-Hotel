import './css/styles.css';
import './images/upTriangle.svg';

import { filterRooms, updateRoomFilterOptions } from './rooms';
import { loadContent, hideElement, showMenuContent } from './domUpdates';
import { getComplimentaryBtn } from './uiComponents/buttons';
import { createMenu } from './uiComponents/menu';
import { getResource } from './apiCalls';

/*--- GLOBALS ---*/
var user = {};
var allRooms = [];
var allBookings = [];
var filteredRooms = [];
var roomFilters = { date: getCurrentDate(), roomType: '', bedSize: '' };

//- menu functions -//
var menu = createMenu();
const { openMenu, closeMenu, toggleMenuBtns, adjustMenuMaxHeight } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const loginBtn = document.getElementById('open-login-btn');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
const altCloseBtn = document.getElementById('alt-close-btn');
//- forms -//
const loginForm = document.getElementById('login-form');
const checkDatesForm = document.getElementById('check-dates-form');
const vacancyDateInput = document.getElementById('vacancy-date');
const bookingsForm = document.getElementById('bookings-form');
//- containers -//
const menuContent = document.getElementById('menu-content');
/*--- EVENT LISTENERS ---*/
window.onload = start;
window.onresize = adjustMenuMaxHeight;
//- button clicks -//
loginBtn.onclick = () => {
  menuContent.innerHTML = '';
  openMenu('login');
};

menuBtnGroups.forEach(
  buttonGrp =>
    (buttonGrp.onclick = e => {
      const clickedBtn = e.target.closest('button');
      const otherBtn = getComplimentaryBtn(clickedBtn);
      const { id } = clickedBtn;
      if (id.includes('open')) {
        const menuType = id.includes('dates') ? 'dates' : 'bookings';
        const data = menuType === 'dates' ? allRooms : allBookings;
        const { isAdmin } = user;
        showMenuContent(menuType, data, isAdmin);
      }
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
  showMenuContent('dates', filteredRooms, user.isAdmin);
};

checkDatesForm.onreset = e => {
  e.preventDefault();
  roomFilters = { date: getCurrentDate(), roomType: '', bedSize: '' };
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showMenuContent('dates', filteredRooms, user.isAdmin);
  const dateInput = checkDatesForm.querySelector('input');
  dateInput.value = roomFilters.date;
  const selectors = checkDatesForm.querySelectorAll('select');
  selectors.forEach(selector => {
    selector.value = '';
  });
};

loginForm.oninput = e => {
  const { value } = e.target;
  const isValid = !value || value.length > 7;
  const color = isValid ? 'var(--default)' : 'var(--invalid)';
  e.target.parentElement.style.setProperty('--isValid-color', color);
  const inputs = loginForm.querySelectorAll('input');
  const allInputsValidated = [...inputs].every(input => input.value.length > 7);
  if (allInputsValidated)
    loginForm.querySelector('button').removeAttribute('disabled');
  else loginForm.querySelector('button').setAttribute('disabled', 'true');
};

loginForm.onsubmit = e => {
  e.preventDefault();
  const inputs = loginForm.querySelectorAll('input');
  const username = inputs[0].value;
  const password = inputs[1].value;
  if (username === 'customer50' && password === 'overlook2021') {
    getResource('customers', 50)
      .then(customer => {
        user = customer;
      })
      .catch(err => console.alert(err));
  }
  if (username === 'manager' && password === 'overlook2021') {
    user.id = 999;
    user.name = 'Management';
    user.isAdmin = true;
  }
};

/*--- FUNCTIONS ---*/
function start() {
  // auto login customer 50.... remove after development.
  getResource('customers', 50)
    .then(customer => {
      user = customer;
    })
    .catch(err => console.alert(err));
  // end of section to remove after development.
  adjustMenuMaxHeight();
  Promise.all([getResource('rooms'), getResource('bookings')])
    .then(data => {
      updateGlobalVariables(...data);
    })
    .catch(err => console.log(err));
}

function updateGlobalVariables({ rooms }, { bookings }) {
  allRooms = [...rooms];
  allBookings = [...bookings];
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  loadContent(allRooms);
}

export function getCurrentDate() {
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );

  return currentDate.toJSON().slice(0, 10);
}
