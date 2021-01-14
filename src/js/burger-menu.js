import gameField from './game-field';
import burgerIcon from './components/burger-icon';
import toogle from './components/switch';
import statistics from './statistics';
import playGame from './play-game';

const links = document.querySelectorAll('.navigation-item');
links.forEach((link) => {
  link.addEventListener('click', () => {
    gameField.removeContent();
    burgerIcon.burgerBox.click();
    document.querySelector('.navigation-item.active').classList.remove('active');
    link.classList.add('active');

    if (link.getAttribute('data-number') === 'main') {
      toogle.removeSwitcher();
      gameField.setTitleCards();
    } else if (link.getAttribute('data-number') === 'statistics') {
      toogle.removeSwitcher();
      const stat = JSON.parse(localStorage.getItem('english-for-kids'));
      const dataForTable = statistics.sortObject(stat);
      statistics.buildingTable(dataForTable);
      document.querySelector('th:nth-child(1)').innerHTML = '&darr; Word';
    } else {
      gameField.setContentCards(link.getAttribute('data-number'));
    }
  });
});

const title = document.querySelector('.title');
title.addEventListener('click', () => {
  gameField.removeContent();
  playGame.deleteGameElements();
  gameField.setTitleCards();

  document.querySelector('.navigation-item.active').classList.remove('active');
  document.querySelector('.navigation-item:first-child').classList.add('active');
});
