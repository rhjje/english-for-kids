export default class TitleCard {
  constructor(image, title, number) {
    this.image = image;
    this.title = title;
    this.number = number;
  }

  render() {
    const card = `<div class="card" data-number="${this.number}">
      <div class="card__image"><img src="${this.image}"></div>
      <span class="card__name">${this.title}</span>
    </div>`;

    return card;
  }
}
