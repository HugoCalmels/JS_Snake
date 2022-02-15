const wrapper = document.querySelector('#container')
const VH_UNIT = window.innerHeight / 100; 
let snake = document.querySelector('.snake')


export default class Board {
  constructor(boardElem) {
    this.boardElem = boardElem;
    this.width = 0;
    this.rightWall = 0;
    this.leftWall = 0;
    this.topWall = 40;
    this.bottomWall = 0;
  }

  show() {
    console.log(this.boardElem)
  }

  get CSS_WIDTH_VARIABLE() {
    return getComputedStyle(this.boardElem).getPropertyValue('--width')
  }

  set CSS_WIDTH_VARIABLE(value) {
    this.boardElem.style.setProperty('--width', value)
  }



  

  devTools() {
    console.log('======DEV TOOLS=====')
    console.log(this.width)

    this.CSS_WIDTH_VARIABLE = this.width
    
    let boardCells_ARRAY = document.querySelectorAll('.board-cell')
    boardCells_ARRAY.forEach((e) => {
      e.remove()
    })

    // calculer la diff, ca fait trop lag de tout péter et reconstruire, en plus le resize est gourmand

    let boardCell
    for (let i = 0; i <(40*this.width-1); i++) {
      boardCell = document.createElement("div");
      boardCell.className+=`board-cell id-${i}`

      this.boardElem.appendChild(boardCell)
    }
    console.log('======END DEV TOOLS=====')
  }

  update() {
    console.log('BOARD START UPDATE')
    let windowWidth = wrapper.offsetWidth
    let windowHeight = wrapper.offsetHeight
    let VH_UNIT = windowHeight / 100
    for (let i = 0; i < windowWidth; i += VH_UNIT*2) {
      if ((this.width%2) === 0 && i >= (windowWidth * .8)) {
        this.boardElem.style.width = `${i}px`
        console.log(this.width)
        this.rightWall = this.width;
        snake.style.setProperty('--y', this.width/2)
        return this.width
      }
      this.width += 1
    }
    console.log('BOARD END UPDATE')
  }
}