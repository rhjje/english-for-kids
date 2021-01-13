/* eslint-disable no-param-reassign */
const playGame = {
  startGameButton: null,
  boxStars: null,
  currentWords: [],
  rating: [],
  correctAnswer: null,
  wrongAnswer: null,
  soundWin: null,
  soundLose: null,
  repeat: false,
  currentWord: null,
  currentSound: null,
  mistakes: 0,
  attributeCards: [],

  init() {
    this.startGameButton = document.createElement('div');
    this.startGameButton.classList.add('button-play');
    const title = document.createElement('span');
    title.innerText = 'Start game';
    this.startGameButton.appendChild(title);

    this.boxStars = document.createElement('div');
    this.boxStars.classList.add('box-stars');

    this.correctAnswer = new Audio('./assets/sounds/correct.mp3');
    this.wrongAnswer = new Audio('./assets/sounds/error.mp3');
    this.soundWin = new Audio('./assets/sounds/success.mp3');
    this.soundLose = new Audio('./assets/sounds/failure.mp3');

    document.querySelector('.container').appendChild(this.startGameButton);
    document.querySelector('.container').appendChild(this.boxStars);

    this.startGameButton.addEventListener('click', () => {
      if (this.repeat) {
        this.currentWord.play();
      } else {
        this.startGameButton.classList.add('repeat');
        document.querySelector('.button-play > span').innerText = '';
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
          this.correctAnswer.play();
          card.style.filter = 'blur(5px)';

          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star-win.svg';
          this.boxStars.appendChild(winStars);

          currentWord += 1;
          if (currentWord < 8) {
            setTimeout(playWord, 500);
          } else {
            setTimeout(() => {
              this.finishGame();
            }, 1000);
          }
        } else {
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
    const currentCards = document.querySelector('.container .wrapper');
    while (currentCards.firstChild) {
      currentCards.removeChild(currentCards.firstChild);
    }

    document.querySelector('.button-play > span').innerText = 'Start game';
    this.repeat = false;
    this.startGameButton.classList.remove('repeat');
    this.startGameButton.classList.add('disabled');

    const winScreen = document.createElement('div');
    winScreen.classList.add('win-image');
    const span = document.createElement('span');
    span.classList.add('win-title');
    const img = document.createElement('img');

    if (this.mistakes === 0) {
      span.innerText = 'Congratulations! You win!';
      img.src = './assets/icons/success.svg';
      this.soundWin.play();
    } else {
      span.innerHTML = `You lost(: Train and try again!</br>
        You made ${this.mistakes} mistake(s).`;
      img.src = './assets/icons/failure.svg';
      this.soundLose.play();
    }

    winScreen.append(img);
    currentCards.appendChild(span);
    currentCards.appendChild(winScreen);
  },
};

export default playGame;
