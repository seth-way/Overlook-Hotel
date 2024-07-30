import { createCloseBtn } from './buttons';
import { hideElement, unhideElement } from '../domUpdates';

export const createMenu = () => {
  //- containers -//
  const menuDrawer = document.getElementById('menu-drawer');
  //- buttons -//
  const openMenuBtns = document.querySelectorAll('.open-menu-btn');

  openMenuBtns.forEach(button => {
    createCloseBtn(button);
  });

  var closeMenuBtns = document.querySelectorAll('.close-menu-btn');

  function toggleMenuBtns(clickedBtn, otherBtn) {
    const { id } = clickedBtn;
    if (id.includes('open')) {
      const menuType = getMenuType(clickedBtn);
      openMenu(menuType);
      openMenuBtns.forEach(btn => {
        if (btn.id !== id) hideElement(btn, 'clear');
      });
    } else {
      closeMenu(clickedBtn);
    }
  
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

  function openMenu(menuType) {
    updateMenu(menuType);
    unhideElement(menuDrawer);
  }

  function closeMenu(closeBtn) {
    openMenuBtns.forEach(button => unhideElement(button));
    hideElement(menuDrawer, 'minimized');
  
    if (closeBtn) {
      setTimeout(() => {
        hideElement(closeBtn, 'hidden');
        closeBtn.querySelector('img').classList.add('clear');
      }, 500);
    }
  }

  function updateMenu(menuType) {
    // allMenus.forEach(menu => {
    //   if (menu.id.includes(menuType)) {
    //     unhideElement(menu);
    //   } else {
    //     hideElement(menu, 'hidden');
    //   }
    // });
  }

  return {
    toggleMenuBtns,
    hideCloseMenuBtns,
    openMenu,
    closeMenu,
    updateMenu
  }
};
