import hamburgerMenu from './hamburger-menu';
import router from './router';
import { setLocalStorage } from './statistics';

document.addEventListener('DOMContentLoaded', () => {
  hamburgerMenu();
  router.init();
  if (!localStorage.getItem('data')) {
    setLocalStorage();
  }
});
