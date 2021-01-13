export default class TitleCard {
  constructor(image, title, number) {
    this.image = image;
    this.title = title;
    this.number = number;
  }

  render() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-number', `${this.number}`);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card__image');

    const img = document.createElement('img');
    img.src = `${this.image}`;
    cardImage.appendChild(img);

    const cardName = document.createElement('span');
    cardName.classList.add('card__name');
    cardName.innerText = `${this.title}`;

    card.appendChild(cardImage);
    card.appendChild(cardName);

    return card;
  }
}
