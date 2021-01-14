import gameField from './game-field';
import burgerIcon from './components/burger-icon';
import toogle from './components/switch';
import statistics from './stat';

const links = document.querySelectorAll('.navigation-item');
links.forEach((link) => {
  link.addEventListener('click', () => {
    gameField.removeContent();
    burgerIcon.burgerBox.click();
    document.querySelector('.navigation-item.active').classList.remove('active');
    link.classList.add('active');

    if (link.getAttribute('data-number') === 'main') {
      toogle.switchBox.classList.add('switch-disabled');
      gameField.setTitleCards();
    } else if (link.getAttribute('data-number') === 'statistics') {
      const stat = JSON.parse(localStorage.getItem('english-for-kids'));
      const dataForTable = statistics.sortObject(stat);
      statistics.buildingTable(dataForTable);
      document.querySelector('th:nth-child(1)').innerHTML = '&darr; Word';
    } else {
      gameField.setContentCards(link.getAttribute('data-number'));
    }
  });
});
