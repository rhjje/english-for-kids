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
        this.toggle.style.transform = 'translateX(80px)';
        this.toggleOff = false;
        playGame.makeVisibleButton();
        // playGame.button.classList.remove('disabled');

        for (const card of cards) {
          card.style.height = '200px';
        }
      } else {
        this.toggle.style.transform = 'translateX(0)';
        this.toggleOff = true;
        playGame.button.classList.add('disabled');
        for (const card of cards) {
          card.style.height = '280px';
        }
      }
    });
  }
};

toggler.init();

// use this script together with _switch.scss