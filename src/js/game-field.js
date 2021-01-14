import TitleCard from './components/title-card';
import Card from './components/card';
import toogle from './components/switch';

const gameField = {
  container: null,
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

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('wrapper');
    document.querySelector('.container').appendChild(this.container);
    this.setTitleCards();
  },

  setTitleCards() {
    for (let i = 0; i < 8; i += 1) {
      const card = new TitleCard(this.images[i], this.title[i], i);
      this.container.appendChild(card.render());
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        this.removeContent();
        this.setContentCards(card.getAttribute('data-number'));
      });
    });
  },

  setContentCards(activeCard) {
    toogle.switchBox.classList.remove('switch-disabled');

    fetch('./assets/json/cards.json')
      .then((result) => result.json())
      .then((result) => {
        const data = result[activeCard];
        for (let i = 0; i < data.length; i += 1) {
          const card = new Card(data[i].image, data[i].word, data[i].translation, i);
          this.container.appendChild(card.render());
        }
      });
  },

  removeContent() {
    const currentCards = document.querySelector('.container .wrapper');
    while (currentCards.firstChild) {
      currentCards.removeChild(currentCards.firstChild);
    }
  },
};

gameField.init();

export default gameField;
