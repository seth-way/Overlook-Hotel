import { createCloseBtn } from './buttons';
import { hideElement, unhideElement} from '../domUpdates';

export const createMenu = () => {
  //- containers -//
  const navBar = document.querySelector('nav');
  const menuDrawer = document.getElementById('menu-drawer');
  //- buttons -//
  const openMenuBtns = document.querySelectorAll('.open-menu-btn');

  // create corresponding closing buttons for all open menu buttons
  openMenuBtns.forEach(button => {
    createCloseBtn(button);
  });

  var closeMenuBtns = document.querySelectorAll('.close-menu-btn');
  //- functions -//
  function toggleMenuBtns(clickedBtn, otherBtn) {
    const { id } = clickedBtn;
    if (id.includes('open')) {
      openMenuBtns.forEach(btn => {
        if (btn.id !== id) hideElement(btn, 'clear');
      });
    }

    clickedBtn.disabled = 'true';
    unhideElement(otherBtn);
    otherBtn.disabled = true;

    setTimeout(() => {
      hideElement(clickedBtn, 'clear');
      otherBtn.disabled = false;
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

  function adjustMenuMaxHeight() {
    const navBarHeight = Math.floor(navBar.offsetHeight);
    menuDrawer.style.maxHeight = `calc(100vh - ${navBarHeight}px)`
  }

  return {
    toggleMenuBtns,
    hideCloseMenuBtns,
    adjustMenuMaxHeight
  };
};
