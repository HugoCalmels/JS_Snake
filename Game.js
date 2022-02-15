export default class Game {
  constructor() {
    document.addEventListener('keydown', e => this.show(e.key), true);
  }

  show(keydown) {
    console.log(keydown);
  }



}