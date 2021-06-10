/* eslint-disable no-param-reassign */
import Card from './components/card';
// import Switcher from './components/switch';
// import playGame from './play-game';
import cards from '../../assets/json/cards.json';

export default class GameField {
  constructor() {
    this.container = document.querySelector('.container');

    this.correctAnswer = new Audio('./assets/sounds/correct.mp3');
    this.wrongAnswer = new Audio('./assets/sounds/error.mp3');
    this.soundWin = new Audio('./assets/sounds/success.mp3');
    this.soundLose = new Audio('./assets/sounds/failure.mp3');

    this.repeat = false;
    this.currentWords = [];
    this.wordsUsed = [];
    this.mistakes = 0;
  }

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
          // statistics.countingStatistics(this.currentWords[currentWord], 'correct');
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
          // statistics.countingStatistics(this.currentWords[currentWord], 'wrong');
          this.mistakes += 1;
          const winStars = document.createElement('img');
          winStars.src = './assets/icons/star.svg';
          this.boxStars.appendChild(winStars);

          this.wrongAnswer.play();
        }
      });
    });
  }

  finishGame() {
    this.container.innerHTML = '';

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
      this.init(this.activeCard);
    });

    mainMenuButton.addEventListener('click', () => {
      // this.repeatMode = false;
      // gameField.setTitleCards();

      // document.querySelector('.navigation-item.active').classList.remove('active');
      // document.querySelector('.navigation-item:first-child').classList.add('active');
    });

    container.appendChild(buttonsFinish);
    this.mistakes = 0;
  }

  init(activeCard) {
    this.container.innerHTML = '';
    this.activeCard = activeCard;
    // playGame.repeatMode = false;
    const container = document.createElement('div');
    container.classList.add('wrapper');
    container.innerHTML += `<div class="switch-container">
      <div class="train-mode active-mode">Train</div>
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <div class="game-mode">Play</div>
    </div>`;
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

    const input = document.querySelector('input[type=checkbox]');
    input.addEventListener('change', () => {
      document.querySelector('.train-mode').classList.toggle('active-mode');
      document.querySelector('.game-mode').classList.toggle('active-mode');
      const cards = document.querySelectorAll('.card-word__front-image');
      if (input.checked) {
        cards.forEach((card) => {
          card.style.height = '260px';
        });
        this.startGameButton = document.createElement('button');
        this.startGameButton.classList.add('button-play');
        this.startGameButton.innerText = 'Start game';

        this.boxStars = document.createElement('div');
        this.boxStars.classList.add('box-stars');

        this.startGameButton.addEventListener('click', () => {
          if (this.repeat) {
            this.currentWord.play();
          } else {
            this.startGameButton.classList.add('repeat');
            this.repeat = true;
            this.play();
          }
        });
        container.append(this.startGameButton, this.boxStars);
        // playGame.init();
      } else {
        cards.forEach((card) => {
          card.style.height = '200px';
        });
        this.startGameButton.remove();
        this.boxStars.remove();
        // document.querySelector('.container .wrapper').removeChild(document.querySelector('.button-play'));
        // document.querySelector('.container .wrapper').removeChild(document.querySelector('.box-stars'));
      }
    });
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
