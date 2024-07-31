import { imageURLs } from './data';
import { getRoomTypes } from './rooms';
import { createRoomCards } from './uiComponents/roomCards';
import { getCurrentDate } from './scripts';
/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
const menuContent = document.getElementById('menu-content');
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
//- inputs -//
const roomDateInput = document.getElementById('vacancy-date');
const roomTypeSelector = document.getElementById('vacancy-room-types');
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
  element.disabled = 'true';
}

export function unhideElement(element) {
  element.classList.remove('clear', 'minimized', 'hidden');
  element.ariaHidden = 'false';
  element.removeAttribute('disabled');
}
//- show content functions -//
export function showRooms(rooms) {
  menuContent.innerHTML = '';
  menuContent.appendChild(createRoomCards(rooms));
}
