import MainPage from './main-page';
import GameField from './game-field';

const mainPage = new MainPage();
const gameField = new GameField();

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.slice(-1) === '/') {
    mainPage.init();
  } else {
    // mainPage.setTitleCards();
    const path = window.location.pathname;
    gameField.init(path.slice(path.lastIndexOf('/') + 1));
  }
});

// if (window.location.pathname === '/') {
//   mainPage.setTitleCards();
// }

window.addEventListener('popstate', () => {
  if (window.location.pathname.slice(-1) === '/') {
    mainPage.init();
  } else {
    const path = window.location.pathname;
    gameField.init(path.slice(path.lastIndexOf('/') + 1));
  }
});

export default gameField;
