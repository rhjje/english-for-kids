import MainPage from './main-page';
import GameField from './game-field';
import Statistics from './statistics';

const mainPage = new MainPage();
const gameField = new GameField();
const statistics = new Statistics();

const router = {
  changeRoute(url = '/') {
    if (window.location.pathname !== url) {
      if (url === '/') {
        mainPage.init();
        window.history.pushState({}, null, './');
      } else if (url === '/statistics') {
        statistics.init();
        window.history.pushState({}, null, `.${url}`);
      } else {
        gameField.init(url.slice(1));
        window.history.pushState({}, null, `.${url}`);
      }
    }
  },

  init() {
    if (window.location.pathname.slice(-1) === '/') {
      mainPage.init();
    } else if (window.location.pathname === '/statistics') {
      statistics.init();
    } else {
      const path = window.location.pathname;
      gameField.init(path.slice(path.lastIndexOf('/') + 1));
    }

    window.addEventListener('popstate', () => {
      if (window.location.pathname.slice(-1) === '/') {
        mainPage.init();
      } else if (window.location.pathname === '/statistics') {
        statistics.init();
      } else {
        const path = window.location.pathname;
        gameField.init(path.slice(path.lastIndexOf('/') + 1));
      }
    });
  }
};

export default router;
