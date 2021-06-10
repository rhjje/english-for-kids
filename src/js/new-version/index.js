import MainPage from './main-page';
import GameField from './game-field';
import hamburgerMenu from './hamburger-menu';

const mainPage = new MainPage();
const gameField = new GameField();

document.addEventListener('DOMContentLoaded', () => {
  hamburgerMenu();
  if (window.location.pathname.slice(-1) === '/') {
    mainPage.init();
  } else {
    const path = window.location.pathname;
    gameField.init(path.slice(path.lastIndexOf('/') + 1));
  }
});

window.addEventListener('popstate', () => {
  if (window.location.pathname.slice(-1) === '/') {
    mainPage.init();
  } else {
    const path = window.location.pathname;
    gameField.init(path.slice(path.lastIndexOf('/') + 1));
  }
});

export default gameField;
