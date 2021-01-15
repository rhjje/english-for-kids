import statistics from '../statistics';

export default class Card {
  constructor(image, word, translation, number) {
    this.image = image;
    this.word = word;
    this.translation = translation;
    this.number = number;
    this.card = null;
    this.cardFront = null;
    this.cardBack = null;
  }

  render() {
    this.card = document.createElement('div');
    this.card.classList.add('card-word');

    this.cardFront = document.createElement('div');
    this.cardFront.classList.add('card-word__front');
    this.cardFront.setAttribute('data-number', `${this.number}`);
    this.cardFront.setAttribute('data-name', `${this.word}`);

    const cardFrontImage = document.createElement('div');
    cardFrontImage.classList.add('card-word__front-image');
    const imgFront = document.createElement('img');
    imgFront.src = `./${this.image}`;
    cardFrontImage.appendChild(imgFront);

    const cardFrontName = document.createElement('span');
    cardFrontName.classList.add('card-word__front-name');
    cardFrontName.innerText = `${this.word}`;

    const gameMode = document.querySelector('label > input');

    this.cardFront.addEventListener('click', (event) => {
      if (!event.target.classList.contains('reverse-button') && !gameMode.checked) {
        statistics.countingStatistics(this.word, 'clicks');
        this.toVoice();
      }
    });

    const cardButton = document.createElement('div');
    cardButton.classList.add('reverse-button');
    cardButton.setAttribute('data-number', `${this.number}`);
    cardButton.addEventListener('click', () => {
      this.reverseCard();
    });

    this.cardFront.appendChild(cardFrontImage);
    this.cardFront.appendChild(cardFrontName);
    this.cardFront.appendChild(cardButton);

    this.cardBack = document.createElement('div');
    this.cardBack.classList.add('card-word__back');

    const cardBackImage = document.createElement('div');
    cardBackImage.classList.add('card-word__back-image');
    const img = document.createElement('img');
    img.src = `./${this.image}`;
    cardBackImage.appendChild(img);

    const cardBackName = document.createElement('span');
    cardBackName.classList.add('card-word__back-name');
    cardBackName.innerText = `${this.translation}`;

    this.cardBack.appendChild(cardBackImage);
    this.cardBack.appendChild(cardBackName);

    this.card.appendChild(this.cardFront);
    this.card.appendChild(this.cardBack);

    return this.card;
  }

  toVoice() {
    const audio = new Audio(`./assets/sounds/${this.word}.mp3`);
    audio.load();
    audio.play();
  }

  reverseCard() {
    this.cardFront.style.transform = 'rotateY(180deg)';
    this.cardBack.style.transform = 'rotateY(360deg)';
    this.card.addEventListener('mouseleave', () => {
      this.cardFront.style.transform = 'rotateY(0deg)';
      this.cardBack.style.transform = 'rotateY(180deg)';
    });
  }
}
