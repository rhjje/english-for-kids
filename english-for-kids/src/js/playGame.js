const playGame = {
  button: null,
  boxStars: null,
  currentWords: {},
  rating: [],
  correctAnswer: null,
  wrongAnswer: null,
  soundWin: null,
  soundLose: null,

  init() {
    //create button play
    this.button = document.createElement('div');
    this.button.classList.add('button-play', 'disabled');
    const title = document.createElement('span');
    title.innerText = 'PLAY';
    this.button.append(title);

    // create box stars
    this.boxStars = document.createElement('div');
    this.boxStars.className = 'box-stars';

    // add diffents sounds
    this.correctAnswer = document.createElement('audio');
    const sourceCorrect = document.createElement('source');
    sourceCorrect.src = `../src/assets/sounds/correct.mp3`;
    this.correctAnswer.append(sourceCorrect);

    this.wrongAnswer = document.createElement('audio');
    const sourceWrong = document.createElement('source');
    sourceWrong.src = `../src/assets/sounds/error.mp3`;
    this.wrongAnswer.append(sourceWrong);

    this.soundWin = document.createElement('audio');
    const sourceWin = document.createElement('source');
    sourceWin.src = `../src/assets/sounds/success.mp3`;
    this.soundWin.append(sourceWin);

    this.soundLose = document.createElement('audio');
    const sourceLose = document.createElement('source');
    sourceLose.src = `../src/assets/sounds/failure.mp3`;
    this.soundLose.append(sourceLose);

    // add button and stars box to document
    document.querySelector('.container').appendChild(this.button);
    document.querySelector('.container').appendChild(this.boxStars);

    this.button.addEventListener('click', () => {
      this.currentWords = [];
      this.play();
    });
  },

  setPlayingWords() {
    const words = document.querySelectorAll('.card-word__front-name');
    for (let i = 0; i < 8; i += 1) {
      this.currentWords[i] = words[i].innerText;
    }
  },

  play() {
    this.setPlayingWords();
    const orderWords = [...Array(8).keys()].sort(() => Math.random() - 0.5);

    let count = 0;
    let mistakes = 0;

    const playWord = () => {
      const audio = document.createElement('audio');
      const source = document.createElement('source');
      source.src = `assets/sounds/${this.currentWords[orderWords[count]]}.mp3`;
      audio.append(source);
      audio.play();
    }
    // add event listener cards of word
    const cards = document.querySelectorAll('.card-word__front');

    for (const card of cards) {
      card.addEventListener('click', () => {
        if (+card.getAttribute('data-number') === orderWords[count]) {
          const winStars = document.createElement('img');
          winStars.src = 'assets/icons/star-win.svg';
          this.boxStars.appendChild(winStars);

          this.correctAnswer.play();
          card.style.filter = 'blur(5px)';
          count += 1;

          if (count < 8) {
            setTimeout(() => {
              return playWord();
            }, 500);
          }

          // set local storage
          const currentCard = card.getAttribute('data-name');
          let currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));
          currentWord.correct += 1;
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);

          // check win or lose
          if (count === 8 && mistakes === 0) {
            setTimeout(() => {
              const cards = document.querySelector('.container .wrapper');
              while (cards.firstChild) {
                cards.removeChild(cards.firstChild);
              }
              this.button.classList.add('disabled');

              // add final title and picture
              const winScreen = document.createElement('div');
              winScreen.className = 'win-image';
              const span = document.createElement('span');
              span.className = 'win-title';
              span.innerText = 'Congratulations. You won!';
              const img = document.createElement('img');
              const arrImgs = ['mask.jpg', 'stark.jpg', 'stark2.jpg', 'youDidIt.png'];
              arrImgs.sort(() => Math.random() - 0.5);
              img.src = `assets/images/endGame/${arrImgs[0]}`;

              winScreen.append(img);
              cards.appendChild(span);
              cards.appendChild(winScreen);
              this.soundWin.play();
            }, 500);

            this.clearFinalScreen();

          } else if (count === 8) {
            setTimeout(() => {
              const cards = document.querySelector('.container .wrapper');
              while (cards.firstChild) {
                cards.removeChild(cards.firstChild);
              }
              this.button.classList.add('disabled');

              // add final title and picture
              const winScreen = document.createElement('div');
              winScreen.className = 'win-image';
              const span = document.createElement('span');
              span.className = 'win-title';
              span.innerText = 'Sorry. You lost(: Train and try again!';
              const img = document.createElement('img');
              const arrImgs = ['lose1', 'lose2', 'lose3', 'lose4', 'lose5'];
              arrImgs.sort(() => Math.random() - 0.5);
              img.src = `assets/images/endGame/${arrImgs[0]}.jpg`;

              winScreen.append(img);
              cards.appendChild(span);
              cards.appendChild(winScreen);

              this.soundLose.play();
            }, 500);

            this.clearFinalScreen();
          }

        } else {
          // set local storage
          const currentCard = this.currentWords[orderWords[count]];
          let currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));
          currentWord.wrong += 1;
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);

          const winStars = document.createElement('img');
          winStars.src = 'assets/icons/star.svg';
          this.boxStars.appendChild(winStars);
          this.wrongAnswer.play();
          mistakes += 1;
        }
      });
    }

    playWord();
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
  }
};

playGame.init();

// playGame.init();