/* eslint-disable no-param-reassign */
import playGame from '../play-game';

const toggle = {
  switchBox: null,

  init() {
    this.switchBox = document.createElement('div');
    this.switchBox.classList.add('switch-container', 'switch-disabled');

    const trainMode = document.createElement('div');
    trainMode.classList.add('train-mode', 'active-mode');
    trainMode.innerText = 'Train';
    const gameMode = document.createElement('div');
    gameMode.classList.add('game-mode');
    gameMode.innerText = 'Play';

    const switcher = document.createElement('label');
    switcher.classList.add('switch');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    checkbox.addEventListener('change', () => {
      checkbox.classList.toggle('checked');
      const cards = document.querySelectorAll('.card-word');
      if (checkbox.classList.contains('checked')) {
        cards.forEach((card) => {
          card.style.height = '200px';
        });
        playGame.init();
      } else {
        cards.forEach((card) => {
          card.style.height = '280px';
        });
        document.querySelector('.container').removeChild(document.querySelector('.button-play'));
        document.querySelector('.container').removeChild(document.querySelector('.box-stars'));
      }

      trainMode.classList.toggle('active-mode');
      gameMode.classList.toggle('active-mode');
    });

    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    switcher.appendChild(checkbox);
    switcher.appendChild(span);

    this.switchBox.appendChild(trainMode);
    this.switchBox.appendChild(switcher);
    this.switchBox.appendChild(gameMode);

    document.querySelector('.container').prepend(this.switchBox);
  },
};

toggle.init();

export default toggle;
