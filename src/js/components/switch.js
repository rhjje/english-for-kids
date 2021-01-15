export default class Switcher {
  static render() {
    const element = `<div class="switch-container">
      <div class="train-mode active-mode">Train</div>
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <div class="game-mode">Play</div>
    </div>`;
    return element;
  }
}
