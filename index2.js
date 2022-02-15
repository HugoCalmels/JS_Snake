import Snake from './Snake.js'
import Board from './Board.js'

const board = new Board(document.querySelector('#board'))


let snakeDiv = document.querySelectorAll('.snake')[0]
let snake = new Snake(snakeDiv)
let btn = document.querySelector('#btn')
let alert = document.querySelector('#alert')

board.update()
board.devTools()
snake.generateFruit(board.width)

window.addEventListener('resize', () => {
  board.width = 0
  board.update()
  board.devTools()
})

var fps =2;
var now;
var then;
var interval = 1000/fps;
var delta;

function play(){

function draw(now) {
    if (!then) { then = now; }
    window.requestAnimationFrame(draw);
    delta = now - then;
  if (delta > interval) {
   
    then = now - (delta % interval);
    if (snake.status === "ongoing") {
      
      snake.update()
      snake.checkWalls(board.rightWall)
      snake.moved = false
    }

    
    
 
      //snake.move()
  
          
    }
}
  draw();
}




btn.addEventListener('click', () => {
  snake.reset(board.width)
  alert.style.opacity = 0
  play()
})


play()





// draw cells to check the snake placement




/*
window.addEventListener('resize', (e) => {
  console.log('hello')
  console.log(e)
})
*/

/*
// need to calculate CURRENT_WIDTH in vh 
console.log("MMMMMMMMMMMMM")
let VH_UNIT = window.innerHeight / 100
let VW_UNIT = window.innerWidth / 100
let BOARD_HEIGHT = board.offsetHeight
let BOARD_WIDTH = board.offsetWidth
console.log(BOARD_HEIGHT)
console.log(BOARD_WIDTH)
console.log(VH_UNIT)
// test BOARD_HEIGHT should be close to equal to VH_UNIT * 80
let currentHeigt = BOARD_HEIGHT / VH_UNIT
let diff = (BOARD_WIDTH - BOARD_HEIGHT) / VH_UNIT
console.log(BOARD_WIDTH / VH_UNIT)

console.log(currentHeigt)
console.log(diff)
let settingWidth_IN_PIXELS = (VH_UNIT * (currentHeigt + diff) *0.8)
board.style.width = `${settingWidth_IN_PIXELS}px`;
*/