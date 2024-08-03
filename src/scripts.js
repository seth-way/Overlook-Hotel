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
import { getResource, postResource } from './apiCalls';
import { getCurrentDate } from './utility';
/*--- GLOBALS ---*/
var user = { id: 1 };
var allRooms = [];
var filteredRooms = [];
var allBookings = [];
var userBookings = { selection: 'all', past: [], upcoming: [], totals: {} };

var filterDefaults = {
  date: getCurrentDate().replaceAll('-', '/'),
  roomType: '',
  bedSize: '',
};

var roomFilters = {
  ...filterDefaults,
};
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
//- form inputs -//
const dateInput = document.getElementById('vacancy-date');
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
      const clickedBtn = e.target.closest('button');
      if (clickedBtn) {
        const otherBtn = getComplimentaryBtn(clickedBtn);
        const { id } = clickedBtn;
        if (id.includes('open')) {
          const [menuType, data] = getMenuTypeAndData(id);
          openMenu(menuType, data, user);
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
  showMenuContent('dates', filteredRooms, user);
};

checkDatesForm.onreset = e => {
  e.preventDefault();
  //- reset data -//
  roomFilters = {
    ...filterDefaults,
  };
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  showMenuContent('dates', filteredRooms, user);
  //- clear inputs -//
  const dateInput = checkDatesForm.querySelector('input');
  dateInput.value = roomFilters.date.replaceAll('/', '-');
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
  openMenu('bookings', userBookings, user);
};
//- menu content event listeners -//
menuContent.onclick = e => {
  const button = e.target.closest('button');
  if (button) {
    if (button.id.startsWith('bookit')) {
      const [, userID, roomNumber] = button.id.split('-');
      const { value } = dateInput;
      if (value) {
        const date = value.replaceAll('-', '/');
        const data = {
          userID: Number(userID),
          roomNumber: Number(roomNumber),
          date,
        };
        postResource('bookings', data)
          .then(message => console.log(message))
          .then(() => getResource('bookings'))
          .then(({ bookings }) => (allBookings = [...bookings]))
          .then(() => {
            showUserBookings(user, userBookings, allBookings, allRooms);
            roomFilters = {
              ...filterDefaults,
            };
            filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
            const dateInput = checkDatesForm.querySelector('input');
            dateInput.value = roomFilters.date.replaceAll('/', '-');
            const selectors = checkDatesForm.querySelectorAll('select');
          })
          .catch(err => console.error(err));
      }
    }
  }
};
/*--- FUNCTIONS ---*/
function start() {
  adjustMenuMaxHeight();
  Promise.all([getResource('rooms'), getResource('bookings')])
    .then(data => {
      updateGlobalVariables(...data);
    })
    .then(() => getResource('customers', 50))
    .then(customer => {
      user = customer;
      loginUser();
    })
    .catch(err => console.error(err));
}

function updateGlobalVariables({ rooms }, { bookings }) {
  allRooms = [...rooms];
  allBookings = [...bookings];
  filteredRooms = filterRooms(roomFilters, allRooms, allBookings);
  loadContent(allRooms);
}

function loginUser() {
  const { name } = user;
  loggedRequiredEls.forEach(element => {
    element.classList.remove('login-required');
  });
  resetLoginForm();
  openLogoutBtn.querySelector('p').innerText = name;
  openLogoutBtn.querySelector('h5').innerText = name;
  toggleLoginBtns();

  showUserBookings(user, userBookings, allBookings, allRooms);
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

function showUserBookings(user, userBookings, allBookings, allRooms) {
  updateUserBookings(user, userBookings, allBookings, allRooms);

  hideElement(menuDrawer, 'minimized');
  hideCloseMenuBtns();
  setTimeout(() => {
    const closeBookingsBtn = getComplimentaryBtn(openBookingsBtn);
    openMenu('bookings', userBookings, user);
    toggleMenuBtns(openBookingsBtn, closeBookingsBtn);
  }, 500);
}
//- validate input functions -//
function getMenuTypeAndData(buttonID) {
  const { isAdmin } = user;
  const menuType = buttonID.includes('dates') ? 'dates' : 'bookings';
  // if (menuType === 'dates') {filterdRooms = filterRooms(roomsFilters, )}
  const data =
    menuType === 'dates' ? filteredRooms : isAdmin ? allBookings : userBookings;
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
