import { createCloseBtn } from './buttons';
import { hideElement, unhideElement, showRoomsByDate } from '../domUpdates';

export const createMenu = () => {
  //- containers -//
  const menuDrawer = document.getElementById('menu-drawer');
  const menuTitle = menuDrawer.querySelector('h2');
  const menuForms = menuDrawer.querySelectorAll('form');
  const menuContent = document.getElementById('menu-content');
  //- buttons -//
  const openMenuBtns = document.querySelectorAll('.open-menu-btn');
  const altClostBtn = document.getElementById('alt-close-btn');
  // create corresponding closing buttons for all open menu buttons
  openMenuBtns.forEach(button => {
    createCloseBtn(button);
  });

  var closeMenuBtns = document.querySelectorAll('.close-menu-btn');
  //- functions -//
  function toggleMenuBtns(clickedBtn, otherBtn) {
    const { id } = clickedBtn;
    if (id.includes('open')) {
      const menuType = getMenuType(clickedBtn);
      console.log('menu type:', menuType);
      openMenu(menuType);
      openMenuBtns.forEach(btn => {
        if (btn.id !== id) hideElement(btn, 'clear');
      });
    } else closeMenu(clickedBtn);

    clickedBtn.disabled = 'true';
    unhideElement(otherBtn);

    setTimeout(() => {
      hideElement(clickedBtn, 'clear');
      otherBtn.querySelector('img') &&
        otherBtn.querySelector('img').classList.remove('clear');
    }, 500);
  }

  function hideCloseMenuBtns() {
    closeMenuBtns.forEach(button => {
      hideElement(button, 'hidden');
      button.querySelector('img').classList.add('clear');
    });
  }

  function getMenuType(button) {
    const { id } = button;
    return id.split('-')[1];
  }

  function openMenu(menuType, isAdminAccount) {
    updateMenu(menuType, isAdminAccount);
    unhideElement(menuDrawer);
  }

  function closeMenu(closeBtn) {
    openMenuBtns.forEach(button => unhideElement(button));
    hideElement(menuDrawer, 'minimized');

    if (closeBtn)
      setTimeout(() => {
        hideElement(closeBtn, 'hidden');
        closeBtn.querySelector('img').classList.add('clear');
      }, 500);
  }
  //-- update menu functions --//
  const showMenu = {
    login: showLoginMenu,
    dates: showDatesMenu,
    bookings: showBookingsMenu,
  };

  function updateMenu(menuType, isAdminAccount) {
    if (!showMenu[menuType]) alert('MENU TYPE: ' + menuType);
    else {
      hideElement(altClostBtn, 'hidden');
      menuForms.forEach(form => hideElement(form, 'hidden'));
      const menu = [...menuForms].find(form => form.id.includes(menuType));
      unhideElement(menu);
      showMenu[menuType](isAdminAccount);
    }
  }

  function showLoginMenu(isAdminAccount) {
    hideCloseMenuBtns();
    unhideElement(altClostBtn);
    menuTitle.innerText = 'sign in';
  }

  function showDatesMenu(isAdminAccount) {
    menuTitle.innerText = 'check dates';
  }

  function showBookingsMenu(isAdminAccount) {
    menuTitle.innerText = isAdminAccount ? 'bookings' : 'my bookings';
  }

  return {
    toggleMenuBtns,
    hideCloseMenuBtns,
    openMenu,
    closeMenu,
    updateMenu,
  };
};
