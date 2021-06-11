import router from './router';

const hamburgerMenu = () => {
  const menu = document.querySelector('.burger-menu');
  const button = document.querySelector('.burger-menu__button');
  const links = document.querySelectorAll('.navigation-item');
  const bg = document.querySelector('.burger-menu-bg');
  const title = document.querySelector('.title');

  button.addEventListener('click', () => {
    button.classList.toggle('burger-menu__button_active');
    menu.classList.toggle('burger-menu_open');
    bg.classList.toggle('burger-menu-bg_disabled');
  });

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      button.click();
      const activeLink = document.querySelector('.navigation-item_active');
      activeLink.classList.remove('navigation-item_active');
      link.classList.add('navigation-item_active');
      router.changeRoute(event.target.getAttribute('href'));
    });
  });

  bg.addEventListener('click', () => {
    button.click();
  });

  title.addEventListener('click', () => {
    router.changeRoute();
  });
};

export default hamburgerMenu;
