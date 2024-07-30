import './css/styles.css';
import './images/logo.svg';
import './images/upTriangle.svg';

import { loadContent } from './domUpdates';

/*--- EVENT LISTENERS ---*/
window.onload = start;

/*--- FUNCTIONS ---*/
function start() {
  loadContent();
}
