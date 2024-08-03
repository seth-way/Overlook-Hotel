import './css/styles.css';
import './images/upTriangle.svg';

import { filterRooms, updateRoomFilterOptions } from './rooms';
import { updateUserBookings } from './bookings';
import {
  loadContent,
  hideElement,
  unhideElement,
  openMenu,
  closeMenu,
  showMenuContent,
  toggleLoginBtns,
} from './domUpdates';
import { getComplimentaryBtn } from './uiComponents/buttons';
import { createMenu } from './uiComponents/menu';
import { getResource } from './apiCalls';
import { getCurrentDate } from './utility';
/*--- GLOBALS ---*/
var user = {};
var allRooms = [];
var filteredRooms = [];
var allBookings = [];
var userBookings = { selection: 'all' };

var roomFilters = { date: getCurrentDate(), roomType: '', bedSize: '' };

//- menu functions -//
var menu = createMenu();
const { toggleMenuBtns, adjustMenuMaxHeight, hideCloseMenuBtns } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const loginBtn = document.getElementById('open-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const openLogoutBtn = document.getElementById('open-logout-btn');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
const altCloseBtn = document.getElementById('alt-close-btn');
const openBookingsBtn = document.getElementById('open-bookings-btn');
//- forms -//
const loginForm = document.getElementById('login-form');
const checkDatesForm = document.getElementById('check-dates-form');
const bookingsForm = document.getElementById('bookings-form');
//- containers -//
const menuDrawer = document.getElementById('menu-drawer');
const menuContent = document.getElementById('menu-content');
//- login dependent elements -//
const loggedRequiredEls = document.querySelectorAll('.login-required');
/*--- EVENT LISTENERS ---*/
window.onload = start;
window.onresize = adjustMenuMaxHeight;
//- button clicks -//
loginBtn.onclick = () => {
  menuContent.innerHTML = '';
  hideCloseMenuBtns();
  openMenu('login');
};

logoutBtn.onclick = logoutUser;

menuBtnGroups.forEach(
  buttonGrp =>
    (buttonGrp.onclick = e => {
      const { isAdmin } = user;
      const clickedBtn = e.target.closest('button');
      if (clickedBtn) {
        const otherBtn = getComplimentaryBtn(clickedBtn);
        const { id } = clickedBtn;
        if (id.includes('open')) {
          const [menuType, data] = getMenuTypeAndData(id);
          openMenu(menuType, data, isAdmin);
        } else closeMenu(clickedBtn);
        toggleMenuBtns(clickedBtn, otherBtn);
      }
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

altCloseBtn.onclick = () => hideElement(menuDrawer, 'minimized');
//- check dates form event listeners-//
checkDatesForm.oninput = e => {
  const { id, value } = e.target;
  roomFilters = updateRoomFilterOptions(id, value, roomFilters);
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showMenuContent('dates', filteredRooms, user.isAdmin);
};

checkDatesForm.onreset = e => {
  e.preventDefault();
  //- reset data -//
  roomFilters = { date: getCurrentDate(), roomType: '', bedSize: '' };
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showMenuContent('dates', filteredRooms, user.isAdmin);
  //- clear inputs -//
  const dateInput = checkDatesForm.querySelector('input');
  dateInput.value = roomFilters.date;
  const selectors = checkDatesForm.querySelectorAll('select');
  selectors.forEach(selector => {
    selector.value = '';
  });
};
//- login form event listeners -//
loginForm.oninput = e => {
  const { value } = e.target;
  const isValid = !value || value.length > 7;
  const color = isValid ? 'var(--default)' : 'var(--invalid)';
  e.target.parentElement.style.setProperty('--isValid-color', color);
  const inputs = loginForm.querySelectorAll('input');
  const allInputsValidated = [...inputs].every(input => input.value.length > 7);
  if (allInputsValidated) {
    loginForm.querySelector('button').removeAttribute('disabled');
  } else loginForm.querySelector('button').setAttribute('disabled', 'true');
};

loginForm.onsubmit = e => {
  e.preventDefault();
  const inputs = loginForm.querySelectorAll('input');
  validateLoginInfo(inputs[0].value, inputs[1].value);
};
//- bookings form event listeners -//
bookingsForm.oninput = e => {
  userBookings.selection = e.target.value;
  console.log('user bookings', userBookings);
  openMenu('bookings', userBookings);
};
/*--- FUNCTIONS ---*/
function start() {
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

function loginUser() {
  const { id, name, isAdmin } = user;
  loggedRequiredEls.forEach(element => {
    element.classList.remove('login-required');
  });
  resetLoginForm();
  openLogoutBtn.querySelector('p').innerText = name;
  openLogoutBtn.querySelector('h5').innerText = name;
  toggleLoginBtns();

  const updates = updateUserBookings(id, allBookings, allRooms, isAdmin);
  userBookings = { ...userBookings, ...updates };
  hideElement(menuDrawer, 'minimized');
  setTimeout(() => {
    const closeBookingsBtn = getComplimentaryBtn(openBookingsBtn);
    openMenu('bookings', userBookings, isAdmin);
    toggleMenuBtns(openBookingsBtn, closeBookingsBtn);
  }, 500);
}

function logoutUser() {
  loggedRequiredEls.forEach(element => {
    element.classList.add('login-required');
  });

  user = {};
  userBookings = { selection: 'all' };

  openLogoutBtn.querySelector('p').innerText = '';
  openLogoutBtn.querySelector('h5').innerText = '';

  toggleLoginBtns();
  hideElement(menuDrawer, 'minimized');
  hideCloseMenuBtns();
}
//- validate input functions -//
function getMenuTypeAndData(buttonID) {
  const { isAdmin } = user;
  const menuType = buttonID.includes('dates') ? 'dates' : 'bookings';
  const data =
    menuType === 'dates' ? allRooms : isAdmin ? allBookings : userBookings;
  return [menuType, data];
}

function validateLoginInfo(username, password) {
  if (username === 'manager' && password === 'overlook2021') {
    user.id = 999;
    user.name = 'Management';
    user.isAdmin = true;
    loginUser();
  } else if (username === 'customer50' && password === 'overlook2021') {
    getResource('customers', 50)
      .then(customer => {
        user = customer;
        loginUser();
      })
      .catch(err => console.error(err));
  } else {
    alert('incorrect username or password. try again.');
  }
}

function resetLoginForm() {
  loginForm.querySelectorAll('input').forEach(input => {
    input.value = '';
  });
}
