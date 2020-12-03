const statistics = {
  setLocalStorage() {
    const request = new XMLHttpRequest();
    request.open('GET', 'cards.json');
    request.send();

    const words = [];

    request.onload = () => {
      const cardsContent = JSON.parse(request.response);
      for (const arr of cardsContent) {
        for (const card of arr) {
          words.push(card);
        }
      }

      for (const item of words) {

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
      }
    };
  },

  countClicks() {
    const cards = document.querySelectorAll('.card-word__front');
    for (const card of cards) {
      card.addEventListener('click', () => {
        const currentCard = card.getAttribute('data-name');
        let currentWord = JSON.parse(localStorage.getItem(`${currentCard}`));

        if (toggler.toggleOff) {
          currentWord.clicks += 1;
          localStorage.setItem(`${currentCard}`, `${JSON.stringify(currentWord)}`);
        }
        
      });
    }
  }
};

statistics.setLocalStorage();