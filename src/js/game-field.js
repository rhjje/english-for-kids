/* eslint-disable no-param-reassign */
import TitleCard from './components/title-card';
import Card from './components/card';
import Switcher from './components/switch';
import playGame from './play-game';

const gameField = {
  activeCard: null,
  title: {
    0: 'Action (set A)',
    1: 'Action (set B)',
    2: 'Action (set C)',
    3: 'Adjective',
    4: 'Animal (set A)',
    5: 'Animal (set B)',
    6: 'Clothes',
    7: 'Emotion',
  },

  images: {
    0: './assets/images/categories/actionA.jpg',
    1: './assets/images/categories/actionB.jpg',
    2: './assets/images/categories/actionC.jpg',
    3: './assets/images/categories/adjective.jpg',
    4: './assets/images/categories/animalA.jpg',
    5: './assets/images/categories/animalB.jpg',
    6: './assets/images/categories/clothes.jpg',
    7: './assets/images/categories/emotion.jpg',
  },

  setTitleCards() {
    this.removeContent();
    const container = document.createElement('div');
    container.classList.add('wrapper');
    document.querySelector('.container').appendChild(container);

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-title');

    for (let i = 0; i < 8; i += 1) {
      const card = new TitleCard(this.images[i], this.title[i], i);
      cardsContainer.innerHTML += card.render();
    }
    cardsContainer.innerHTML += '<div class="subtitle">Hello! choose a category:</div>';
    container.appendChild(cardsContainer);

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        this.removeContent();
        this.activeCard = card.getAttribute('data-number');
        this.setContentCards(this.activeCard);
      });
    });
  },

  setContentCards(activeCard) {
    this.removeContent();
    const container = document.createElement('div');
    container.classList.add('wrapper');
    container.innerHTML += Switcher.render();
    document.querySelector('.container').appendChild(container);

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards');

    fetch('./assets/json/cards.json')
      .then((result) => result.json())
      .then((result) => {
        const data = result[activeCard];
        for (let i = 0; i < data.length; i += 1) {
          const card = new Card(data[i].image, data[i].word, data[i].translation, i);
          cardsContainer.appendChild(card.render());
        }
        container.appendChild(cardsContainer);
      });

    const input = document.querySelector('input[type=checkbox]');
    input.addEventListener('change', () => {
      document.querySelector('.train-mode').classList.toggle('active-mode');
      document.querySelector('.game-mode').classList.toggle('active-mode');
      const cards = document.querySelectorAll('.card-word__front-image');
      if (input.checked) {
        cards.forEach((card) => {
          card.style.height = '260px';
        });
        playGame.init();
      } else {
        cards.forEach((card) => {
          card.style.height = '200px';
        });

        document.querySelector('.container .wrapper').removeChild(document.querySelector('.button-play'));
        document.querySelector('.container .wrapper').removeChild(document.querySelector('.box-stars'));
      }
    });
  },

  removeContent() {
    const currentContent = document.querySelector('.container');
    while (currentContent.firstChild) {
      currentContent.removeChild(currentContent.firstChild);
    }
  },
};

gameField.setTitleCards();

export default gameField;
