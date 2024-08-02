import { hideElement } from '../domUpdates';
/*--- FUNCTIONS ---*/
//- create button functions -//
export function createCloseBtn(openBtn) {
  const { parentNode, id } = openBtn;
  const closeBtn = document.createElement('button');
  closeBtn.id = getComplimentaryBtnId(id);
  closeBtn.classList.add('close-menu-btn', 'close');
  hideElement(closeBtn, 'hidden');
  createCloseBtnContent(closeBtn);
  parentNode.appendChild(closeBtn);
}

function createCloseBtnContent(closeBtn) {
  const img = document.createElement('img');
  img.src = './images/upTriangle.svg';
  img.alt = 'close';
  img.classList.add('clear');
  closeBtn.appendChild(img);

  const content = document.createElement('p');
  content.innerText = 'hide';
  closeBtn.appendChild(content);
}
//- button utility functions -//
export function getComplimentaryBtn(clickedBtn) {
  const { id } = clickedBtn;
  const otherId = getComplimentaryBtnId(id);
  const otherBtn = document.getElementById(otherId);
  return otherBtn;
}

function getComplimentaryBtnId(menuBtnId) {
  let otherBtnType;
  const clickedIdParts = menuBtnId.split('-');
  const otherIdParts = [...clickedIdParts];
  if (otherIdParts[0] === 'user') {
    otherBtnType = otherIdParts[2] === 'in' ? 'out' : 'in';
    otherIdParts[2] = otherBtnType;
  } else {
    otherBtnType = otherIdParts[0] === 'open' ? 'close' : 'open';
    otherIdParts[0] = otherBtnType;
  }

  return otherIdParts.join('-');
}
