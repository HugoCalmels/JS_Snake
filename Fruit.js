let board = document.querySelector('#board');
let fruit = document.querySelector('.fruit')

export default class Fruit {
  constructor(boardWidth) {
    this.boardWidth = boardWidth
    this.board = document.querySelector('#board');
    this.newFruit()
    this.fruitElem = document.querySelector('.fruit');
    this.moveToRandomPosition()
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
    console.log('====INITIALIZE FRUIT START====')

    let newFruit = document.createElement('div')
    newFruit.className += `fruit`
    this.board.appendChild(newFruit)
    

    console.log('====INITIALIZE FRUIT END====')
  }

  moveToRandomPosition() {
    console.log('====GENERATING FRUIT START====')
    console.log(this.x)
    console.log(this.fruitElem)

    this.x = Math.floor(Math.random() * 40);
    this.y = Math.floor(Math.random() * this.boardWidth);
    console.log('====GENERATING FRUIT END====')
  }

  generate(width) {
    console.log('====GENERATING FRUIT START====')
    console.log(this.fruitElem)
    console.log(this.fruitElem)
      console.log('====GENERATING FRUIT END====')
  }



}