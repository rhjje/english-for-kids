/* eslint-disable no-param-reassign */
import statistics from './statistics';
import gameField from './game-field';

const playGame = {
  startGameButton: null,
  boxStars: null,
  currentWords: [],
  correctAnswer: null,
  wrongAnswer: null,
  soundWin: null,
  soundLose: null,
  repeat: null,
  currentWord: null,
  mistakes: 0,
  wordsUsed: [],
  repeatMode: false,

  init() {
    this.repeat = false;
    this.currentWords = [];
    this.currentWord = null;
    this.wordsUsed = [];

    this.startGameButton = document.createElement('button');
    this.startGameButton.classList.add('button-play');
    this.startGameButton.innerText = 'Start game';

    this.boxStars = document.createElement('div');
    this.boxStars.classList.add('box-stars');

    this.correctAnswer = new Audio('./assets/sounds/correct.mp3');
    this.wrongAnswer = new Audio('./assets/sounds/error.mp3');
    this.soundWin = new Audio('./assets/sounds/success.mp3');
    this.soundLose = new Audio('./assets/sounds/failure.mp3');

    document.querySelector('.container .wrapper').appendChild(this.startGameButton);
    document.querySelector('.container .wrapper').appendChild(this.boxStars);

    this.startGameButton.addEventListener('click', () => {
      if (this.repeat) {
        this.currentWord.play();
      } else {
        this.startGameButton.classList.add('repeat');
        this.repeat = true;
        this.play();
      }
    });
  },

  play() {
    const currentCards = document.querySelectorAll('.card-word__front');
    currentCards.forEach((card) => {
      this.currentWords.push(card.getAttribute('data-name'));
    });
    this.currentWords.sort(() => Math.random() - 0.5);

    let currentWord = 0;

    const playWord = () => {
      this.currentWord = new Audio(`./assets/sounds/${this.currentWords[currentWord]}.mp3`);
      this.currentWord.load();
      this.currentWord.play();
    };

    playWord();

    currentCards.forEach((card) => {
      card.addEventListener('click', () => {
        if (card.getAttribute('data-name') === this.currentWords[currentWord]) {
          this.wordsUsed.push(this.currentWords[currentWord]);
          statistics.countingStatistics(this.currentWords[currentWord], 'correct');
          this.correctAnswer.play();
          card.style.filter = 'blur(5px)';

          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star-win.svg';
          this.boxStars.appendChild(winStars);

          const activeCard = document.querySelector(`.card-word:nth-child(${+card.getAttribute('data-number') + 1})`);
          activeCard.classList.remove('active-card');

          currentWord += 1;
          if (currentWord < this.currentWords.length) {
            setTimeout(playWord, 500);
          } else {
            setTimeout(() => {
              this.finishGame();
            }, 1000);
          }
        } else if (!this.wordsUsed.includes(card.getAttribute('data-name'))) {
          statistics.countingStatistics(this.currentWords[currentWord], 'wrong');
          this.mistakes += 1;
          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star.svg';
          this.boxStars.appendChild(winStars);

          this.wrongAnswer.play();
        }
      });
    });
  },

  finishGame() {
    gameField.removeContent();

    let span;
    let src;
    if (this.mistakes === 0) {
      span = 'Congratulations! You win!';
      src = './assets/icons/success.svg';
      this.soundWin.play();
    } else {
      span = `You lost(: Train and try again!</br>
        You made ${this.mistakes} mistake(s).`;
      src = './assets/icons/failure.svg';
      this.soundLose.play();
    }
    const container = document.querySelector('.container');
    const finishScreen = `<span class="win-title">${span}</span>
    <div class="win-image"><img src="${src}"></div>`;
    container.innerHTML += finishScreen;

    const buttonsFinish = document.createElement('div');
    buttonsFinish.classList.add('buttons-finish');
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game');
    newGameButton.innerText = 'New game';
    const mainMenuButton = document.createElement('button');
    mainMenuButton.classList.add('main-menu');
    mainMenuButton.innerText = 'Main menu';
    buttonsFinish.appendChild(newGameButton);
    buttonsFinish.appendChild(mainMenuButton);

    newGameButton.addEventListener('click', () => {
      if (this.repeatMode) {
        statistics.repeatDifficultWords();
      } else {
        gameField.setContentCards(gameField.activeCard);
      }
    });

    mainMenuButton.addEventListener('click', () => {
      this.repeatMode = false;
      gameField.setTitleCards();

      document.querySelector('.navigation-item.active').classList.remove('active');
      document.querySelector('.navigation-item:first-child').classList.add('active');
    });

    container.appendChild(buttonsFinish);
    this.mistakes = 0;
  },
};

export default playGame;
