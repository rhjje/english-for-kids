import './game-field';
import './statistics';
import './components/switch';
import './components/burger-icon';
import './burger-menu';

document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/json/cards.json')
    .then((result) => result.json())
    .then((result) => {
      const images = result.flat().map((item) => item.image);

      function preloadImages(arr) {
        for (let i = 0; i < arr.length; i += 1) {
          const image = new Image();
          image.src = `./${arr[i]}`;
        }
      }
      preloadImages(images);
    });
});
