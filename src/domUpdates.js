import { imageURLs } from './data';
import { getRoomTypes } from './rooms';
import { createRoomCards } from './uiComponents/roomCards';
import { getCurrentDate } from './utility';
/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
const menuDrawer = document.getElementById('menu-drawer');
const menuForms = menuDrawer.querySelectorAll('form');
const menuContent = document.getElementById('menu-content');
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
const openMenuBtns = document.querySelectorAll('.open-menu-btn');
const altCloseBtn = document.getElementById('alt-close-btn');
//- inputs -//
const roomDateInput = document.getElementById('vacancy-date');
const roomTypeSelector = document.getElementById('vacancy-room-types');
//- bookings totals -//
const spentUpcoming = document.getElementById('spent-upcoming');
const spentPast = document.getElementById('spent-past');
const spentTotal = document.getElementById('spent-total');
//- other -//
const menuTitle = menuDrawer.querySelector('h2');
/*--- FUNCTIONS ---*/
export function loadContent(rooms) {
  createPageContent(rooms);
  setDefaults();
  updateHeaderBackgroundImg();
}
//- create dynamic content functions -//
function createPageContent(rooms) {
  createSelectorOptions(rooms);
}

function createSelectorOptions(rooms) {
  const defaultOption = createOption('', '', true);
  roomTypeSelector.appendChild(defaultOption);

  const roomTypes = getRoomTypes(rooms);

  Object.keys(roomTypes).forEach(category => {
    const group = createOptionGrp(category);
    roomTypeSelector.appendChild(group);
    roomTypes[category].forEach(type => {
      const option = createOption(type);
      group.appendChild(option);
    });
  });
}

function createOptionGrp(label) {
  const group = document.createElement('optgroup');
  group.label = label;
  return group;
}

function createOption(value, text, isSelected) {
  text = text || value;
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  if (isSelected) option.selected = true;
  return option;
}
//- create input defaults functions -//
function setDefaults() {
  roomDateInput.value = getCurrentDate();
}
//- animation functions -//
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
//- hide / unhide element -//
export function hideElement(element, ...hiddenClasses) {
  element.classList.add(...hiddenClasses);
  element.ariaHidden = 'true';
  element.disabled = true;
}

export function unhideElement(element) {
  element.classList.remove('clear', 'minimized', 'hidden');
  element.ariaHidden = 'false';
  element.removeAttribute('disabled');
}
//- menu functions -//
export function openMenu(menuType, data, isAdminAccount) {
  showMenuContent(menuType, data, isAdminAccount);
  unhideElement(menuDrawer);
}

export function closeMenu(closeBtn) {
  openMenuBtns.forEach(button => {
    unhideElement(button);
  });

  hideElement(menuDrawer, 'minimized');
  hideElement(closeBtn);
  if (closeBtn)
    setTimeout(() => {
      openMenuBtns.forEach(button => unhideElement(button));
      hideElement(closeBtn, 'hidden');
      closeBtn.querySelector('img').classList.add('clear');
    }, 500);
}

const showMenuType = {
  login: showLoginMenu,
  dates: showDatesMenu,
  bookings: showBookingsMenu,
};

export function showMenuContent(type, data, isAdmin) {
  if (!showMenuType[type]) alert('MENU TYPE: ' + type);
  else {
    hideElement(altCloseBtn, 'hidden');
    menuForms.forEach(form => hideElement(form, 'hidden'));
    const menuForm = [...menuForms].find(form => form.id.includes(type));
    unhideElement(menuForm);
    menuContent.innerHTML = '';
    showMenuType[type](data, isAdmin);
  }
}

function showLoginMenu() {
  unhideElement(altCloseBtn);
  menuTitle.innerText = 'sign in';
}

function showDatesMenu(rooms, isAdmin) {
  menuTitle.innerText = 'check rooms by date';
  const heading = document.createElement('h3');
  heading.innerText = 'Available Rooms';
  menuContent.appendChild(heading);
  menuContent.appendChild(createRoomCards(rooms));
}

function showBookingsMenu(bookings, isAdmin) {
  const { selection, totals } = bookings;
  menuTitle.innerText = isAdmin ? 'bookings' : 'my bookings';
  if (isAdmin) {
    console.log('is admin');
  } else {
    const { past, upcoming, total } = totals;
    spentUpcoming.innerText = upcoming;
    spentPast.innerText = past;
    spentTotal.innerText = total;
  }
  const bookingsContainer = document.createElement('section');
  bookingsContainer.id = 'bookings-lists';
  menuContent.appendChild(bookingsContainer);
  const upcomingBookings = createBookingsList(
    bookings.upcoming,
    selection,
    'upcoming'
  );
  if (upcomingBookings) bookingsContainer.appendChild(upcomingBookings);
  const pastBookings = createBookingsList(bookings.past, selection, 'past');
  if (pastBookings) bookingsContainer.appendChild(pastBookings);
}

function createBookingsList(bookings, selection, type) {
  var bookingsList = '';
  if (selection === 'all' || selection === type) {
    bookingsList = document.createElement('section');

    const heading = document.createElement('h4');
    heading.innerText = type + ':';
    bookingsList.appendChild(heading);

    const list = document.createElement('ul');
    bookingsList.appendChild(list);

    if (bookings.length) {
      bookings.forEach(booking => {
        const item = document.createElement('li');
        item.innerHTML = createBookingDetails(booking);
        list.appendChild(item);
      });
    } else {
      const message = document.createElement('li');
      message.innerText = `No ${type} bookings.`;
      list.appendChild(message);
    }
  }

  return bookingsList;
}

function createBookingDetails(booking) {
  const { id, userID, date, roomNumber, price } = booking;
  const elID = `"booking-${id}-${userID}"`;
  const elDate = `<span class="booking-date">Date: <b>${date}</b></span>`;
  const elRoom = `<span class="booking-room">Room: <b>${roomNumber}</b></span>`;
  const elPrice = `<span class="booking-price">Price: <b>${price}</b></span>`;
  const element = `<span id=${elID}>${elDate}${elRoom}${elPrice}</span>`;
  return element;
}
