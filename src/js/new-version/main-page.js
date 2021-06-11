import router from './router';

export default class MainPage {
  constructor() {
    this.container = document.querySelector('.container');
    this.titles = {
      0: 'Action (set A)',
      1: 'Action (set B)',
      2: 'Action (set C)',
      3: 'Adjective',
      4: 'Animal (set A)',
      5: 'Animal (set B)',
      6: 'Clothes',
      7: 'Emotion'
    };
    this.images = {
      0: './assets/images/categories/actionA.jpg',
      1: './assets/images/categories/actionB.jpg',
      2: './assets/images/categories/actionC.jpg',
      3: './assets/images/categories/adjective.jpg',
      4: './assets/images/categories/animalA.jpg',
      5: './assets/images/categories/animalB.jpg',
      6: './assets/images/categories/clothes.jpg',
      7: './assets/images/categories/emotion.jpg'
    };
    this.links = {
      0: '/action-a',
      1: '/action-b',
      2: '/action-c',
      3: '/adjective',
      4: '/animal-a',
      5: '/animal-b',
      6: '/clothes',
      7: '/emotion'
    };
  }

  init() {
    this.container.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('wrapper');

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-title');

    for (let i = 0; i < 8; i += 1) {
      const card = `<div class="card" data-link="${this.links[i]}">
        <div class="card__image"><img src="${this.images[i]}"></div>
        <span class="card__name">${this.titles[i]}</span>
      </div>`;
      cardsContainer.innerHTML += card;
    }
    cardsContainer.innerHTML += '<div class="subtitle">Hello! choose a category:</div>';
    container.appendChild(cardsContainer);
    this.container.appendChild(container);

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        router.changeRoute(card.getAttribute('data-link'));
        // window.history.pushState({}, null, `.${card.getAttribute('data-link')}`);
        // gameField.init(card.getAttribute('data-link').slice(1));
      });
    });
  }
}
