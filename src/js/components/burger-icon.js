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
      if (this.buttonOff) {
        firstLIne.style.transform = 'translateY(13px) rotate(45deg)';
        secondLine.style.transform = 'translateX(-40px)';
        thirdLine.style.transform = 'translateY(-13px) rotate(-45deg)';

        // movement burger-menu
        document.querySelector('.burger-menu').style.transform = 'translateX(0)';
        document.querySelector('.modal').classList.remove('modal-disabled');
        this.buttonOff = false;
      } else {
        firstLIne.style.transform = 'translateY(0) rotate(0)';
        secondLine.style.transform = 'translateX(0)';
        thirdLine.style.transform = 'translateY(0) rotate(0)';

        // movement burger-menu
        document.querySelector('.burger-menu').style.transform = 'translateX(-320px)';
        document.querySelector('.modal').classList.add('modal-disabled');
        this.buttonOff = true;
      }
    });

    document.querySelector('.header .wrapper').prepend(this.burgerBox);
  },
};

burgerIcon.init();

export default burgerIcon;
