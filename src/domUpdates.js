import { imageURLs } from './data';
/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
/*--- FUNCTIONS ---*/
export function loadContent() {
  updateHeaderBackgroundImg();
}

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
