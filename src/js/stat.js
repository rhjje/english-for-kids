const statistics = {
  buttons: null,
  repeatButton: null,
  resetButton: null,
  table: null,
  words: [],
  tableContent: null,

  directWordOrder: true,
  directTranslationOrder: null,
  directCategoriesOrder: null,
  directClicksOrder: null,
  directCorrectOrder: null,
  directWrongOrder: null,
  directPercentOrder: null,

  setStatistics() {
    const container = document.querySelector('.container .wrapper');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const statContainer = document.createElement('div');
    statContainer.className = 'stat-container';

    // create buttons to repeat difficult words
    this.buttons = document.createElement('div');
    this.buttons.className = 'panel-buttons';

    this.repeatButton = document.createElement('div');
    this.repeatButton.className = 'repeat-button';
    const spanRepeat = document.createElement('span');
    spanRepeat.innerText = 'Repeat difficult words';
    this.repeatButton.append(spanRepeat);

    this.resetButton = document.createElement('div');
    this.resetButton.className = 'reset-button';
    const spanReset = document.createElement('span');
    spanReset.innerText = 'Reset';
    this.resetButton.append(spanReset);
    // reset.addEventListener('click', this.resetLocalStorage);

    this.buttons.appendChild(this.repeatButton);
    this.buttons.appendChild(this.resetButton);

    // create table
    this.table = document.createElement('div');
    this.table.className = 'table';

    // add elements to page
    statContainer.appendChild(this.buttons);
    statContainer.appendChild(this.table);
    container.appendChild(statContainer);

    this.resetButton.addEventListener('click', () => {
      this.resetLocalStorage();
    });

    this.repeatButton.addEventListener('click', () => {
      this.repeatWords();
    });

    const tableHead = document.createElement('div');
    tableHead.className = 'table-head';
    const tableHeadTitle = ['&darr; Word', 'Translation', 'Category', 'Clicks', 'Correct', 'Wrong', '% errors'];
    for (let i = 0; i < tableHeadTitle.length; i += 1) {
      const span = document.createElement('span');
      span.innerHTML = `${tableHeadTitle[i]}`;
      span.addEventListener('click', () => {
        if (span.innerText[0] === '↑' || span.innerText[0] === '↓') {
          this.sortColumn(span.innerText.slice(2));
        } else {
          this.sortColumn(span.innerText);
        }
      });
      tableHead.appendChild(span);
    }
    this.table.appendChild(tableHead);

    const request = new XMLHttpRequest();
    request.open('GET', './assets/json/cards.json');
    request.send();

    this.words = [];

    request.onload = () => {
      const cardsContent = JSON.parse(request.response);
      cardsContent.forEach((arr) => {
        arr.forEach((card) => {
          this.words.push(card.word);
        });
      });
      this.buildTable(this.words);
    };
  },

  buildTable() {
    this.words.sort();

    this.tableContent = [];
    for (let i = 0; i < this.words.length; i += 1) {
      const currentWord = JSON.parse(localStorage.getItem(`${this.words[i]}`));
      const obj = {
        word: currentWord.word,
        translation: currentWord.translation,
        category: currentWord.category,
        clicks: currentWord.clicks,
        correct: currentWord.correct,
        wrong: currentWord.wrong,
        percent: currentWord.percent,
      };
      this.tableContent.push(obj);
    }
    this.setTableContent();
  },

  setTableContent() {
    const contentPart = document.createElement('div');
    contentPart.className = 'content-part';

    const columnWord = document.createElement('div');
    const columnTranslation = document.createElement('div');
    const columnCategory = document.createElement('div');
    const columnClicks = document.createElement('div');
    const columnCorrect = document.createElement('div');
    const columnWrong = document.createElement('div');
    const columnPercent = document.createElement('div');

    contentPart.appendChild(columnWord);
    contentPart.appendChild(columnTranslation);
    contentPart.appendChild(columnCategory);
    contentPart.appendChild(columnClicks);
    contentPart.appendChild(columnCorrect);
    contentPart.appendChild(columnWrong);
    contentPart.appendChild(columnPercent);

    this.table.appendChild(contentPart);

    for (let i = 0; i < this.tableContent.length; i += 1) {
      const divWord = document.createElement('div');
      divWord.className = 'word';
      divWord.innerText = `${this.tableContent[i].word}`;

      const divTranslation = document.createElement('div');
      divTranslation.className = 'translation';
      divTranslation.innerText = `${this.tableContent[i].translation}`;

      const divCategory = document.createElement('div');
      divCategory.setAttribute('data-word', `${this.tableContent[i].word}`);
      divCategory.className = 'category';
      divCategory.innerText = `${this.tableContent[i].category}`;

      const divClicks = document.createElement('div');
      divClicks.className = 'clicks';
      divClicks.innerText = `${this.tableContent[i].clicks}`;

      const divCorrect = document.createElement('div');
      divCorrect.className = 'correct';
      divCorrect.innerText = `${this.tableContent[i].correct}`;

      const divWrong = document.createElement('div');
      divWrong.className = 'wrong';
      divWrong.innerText = `${this.tableContent[i].wrong}`;

      const divPercent = document.createElement('div');
      divPercent.className = 'percent';
      divPercent.innerText = `${+this.tableContent[i].percent.toFixed(1)}`;

      columnWord.appendChild(divWord);
      columnTranslation.appendChild(divTranslation);
      columnCategory.appendChild(divCategory);
      columnClicks.appendChild(divClicks);
      columnCorrect.appendChild(divCorrect);
      columnWrong.appendChild(divWrong);
      columnPercent.appendChild(divPercent);
    }
  },

  sortColumn(title) {
    const tableHeadTitle = ['Word', 'Translation', 'Category', 'Clicks', 'Correct', 'Wrong', '% errors'];
    const titles = document.querySelectorAll('.table-head > span');
    for (let i = 0; i < tableHeadTitle.length; i += 1) {
      if (tableHeadTitle[i] !== title) {
        titles[i].innerText = tableHeadTitle[i];
      }
    }

    const compareItems = [];
    if (title === 'Word') {
      const words = document.querySelectorAll('.word');
      words.forEach((word) => {
        compareItems.push(word.innerText);
      });
      compareItems.sort();
      if (this.directWordOrder) {
        titles[0].innerHTML = '&uarr; Word';
        compareItems.reverse();
        this.directWordOrder = false;
      } else {
        titles[0].innerHTML = '&darr; Word';
        this.directWordOrder = true;
      }
      const temp = [];
      for (let i = 0; i < compareItems.length; i += 1) {
        for (let j = 0; j < this.tableContent.length; j += 1) {
          if (this.tableContent[j].word === compareItems[i]) {
            temp.push(this.tableContent[j]);
          }
        }
      }
      this.tableContent = Array.from(new Set(temp));
    }

    if (title === 'Translation') {
      const translations = document.querySelectorAll('.translation');
      translations.forEach((translation) => {
        compareItems.push(translation.innerText);
      });
      compareItems.sort();
      if (this.directTranslationOrder) {
        titles[1].innerHTML = '&uarr; Translation';
        compareItems.reverse();
        this.directTranslationOrder = false;
      } else {
        titles[1].innerHTML = '&darr; Translation';
        this.directTranslationOrder = true;
      }
      const temp = [];
      for (let i = 0; i < compareItems.length; i += 1) {
        for (let j = 0; j < this.tableContent.length; j += 1) {
          if (this.tableContent[j].translation === compareItems[i]) {
            temp.push(this.tableContent[j]);
          }
        }
      }
      this.tableContent = Array.from(new Set(temp));
    }

    if (title === 'Category') {
      if (this.directCategoriesOrder) {
        titles[2].innerHTML = '&uarr; Category';
        this.tableContent.sort((a, b) => {
          if (a.category > b.category) {
            return -1;
          }
          if (a.category < b.category) {
            return 1;
          }
          return 0;
        });
        this.directCategoriesOrder = false;
      } else {
        titles[2].innerHTML = '&darr; Category';
        this.tableContent.sort((a, b) => {
          if (a.category > b.category) {
            return 1;
          }
          if (a.category < b.category) {
            return -1;
          }
          return 0;
        });
        this.directCategoriesOrder = true;
      }
    }

    if (title === 'Clicks') {
      if (this.directClicksOrder) {
        titles[3].innerHTML = '&uarr; Clicks';
        this.tableContent.sort((a, b) => {
          if (a.clicks > b.clicks) {
            return 1;
          }
          if (a.clicks < b.clicks) {
            return -1;
          }
          return 0;
        });
        this.directClicksOrder = false;
      } else {
        titles[3].innerHTML = '&darr; Clicks';
        this.tableContent.sort((a, b) => {
          if (a.clicks > b.clicks) {
            return -1;
          }
          if (a.clicks < b.clicks) {
            return 1;
          }
          return 0;
        });
        this.directClicksOrder = true;
      }
    }

    if (title === 'Correct') {
      if (this.directCorrectOrder) {
        titles[4].innerHTML = '&uarr; Correct';
        this.tableContent.sort((a, b) => {
          if (a.correct > b.correct) {
            return 1;
          }
          if (a.correct < b.correct) {
            return -1;
          }
          return 0;
        });
        this.directCorrectOrder = false;
      } else {
        titles[4].innerHTML = '&darr; Correct';
        this.tableContent.sort((a, b) => {
          if (a.correct > b.correct) {
            return -1;
          }
          if (a.correct < b.correct) {
            return 1;
          }
          return 0;
        });
        this.directCorrectOrder = true;
      }
    }

    if (title === 'Wrong') {
      if (this.directWrongOrder) {
        titles[5].innerHTML = '&uarr; Wrong';
        this.tableContent.sort((a, b) => {
          if (a.wrong > b.wrong) {
            return 1;
          }
          if (a.wrong < b.wrong) {
            return -1;
          }
          return 0;
        });
        this.directWrongOrder = false;
      } else {
        titles[5].innerHTML = '&darr; Wrong';
        this.tableContent.sort((a, b) => {
          if (a.wrong > b.wrong) {
            return -1;
          }
          if (a.wrong < b.wrong) {
            return 1;
          }
          return 0;
        });
        this.directWrongOrder = true;
      }
    }

    if (title === '% errors') {
      if (this.directPercentOrder) {
        titles[6].innerHTML = '&uarr; % errors';
        this.tableContent.sort((a, b) => {
          if (a.percent > b.percent) {
            return 1;
          }
          if (a.percent < b.percent) {
            return -1;
          }
          return 0;
        });
        this.directPercentOrder = false;
      } else {
        titles[6].innerHTML = '&darr; % errors';
        this.tableContent.sort((a, b) => {
          if (a.percent > b.percent) {
            return -1;
          }
          if (a.percent < b.percent) {
            return 1;
          }
          return 0;
        });
        this.directPercentOrder = true;
      }
    }
    const contentPart = document.querySelector('.content-part');
    this.table.removeChild(contentPart);
    this.setTableContent();
  },

  resetLocalStorage() {
    const request = new XMLHttpRequest();
    request.open('GET', './assets/json/cards.json');
    request.send();

    const words = [];
    request.onload = () => {
      const cardsContent = JSON.parse(request.response);
      cardsContent.forEach((arr) => {
        arr.forEach((card) => {
          words.push(card.word);
        });
      });

      words.forEach((word) => {
        const currentWord = JSON.parse(localStorage.getItem(`${word}`));
        currentWord.clicks = 0;
        currentWord.correct = 0;
        currentWord.wrong = 0;
        currentWord.percent = 0;
        localStorage.setItem(`${word}`, `${JSON.stringify(currentWord)}`);
      });

      this.tableContent = [];
      for (let i = 0; i < this.words.length; i += 1) {
        const currentWord = JSON.parse(localStorage.getItem(`${this.words[i]}`));
        const obj = {
          word: currentWord.word,
          translation: currentWord.translation,
          category: currentWord.category,
          clicks: currentWord.clicks,
          correct: currentWord.correct,
          wrong: currentWord.wrong,
          percent: currentWord.percent,
        };
        this.tableContent.push(obj);
      }

      const contentPart = document.querySelector('.content-part');
      this.table.removeChild(contentPart);
      this.setTableContent();
    };
  },

  clearTable() {
    const content = this.table.querySelector('.content-part');
    this.table.removeChild(content);
    this.buildTable();
    this.setTableContent();
  },

  repeatWords() {
    const wrongWords = [];
    for (let i = 0; i < this.words.length; i += 1) {
      const currentWord = JSON.parse(localStorage.getItem(`${this.words[i]}`));
      if (currentWord.wrong > 0) {
        wrongWords.push(currentWord);
      }
    }

    wrongWords.sort((a, b) => {
      if (a.wrong > b.wrong) {
        return -1;
      }
      if (a.wrong < b.wrong) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < wrongWords.length; i += 1) {
      switch (wrongWords[i].category) {
        case 'Action (set A)':
          wrongWords[i].category = 'action-set-a';
          break;
        case 'Action (set B)':
          wrongWords[i].category = 'action-set-b';
          break;
        case 'Action (set C)':
          wrongWords[i].category = 'action-set-c';
          break;
        case 'Adjective':
          wrongWords[i].category = 'adjective';
          break;
        case 'Animal (set A)':
          wrongWords[i].category = 'animal-set-a';
          break;
        case 'Animal (set B)':
          wrongWords[i].category = 'animal-set-b';
          break;
        case 'Clothes':
          wrongWords[i].category = 'clothes';
          break;
        case 'Emotion':
          wrongWords[i].category = 'emotion';
          break;
        default:
          break;
      }
    }
    const currentCards = document.querySelector('.container .wrapper');
    while (currentCards.firstChild) {
      currentCards.removeChild(currentCards.firstChild);
    }
    const toggle = document.querySelector('.toggle').getAttribute('data-info');
    // console.log(wrongWords);
    for (let i = 0; i < wrongWords.length; i += 1) {
      // create card
      if (i < 8) {
        const card = document.createElement('div');
        card.className = 'card-word';
        if (toggle === 'off') {
          card.style.height = '280px';
        } else {
          card.style.height = '200px';
        }

        // create front side card
        const cardFront = document.createElement('div');
        cardFront.className = 'card-word__front';
        cardFront.setAttribute('data-number', `${i}`);
        cardFront.setAttribute('data-name', `${wrongWords[i].word}`);

        const cardFrontImage = document.createElement('div');
        cardFrontImage.className = 'card-word__front-image';
        const imgFront = document.createElement('img');
        imgFront.src = `./src/assets/images/${wrongWords[i].category}/${wrongWords[i].word}.jpg`;
        cardFrontImage.append(imgFront);

        const cardFrontName = document.createElement('span');
        cardFrontName.className = 'card-word__front-name';
        cardFrontName.innerText = `${wrongWords[i].word}`;

        // add event listener to card for voicing
        cardFront.addEventListener('click', (event) => {
          if (event.target.className !== 'reverse-button' && toggle === 'off') {
            const select = document.querySelector('.toggle').getAttribute('data-info');
            if (select === 'off') {
              this.toVoice(cardFront.getAttribute('data-number'));
            }
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
        img.src = `./src/assets/images/${wrongWords[i].category}/${wrongWords[i].word}.jpg`;
        cardBackImage.append(img);

        const cardBackName = document.createElement('span');
        cardBackName.className = 'card-word__back-name';
        cardBackName.innerText = `${wrongWords[i].translation}`;

        cardBack.appendChild(cardBackImage);
        cardBack.appendChild(cardBackName);

        // build card
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        currentCards.appendChild(card);
      }
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
    source.src = `./src/assets/sounds/${words[number].innerText}.mp3`;
    audio.append(source);
    audio.play();
  },
};

const links = document.querySelectorAll('.navigation-item');
links.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.getAttribute('data-number') === 'statistics') {
      statistics.setStatistics();
      document.querySelector('.button-play').classList.add('disabled');
    }
  });
});
