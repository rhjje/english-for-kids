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

        this.buttonOff = false;
      } else {
        this.firstLIne.style.transform = 'translateY(0) rotate(0)';
        this.secondLine.style.transform = 'translateX(0)';
        this.thirdLine.style.transform = 'translateY(0) rotate(0)';

        // movement burger-menu
        document.querySelector('.burger-menu').style.transform = 'translateX(-320px)';

        this.buttonOff = true;
      }
    });

    // add burger-icon to page
    document.querySelector('.header .wrapper').prepend(this.burgerBox);

    document.querySelector('.burger-menu')
  },
};

// add links to menu items
const links = document.querySelectorAll('.navigation-item');
for (const link of links) {
  link.addEventListener('click', () => {
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
  categories.isHeadPage = true;
  playGame.makeVisibleButton();
  categories.removeContent();
  categories.init();
});

burgerIcon.init();

// use this script together with _burger-menu-icon.scss