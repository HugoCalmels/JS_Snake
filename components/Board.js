const wrapper = document.querySelector('#container')
let snake = document.querySelector('.snake')

export default class Board {
  constructor(boardElem) {
    this.boardElem = boardElem;
    this.width = 0;
    this.topWall = 40;
    this.menu = menu;
  }
  get CSS_WIDTH_VARIABLE() {
    return getComputedStyle(this.boardElem).getPropertyValue('--width')
  }
  set CSS_WIDTH_VARIABLE(value) {
    this.boardElem.style.setProperty('--width', value)
  }

  devTools() {
    // creer BEAUCOUP de div pour chaque case a jour selon la width de l'utilisateur 
    // PAS UTILISE, mais possiblement ré-utilisable ailleurs
    this.CSS_WIDTH_VARIABLE = this.width
    let boardCells_ARRAY = document.querySelectorAll('.board-cell')
    boardCells_ARRAY.forEach((e) => {
      e.remove()
    })
    let boardCell
    for (let i = 0; i <(40*this.width-1); i++) {
      boardCell = document.createElement("div");
      boardCell.className+=`board-cell id-${i}`

      this.boardElem.appendChild(boardCell)
    }
  }

  update() {
    // recuper la width de lecran en fonction du nombre de vh
    console.log('BOARD START UPDATE')
    let windowWidth = wrapper.offsetWidth
    let windowHeight = wrapper.offsetHeight
    let VH_UNIT = windowHeight / 100
    for (let i = 0; i < windowWidth; i += VH_UNIT*2) {
      if ((this.width%3) === 0 && (this.width%2) === 0 && i >= (windowWidth * .8)) {
        this.boardElem.style.width = `${i / 1.5}px`
        this.menu.style.width = `${i / 3}px`
        console.log('--------------')
        console.log(this.width/3)
        
        console.log('--------------')
        this.rightWall = this.width/1.5
        snake.style.setProperty('--y', this.width/4)
        return this.width
      }
      this.width += 1
    }
    console.log('BOARD END UPDATE')
  }
}