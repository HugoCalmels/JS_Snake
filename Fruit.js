
export default class Fruit {
  constructor(boardWidth) {
    this.boardWidth = boardWidth
    this.board = document.querySelector('#board');
    this.newFruit()
    this.fruitElem = document.querySelector('.fruit');
    this.firstMove() 
  }

  get x() {
    return parseFloat(getComputedStyle(this.fruitElem).getPropertyValue('--x-fruit'))
  }
  get y() {
    return parseFloat(getComputedStyle(this.fruitElem).getPropertyValue('--y-fruit'))
  }

  set x(value) {
    return this.fruitElem.style.setProperty('--x-fruit', value);
  }
  set y(value) {
    return this.fruitElem.style.setProperty('--y-fruit', value);
  }

  newFruit() {
    let newFruit = document.createElement('div')
    newFruit.className += `fruit`
    let fruitTail = document.createElement('div')
    fruitTail.className += `fruit-tail`
    newFruit.append(fruitTail)
    this.board.appendChild(newFruit)
  }

  firstMove() {
    this.x = Math.floor(Math.random() * 40);
    this.y = Math.floor(Math.random() * this.boardWidth/1.5);
  }

  moveToRandomPosition(bodies) {
    // think I made it impossible to spawn a fruit inside the snake body
    let X_RANDOM_ATTEMP = Math.floor(Math.random() * 40);
    let Y_RANDOM_ATTEMP = Math.floor(Math.random() * this.boardWidth / 1.5);
    bodies.forEach((body) => {
      while (body.x === X_RANDOM_ATTEMP || body.y === Y_RANDOM_ATTEMP) {
        X_RANDOM_ATTEMP = Math.floor(Math.random() * 40);
        Y_RANDOM_ATTEMP = Math.floor(Math.random() * this.boardWidth / 1.5);
      }
    })
    this.x = X_RANDOM_ATTEMP
    this.y = Y_RANDOM_ATTEMP
  }

}