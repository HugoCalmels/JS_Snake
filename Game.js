import Snake from './Snake.js'
import Board from './Board.js'
import Fruit from './Fruit.js'

var fps =0.5;
var now;
var then;
var interval = 1000/fps;
var delta;

export default class Game {
  constructor() {
    this.board = new Board(document.querySelector('#board'))
    this.snake = new Snake(document.querySelectorAll('.snake')[0])
    this.fruit = new Fruit(this.board.width)
      this.resize()
      
    ;
  }

  initialize() {
    board.update()
    board.devTools()
  }

  play() {
    

    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log(this.snake.status)
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRR')

    function draw(now) {
      if (!then) { then = now; }
      
      delta = now - then;
    if (delta > interval) {
      
      then = now - (delta % interval);
      if (this.snake.status === "ongoing") {
        
        this.snake.update()
        //snake.bodyMove()
        this.snake.checkWalls(this.board.rightWall)
        this.snake.checkFruit(this.fruit)
        if (this.snake.isEaten === true) {
          // will remove the fruit and generate a new one here, if one fruit has been eaten
          this.fruit.moveToRandomPosition()
          this.snake.isEaten = false
        }
      
        this.snake.moved = false
      }
        //snake.move()
    
    }
    window.requestAnimationFrame(draw);
    }
   this.play()
  }

  resize() {
      window.addEventListener('resize', () => {
      this.board.width = 0
      this.board.update()
      this.board.devTools()
    })
  }

}

// Function draw, a little too complicated for me to handle properly.
