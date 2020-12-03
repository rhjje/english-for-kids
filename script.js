const categories = {
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
    0: 'assets/images/categories/actionA.jpg',
    1: 'assets/images/categories/actionB.jpg',
    2: 'assets/images/categories/actionC.jpg',
    3: 'assets/images/categories/adjective.jpg',
    4: 'assets/images/categories/animalA.jpg',
    5: 'assets/images/categories/animalB.jpg',
    6: 'assets/images/categories/clothes.jpg',
    7: 'assets/images/categories/emotion.jpg',
  },

  isHeadPage: true,

  init() {
    // create container
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'wrapper';
      document.querySelector('.container').appendChild(this.container);
    }

    // create categories cards
    for (const i in this.title) {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-number', `${i}`);

      const cardImage = document.createElement('div');
      cardImage.className = 'card__image';

      const img = document.createElement('img');
      img.src = `${this.images[i]}`;
      cardImage.append(img);

      const cardName = document.createElement('span');
      cardName.className = 'card__name';
      cardName.innerText = `${this.title[i]}`;

      card.appendChild(cardImage);
      card.appendChild(cardName);

      this.container.appendChild(card);
    }

    // add event listener to categories cards
    const cards = document.querySelectorAll('.card');
    for (const card of cards) {
      card.addEventListener('click', () => {
        this.removeContent();
        this.setContentCards(card.getAttribute('data-number'));
      });
    }
  },

  removeContent() {
    const cards = this.container.querySelectorAll('.card');
    for (const card of cards) {
      this.container.removeChild(card);
    }

    const cardsWords = this.container.querySelectorAll('.card-word');
    for (const cardWord of cardsWords) {
      this.container.removeChild(cardWord);
    }
  },

  setContentCards(activeCard) {
    this.isHeadPage = false;
    playGame.makeVisibleButton();

    const request = new XMLHttpRequest();
    request.open('GET', 'cards.json');
    request.send();

    request.onload = () => {
      const cardsContent = JSON.parse(request.response);

      for (const i in cardsContent[activeCard]) {
        // create card
        const card = document.createElement('div');
        card.className = 'card-word';
        if (toggler.toggleOff) {
          card.style.height = '280px';
        } else {
          card.style.height = '200px';
        }

        // create front side card
        const cardFront = document.createElement('div');
        cardFront.className = 'card-word__front';
        cardFront.setAttribute('data-number', `${i}`);
        cardFront.setAttribute('data-name', `${cardsContent[activeCard][i]['word']}`);

        const cardFrontImage = document.createElement('div');
        cardFrontImage.className = 'card-word__front-image';
        const imgFront = document.createElement('img');
        imgFront.src = `${cardsContent[activeCard][i]['image']}`;
        cardFrontImage.append(imgFront);

        const cardFrontName = document.createElement('span');
        cardFrontName.className = 'card-word__front-name';
        cardFrontName.innerText = `${cardsContent[activeCard][i]['word']}`;

        // add event listener to card for voicing
        cardFront.addEventListener('click', (event) => {
          if (event.target.className !== 'reverse-button' && toggler.toggleOff) {
            this.toVoice(cardFront.getAttribute('data-number'));
          }
        });

        const cardButton = document.createElement('div');
        cardButton.className = 'reverse-button';
        cardButton.setAttribute('data-number', `${i}`);
        cardButton.addEventListener('click', () => {
          this.reverseCard(cardButton.getAttribute('data-number'));
        });

        cardFront.appendChild(cardFrontImage);
        cardFront.appendChild(cardFrontName);
        cardFront.appendChild(cardButton);

        // create back side card
        const cardBack = document.createElement('div');
        cardBack.className = 'card-word__back';

        const cardBackImage = document.createElement('div');
        cardBackImage.className = 'card-word__back-image';
        const img = document.createElement('img');
        img.src = `${cardsContent[activeCard][i]['image']}`;
        cardBackImage.append(img);

        const cardBackName = document.createElement('span');
        cardBackName.className = 'card-word__back-name';
        cardBackName.innerText = `${cardsContent[activeCard][i]['translation']}`;

        cardBack.appendChild(cardBackImage);
        cardBack.appendChild(cardBackName);

        // build card
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        this.container.appendChild(card);
      }
      statistics.countClicks();
    }
  },

  reverseCard(number) {
    const cards = document.querySelectorAll('.card-word');
    const cardsFront = document.querySelectorAll('.card-word__front');
    const cardsBack = document.querySelectorAll('.card-word__back');

    cardsFront[number].style.transform = 'rotateY(180deg)';
    cardsBack[number].style.transform = 'rotateY(360deg)';
    cards[number].addEventListener('mouseleave', () => {
      cardsFront[number].style.transform = 'rotateY(0deg)';
      cardsBack[number].style.transform = 'rotateY(180deg)';
    });
  },

  toVoice(number) {
    const words = document.querySelectorAll('.card-word__front-name');
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    source.src = `assets/sounds/${words[number].innerText}.mp3`;
    audio.append(source);
    audio.play();
  },
};

categories.init();