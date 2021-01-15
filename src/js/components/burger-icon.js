const modalWindow = document.querySelector('.modal');
const navigationItems = document.querySelectorAll('.navigation-item');

const burgerIcon = {
  burgerBox: null,
  buttonOff: true,

  init() {
    this.burgerBox = document.createElement('div');
    this.burgerBox.className = 'burger-menu__button';

    const firstLIne = document.createElement('div');
    firstLIne.className = 'first-line';
    const secondLine = document.createElement('div');
    secondLine.className = 'second-line';
    const thirdLine = document.createElement('div');
    thirdLine.className = 'third-line';

    this.burgerBox.appendChild(firstLIne);
    this.burgerBox.appendChild(secondLine);
    this.burgerBox.appendChild(thirdLine);

    this.burgerBox.addEventListener('click', () => {
      navigationItems.forEach((item) => {
        item.classList.toggle('navigation-item_open');
      });
      document.querySelector('.burger-menu').classList.toggle('burger-menu_open');
      if (this.buttonOff) {
        firstLIne.style.transform = 'translateY(13px) rotate(45deg)';
        secondLine.style.transform = 'translateX(-40px)';
        thirdLine.style.transform = 'translateY(-13px) rotate(-45deg)';

        modalWindow.classList.remove('modal-disabled');
        this.buttonOff = false;
      } else {
        firstLIne.style.transform = 'translateY(0) rotate(0)';
        secondLine.style.transform = 'translateX(0)';
        thirdLine.style.transform = 'translateY(0) rotate(0)';

        modalWindow.classList.add('modal-disabled');
        this.buttonOff = true;
      }
    });

    document.querySelector('.header .wrapper').prepend(this.burgerBox);
  },
};

burgerIcon.init();

modalWindow.addEventListener('click', () => {
  burgerIcon.burgerBox.click();
});

export default burgerIcon;
