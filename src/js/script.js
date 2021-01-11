/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
    0: './assets/images/categories/actionA.jpg',
    1: './assets/images/categories/actionB.jpg',
    2: './assets/images/categories/actionC.jpg',
    3: './assets/images/categories/adjective.jpg',
    4: './assets/images/categories/animalA.jpg',
    5: './assets/images/categories/animalB.jpg',
    6: './assets/images/categories/clothes.jpg',
    7: './assets/images/categories/emotion.jpg',
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
    const currentCards = document.querySelector('.container .wrapper');
    while (currentCards.firstChild) {
      currentCards.removeChild(currentCards.firstChild);
    }
  },

  setContentCards(activeCard) {
    this.isHeadPage = false;
    playGame.makeVisibleButton();

    const request = new XMLHttpRequest();
    request.open('GET', './assets/json/cards.json');
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
        cardFront.setAttribute('data-name', `${cardsContent[activeCard][i].word}`);

        const cardFrontImage = document.createElement('div');
        cardFrontImage.className = 'card-word__front-image';
        const imgFront = document.createElement('img');
        imgFront.src = `./${cardsContent[activeCard][i].image}`;
        cardFrontImage.append(imgFront);

        const cardFrontName = document.createElement('span');
        cardFrontName.className = 'card-word__front-name';
        cardFrontName.innerText = `${cardsContent[activeCard][i].word}`;

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
        img.src = `./${cardsContent[activeCard][i].image}`;
        cardBackImage.append(img);

        const cardBackName = document.createElement('span');
        cardBackName.className = 'card-word__back-name';
        cardBackName.innerText = `${cardsContent[activeCard][i].translation}`;

        cardBack.appendChild(cardBackImage);
        cardBack.appendChild(cardBackName);

        // build card
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        this.container.appendChild(card);
      }
      statistics.countClicks();
    };
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
    source.src = `./assets/sounds/${words[number].innerText}.mp3`;
    audio.append(source);
    audio.play();
  },
};

categories.init();

const playGame = {
  button: null,
  boxStars: null,
  currentWords: {},
  rating: [],
  correctAnswer: null,
  wrongAnswer: null,
  soundWin: null,
  soundLose: null,
  singleGame: true,
  currentSound: null,
  attributeCards: [],

  init() {
    // create button play
    this.button = document.createElement('div');
    this.button.classList.add('button-play', 'disabled');
    const title = document.createElement('span');
    title.innerText = 'Start game';
    this.button.append(title);

    // create box stars
    this.boxStars = document.createElement('div');
    this.boxStars.className = 'box-stars';

    // add diffents sounds
    this.correctAnswer = document.createElement('audio');
    const sourceCorrect = document.createElement('source');
    sourceCorrect.src = './assets/sounds/correct.mp3';
    this.correctAnswer.append(sourceCorrect);

    this.wrongAnswer = document.createElement('audio');
    const sourceWrong = document.createElement('source');
    sourceWrong.src = './assets/sounds/error.mp3';
    this.wrongAnswer.append(sourceWrong);

    this.soundWin = document.createElement('audio');
    const sourceWin = document.createElement('source');
    sourceWin.src = './assets/sounds/success.mp3';
    this.soundWin.append(sourceWin);

    this.soundLose = document.createElement('audio');
    const sourceLose = document.createElement('source');
    sourceLose.src = './assets/sounds/failure.mp3';
    this.soundLose.append(sourceLose);

    // add button and stars box to document
    document.querySelector('.container').appendChild(this.button);
    document.querySelector('.container').appendChild(this.boxStars);

    this.button.addEventListener('click', () => {
      if (this.singleGame) {
        this.button.classList.add('repeat');
        document.querySelector('.button-play > span').innerText = '';
        this.currentWords = [];
        this.play();
        this.singleGame = false;
      } else {
        const audio = document.createElement('audio');
        const source = document.createElement('source');
        source.src = this.currentSound;
        audio.append(source);
        audio.play();
      }
    });
  },

  play() {
    this.setPlayingWords();
    const orderWords = [...Array(8).keys()].sort(() => Math.random() - 0.5);

    let count = 0;
    let mistakes = 0;

    const playWord = () => {
      const audio = document.createElement('audio');
      const source = document.createElement('source');
      source.src = `./assets/sounds/${this.currentWords[orderWords[count]]}.mp3`;
      this.currentSound = `./assets/sounds/${this.currentWords[orderWords[count]]}.mp3`;
      audio.append(source);
      audio.play();
    };
    // add event listener cards of word
    const cards = document.querySelectorAll('.card-word__front');

    for (const card of cards) {
      card.addEventListener('click', () => {
        if (+card.getAttribute('data-number') === orderWords[count]) {
          this.attributeCards.push(card.getAttribute('data-number'));
          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star-win.svg';
          this.boxStars.appendChild(winStars);

          this.correctAnswer.play();
          card.style.filter = 'blur(5px)';
          count += 1;

          if (count < 8) {
            setTimeout(() => playWord(), 500);
          }

          // set local storage
          const currentCard = card.getAttribute('data-name');
          const currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));
          currentWord.correct += 1;
          currentWord.percent = (currentWord.wrong * 100)
            / (currentWord.wrong + currentWord.correct);
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);

          // check win or lose
          if (count === 8 && mistakes === 0) {
            setTimeout(() => {
              const currentCards = document.querySelector('.container .wrapper');
              while (currentCards.firstChild) {
                currentCards.removeChild(currentCards.firstChild);
              }
              document.querySelector('.button-play > span').innerText = 'Start game';
              this.singleGame = true;
              this.button.classList.remove('repeat');
              this.button.classList.add('disabled');
              this.attributeCards = [];

              // add final title and picture
              const winScreen = document.createElement('div');
              winScreen.className = 'win-image';
              const span = document.createElement('div');
              span.className = 'win-title';
              span.innerText = 'Congratulations. You won!';
              const img = document.createElement('img');
              const arrImgs = ['mask.jpg', 'stark.jpg', 'stark2.jpg', 'youDidIt.png'];
              arrImgs.sort(() => Math.random() - 0.5);
              img.src = `./assets/images/endGame/${arrImgs[0]}`;

              winScreen.append(img);
              currentCards.appendChild(span);
              currentCards.appendChild(winScreen);
              this.soundWin.play();
            }, 500);

            this.clearFinalScreen();
          } else if (count === 8) {
            setTimeout(() => {
              const currentCards = document.querySelector('.container .wrapper');
              while (currentCards.firstChild) {
                currentCards.removeChild(currentCards.firstChild);
              }
              document.querySelector('.button-play > span').innerText = 'Start game';
              this.singleGame = true;
              this.button.classList.remove('repeat');
              this.button.classList.add('disabled');
              this.attributeCards = [];

              // add final title and picture
              const winScreen = document.createElement('div');
              winScreen.className = 'win-image';
              const span = document.createElement('span');
              span.className = 'win-title';
              span.innerHTML = `Sorry. You lost(: Train and try again!</br>
                Number of mistakes ${mistakes}.`;
              const img = document.createElement('img');
              const arrImgs = ['lose1', 'lose2', 'lose3', 'lose4', 'lose5'];
              arrImgs.sort(() => Math.random() - 0.5);
              img.src = `./assets/images/endGame/${arrImgs[0]}.jpg`;

              winScreen.append(img);
              currentCards.appendChild(span);
              currentCards.appendChild(winScreen);

              this.soundLose.play();
            }, 500);

            this.clearFinalScreen();
          }
        } else if (!this.attributeCards.includes(card.getAttribute('data-number'))) {
          // set local storage
          const currentCard = this.currentWords[orderWords[count]];
          const currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));
          currentWord.wrong += 1;
          currentWord.percent = (currentWord.wrong * 100)
            / (currentWord.wrong + currentWord.correct);
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);

          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star.svg';
          this.boxStars.appendChild(winStars);
          this.wrongAnswer.play();
          mistakes += 1;
        }
      });
    }

    playWord();
  },

  setPlayingWords() {
    const words = document.querySelectorAll('.card-word__front-name');
    for (let i = 0; i < 8; i += 1) {
      this.currentWords[i] = words[i].innerText;
    }
  },

  clearFinalScreen() {
    setTimeout(() => {
      const container = document.querySelector('.container');
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      categories.container = null;
      categories.init();
      playGame.init();
    }, 2500);
  },

  makeVisibleButton() {
    if (categories.isHeadPage || toggler.toggleOff) {
      playGame.button.classList.add('disabled');
    } else {
      playGame.button.classList.remove('disabled');
    }
  },
};

playGame.init();

const toggler = {
  switchBox: null,
  toggle: null,
  titlePlay: null,
  titleTrain: null,
  toggleOff: true,

  init() {
    this.switchBox = document.createElement('div');
    this.switchBox.className = 'switch';

    this.toggle = document.createElement('div');
    this.toggle.className = 'toggle';
    this.toggle.setAttribute('data-info', 'off');
    this.titlePlay = document.createElement('span');
    this.titlePlay.className = 'play';
    this.titlePlay.innerText = 'play';
    this.titleTrain = document.createElement('span');
    this.titleTrain.classList.add('train', 'hidden');
    this.titleTrain.innerText = 'train';

    // add elements to switch
    this.switchBox.appendChild(this.toggle);
    this.switchBox.appendChild(this.titlePlay);
    this.switchBox.appendChild(this.titleTrain);

    // add switch to document
    document.querySelector('.header .wrapper').appendChild(this.switchBox);

    // add event listener to toggler
    this.toggle.addEventListener('click', () => {
      this.titlePlay.classList.toggle('hidden');
      this.titleTrain.classList.toggle('hidden');
      const cards = document.querySelectorAll('.card-word');

      if (this.toggleOff) {
        const statistics = document.querySelector('.table');
        if (statistics) {
          categories.isHeadPage = true;
        }
        this.toggle.setAttribute('data-info', 'on');
        this.toggle.style.transform = 'translateX(80px)';
        this.toggleOff = false;
        playGame.makeVisibleButton();

        for (const card of cards) {
          card.style.height = '200px';
        }
      } else {
        this.toggle.setAttribute('data-info', 'off');
        this.toggle.style.transform = 'translateX(0)';
        this.toggleOff = true;
        playGame.button.classList.add('disabled');
        for (const card of cards) {
          card.style.height = '280px';
        }
      }
    });
  },
};

toggler.init();

const statistics = {
  setLocalStorage() {
    const request = new XMLHttpRequest();
    request.open('GET', './assets/json/cards.json');
    request.send();

    const words = [];

    request.onload = () => {
      const cardsContent = JSON.parse(request.response);
      cardsContent.forEach((arr) => {
        arr.forEach((card) => {
          words.push(card);
        });
      });

      words.forEach((item) => {
        const currentObj = {
          word: item.word,
          translation: item.translation,
          category: item.category,
          clicks: 0,
          correct: 0,
          wrong: 0,
          percent: 0,
        };
        if (!localStorage.getItem(`${item.word}`)) {
          localStorage.setItem(`${item.word}`, `${JSON.stringify(currentObj)}`);
        }
      });
    };
  },

  countClicks() {
    const cards = document.querySelectorAll('.card-word__front');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const currentCard = card.getAttribute('data-name');
        const currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));

        if (toggler.toggleOff) {
          currentWord.clicks += 1;
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);
        }
      });
    });
  },
};

statistics.setLocalStorage();

const burgerIcon = {
  burgerBox: null,
  firstLIne: null,
  secondLine: null,
  thirdLine: null,
  buttonOff: true,

  init() {
    this.burgerBox = document.createElement('div');
    this.burgerBox.className = 'burger-menu__button';

    this.firstLIne = document.createElement('div');
    this.firstLIne.className = 'first-line';
    this.secondLine = document.createElement('div');
    this.secondLine.className = 'second-line';
    this.thirdLine = document.createElement('div');
    this.thirdLine.className = 'third-line';

    this.burgerBox.appendChild(this.firstLIne);
    this.burgerBox.appendChild(this.secondLine);
    this.burgerBox.appendChild(this.thirdLine);

    this.burgerBox.addEventListener('click', () => {
      if (this.buttonOff) {
        this.firstLIne.style.transform = 'translateY(13px) rotate(45deg)';
        this.secondLine.style.transform = 'translateX(-40px)';
        this.thirdLine.style.transform = 'translateY(-13px) rotate(-45deg)';

        // movement burger-menu
        document.querySelector('.burger-menu').style.transform = 'translateX(0)';
        document.querySelector('.modal').classList.remove('modal-disabled');
        this.buttonOff = false;
      } else {
        this.firstLIne.style.transform = 'translateY(0) rotate(0)';
        this.secondLine.style.transform = 'translateX(0)';
        this.thirdLine.style.transform = 'translateY(0) rotate(0)';

        // movement burger-menu
        document.querySelector('.burger-menu').style.transform = 'translateX(-320px)';
        document.querySelector('.modal').classList.add('modal-disabled');
        this.buttonOff = true;
      }
    });

    // add burger-icon to page
    document.querySelector('.header .wrapper').prepend(this.burgerBox);

    document.querySelector('.burger-menu');
  },
};

// add links to menu items
const links = document.querySelectorAll('.navigation-item');
for (const link of links) {
  link.addEventListener('click', () => {
    document.querySelector('.modal').classList.add('modal-disabled');

    burgerIcon.firstLIne.style.transform = 'translateY(0) rotate(0)';
    burgerIcon.secondLine.style.transform = 'translateX(0)';
    burgerIcon.thirdLine.style.transform = 'translateY(0) rotate(0)';

    // movement burger-menu
    document.querySelector('.burger-menu').style.transform = 'translateX(-320px)';

    burgerIcon.buttonOff = true;

    document.querySelector('.navigation-item.active').classList.remove('active');
    link.classList.add('active');
    categories.removeContent();
    if (link.getAttribute('data-number') === 'main') {
      categories.isHeadPage = true;
      playGame.makeVisibleButton();
      categories.init();
    } else {
      categories.setContentCards(link.getAttribute('data-number'));
    }
  });
}

// add link to h1 title
const title = document.querySelector('.title');
title.addEventListener('click', () => {
  document.querySelector('.navigation-item.active').classList.remove('active');
  document.querySelector('div.burger-menu > ul > li:nth-child(1)').classList.add('active');
  categories.isHeadPage = true;
  playGame.makeVisibleButton();
  categories.removeContent();
  categories.init();
});

// add event listener to modal background
document.querySelector('.modal').addEventListener('click', () => {
  document.querySelector('.modal').classList.add('modal-disabled');
  burgerIcon.firstLIne.style.transform = 'translateY(0) rotate(0)';
  burgerIcon.secondLine.style.transform = 'translateX(0)';
  burgerIcon.thirdLine.style.transform = 'translateY(0) rotate(0)';
  document.querySelector('.burger-menu').style.transform = 'translateX(-320px)';
  burgerIcon.buttonOff = true;
});

burgerIcon.init();
