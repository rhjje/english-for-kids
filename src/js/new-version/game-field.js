/* eslint-disable no-param-reassign */
import Card from './components/card';
// import Switcher from './components/switch';
// import playGame from './play-game';
import cards from '../../assets/json/cards.json';

export default class GameField {
  constructor() {
    this.container = document.querySelector('.container');
  }

  init(activeCard) {
    this.container.innerHTML = '';
    // playGame.repeatMode = false;
    const container = document.createElement('div');
    container.classList.add('wrapper');
    // container.innerHTML += Switcher.render();

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards');

    const data = cards[activeCard];
    for (let i = 0; i < data.length; i += 1) {
      const card = new Card(data[i].image, data[i].word, data[i].translation, i);
      cardsContainer.appendChild(card.render());
    }
    container.appendChild(cardsContainer);
    this.container.appendChild(container);
  }
}

// const containerApp = document.querySelector('.container');

// const gameField = {
//   setContentCards(activeCard) {
//     containerApp.innerHTML = '';
//     // playGame.repeatMode = false;
//     const container = document.createElement('div');
//     container.classList.add('wrapper');
//     // container.innerHTML += Switcher.render();

//     const cardsContainer = document.createElement('div');
//     cardsContainer.classList.add('cards');

//     const data = cards[activeCard];
//     for (let i = 0; i < data.length; i += 1) {
//       const card = new Card(data[i].image, data[i].word, data[i].translation, i);
//       cardsContainer.appendChild(card.render());
//     }
//     container.appendChild(cardsContainer);
//     containerApp.appendChild(container);

//     // const input = document.querySelector('input[type=checkbox]');
//     // input.addEventListener('change', () => {
//     //   document.querySelector('.train-mode').classList.toggle('active-mode');
//     //   document.querySelector('.game-mode').classList.toggle('active-mode');
//     //   const cards = document.querySelectorAll('.card-word__front-image');
//     //   if (input.checked) {
//     //     cards.forEach((card) => {
//     //       card.style.height = '260px';
//     //     });
//     //     playGame.init();
//     //   } else {
//     //     cards.forEach((card) => {
//     //       card.style.height = '200px';
//     //     });

//     //     document.querySelector('.container .wrapper').removeChild(document.querySelector('.button-play'));
//     //     document.querySelector('.container .wrapper').removeChild(document.querySelector('.box-stars'));
//     //   }
//     // });
//   },
// };

// gameField.setTitleCards();

// export default gameField;
