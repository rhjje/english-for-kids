const hamburgerMenu = () => {
  const menu = document.querySelector('.burger-menu');
  const button = document.querySelector('.burger-menu__button');
  const links = document.querySelectorAll('.navigation-item');
  const bg = document.querySelector('.burger-menu-bg');

  button.addEventListener('click', () => {
    button.classList.toggle('burger-menu__button_active');
    menu.classList.toggle('burger-menu_open');
    bg.classList.toggle('burger-menu-bg_disabled');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      button.click();
      const activeLink = document.querySelector('.navigation-item_active');
      activeLink.classList.remove('navigation-item_active');
      link.classList.add('navigation-item_active');
    });
  });

  bg.addEventListener('click', () => {
    button.click();
  });
};

export default hamburgerMenu;

// burgerIcon.init();

// modalWindow.addEventListener('click', () => {
//   burgerIcon.burgerBox.click();
// });

// import gameField from './game-field';
// import burgerIcon from './components/burger-icon';
// import statistics from './statistics';

// const links = document.querySelectorAll('.navigation-item');
// links.forEach((link) => {
//   link.addEventListener('click', () => {
//     burgerIcon.burgerBox.click();
//     document.querySelector('.navigation-item.active').classList.remove('active');
//     link.classList.add('active');

//     if (link.getAttribute('data-number') === 'main') {
//       gameField.setTitleCards();
//     } else if (link.getAttribute('data-number') === 'statistics') {
//       const stat = JSON.parse(localStorage.getItem('english-for-kids'));
//       const dataForTable = statistics.sortObject(stat);
//       statistics.buildingTable(dataForTable);
//       document.querySelector('th:nth-child(1)').innerHTML = '&darr; Word';
//     } else {
//       gameField.removeContent();
//       gameField.setContentCards(link.getAttribute('data-number'));
//     }
//   });
// });

// const title = document.querySelector('.title');
// title.addEventListener('click', () => {
//   gameField.setTitleCards();

//   document.querySelector('.navigation-item.active').classList.remove('active');
//   document.querySelector('.navigation-item:first-child').classList.add('active');
// });

// export default burgerIcon;