const wrapper = document.querySelector('#container')
const board = document.querySelector('#board')

export default class Snake {
  constructor(snakeHead, direction) {
    this.snakeHead = snakeHead;
    this.direction = 'ArrowRight';
    this.axis = "horizontal";
    this.snakeLenght = 3;
    this.status = 'ongoing';
    this.body = [];
    this.width 
    this.moved = false; 
    this.totalFruits = 0;
    this.bodyCount = 0;
    this.isEaten = false;
  }

  get x() {
    return parseFloat(getComputedStyle(this.snakeHead).getPropertyValue('--x'))
  }
  get y() {
    return parseFloat(getComputedStyle(this.snakeHead).getPropertyValue('--y'))
  }

  set x(value) {
    return this.snakeHead.style.setProperty('--x', value);
  }
  set y(value) {
    return this.snakeHead.style.setProperty('--y', value);
  }

  update() {
    /*
    console.log("---ENTERING UPDATE---")
    console.log('MMMMMMMMMMMMMMMMMMMMM')
    console.log(this.body)
    console.log('MMMMMMMMMMMMMMMMMMMMM')
    console.log(`fruit x : ${this.fruit_x_value}`)
    console.log(`fruit y : ${ this.fruit_y_value }`)
    console.log('MMMMMMMMMMMMMMMMMMMMM')
    */
  
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      if ((e.key === 'ArrowLeft' && this.direction === 'ArrowRight') ||
          (e.key === 'ArrowRight' && this.direction === 'ArrowLeft') ||
          (e.key === 'ArrowUp' && this.direction === 'ArrowDown') ||
          (e.key === 'ArrowDown' && this.direction === 'ArrowUp')) 
      {
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            if (this.axis != 'horizontal') {
              this.y -= 1
              this.moved = true
            }
            this.direction = 'ArrowLeft'
            this.axis = 'horizontal'
            break;
          case 'ArrowRight':
            if (this.axis != 'horizontal') {
              this.y += 1
              this.moved = true
            }
            this.direction = 'ArrowRight'
            this.axis = 'horizontal'
            break;
          case 'ArrowUp':
            if (this.axis != 'vertical') {
              this.x -= 1
              this.moved = true
            }
            this.direction = 'ArrowUp'
            this.axis = 'vertical'
            break;
          case 'ArrowDown':
            if (this.axis != 'vertical') {
              this.x += 1
              this.moved = true
            }
            this.direction = 'ArrowDown'
            this.axis = 'vertical'
            break;
          }
        }
    });

    if (this.moved === false) {
      if (this.direction === 'ArrowLeft')
        this.y -= 1
      if (this.direction === 'ArrowRight')
        this.y += 1
      if (this.direction === 'ArrowUp')
        this.x -= 1
      if (this.direction === 'ArrowDown')
        this.x += 1
    }
    /*
    let obj = {
      x: this.x,
      y: this.y
    }
    this.body.push(obj)
    */
    
    //console.log("---CLOSING UPDATE---")
  }

  checkWalls(rightWall) {
    let leftWall = 0;
    let topWall = 0;
    let bottomWall = 40;
    //console.log("====START CHECKING FOR WALLS====")
    //console.log(rightWall)
    //console.log(`snakehead current y : ${this.y}`)
    //console.log(`snakehead current x : ${this.x}`)
    if (this.y >= rightWall)
      this.isLose()
    if (this.y < leftWall)
      this.isLose()
    if (this.x < topWall)
      this.isLose()
    if (this.x >= bottomWall)
      this.isLose()
    //console.log("====END CHECKING FOR WALLS====")
  }

  checkFruit(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      console.log('ZZZZZZZZZZZZZZZZ')
      console.log('ZZZZZZZZZZZZZZZZ')
      console.log('the fruit is ready to be eaten')
      console.log('ZZZZZZZZZZZZZZZZ')
      console.log('ZZZZZZZZZZZZZZZZ')

      // say that the snake has eaten this round 
      this.isEaten = true
      
      /*
      let snakeIncrementation = document.createElement('div')
      snakeIncrementation.className += `snake-body`
      board.appendChild(snakeIncrementation)
      let snakeChild = {
        x: this.x,
        y: this.y
      }
      this.body.push(snakeChild)
      this.bodyCount += 1
      */
    }
  }


  bodyMove() {
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
    this.body.forEach((e) => {
      console.log(e)
      // e.x = this.this.x
    })
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
  }


  isLose() {
    this.status = "lost"
    console.log('---START IS LOSE----')
    console.log(this.snakeHead)
    console.log(wrapper)
    /*
    let alert = document.createElement('div')
    alert.innerHTML = `<p>you lost</p>
    <button>play again</button>`
    alert.className += 'alert lose'
    board.appendChild(alert)
    */
    let alert = document.querySelector('#alert')
    alert.style.opacity = '1';
    console.log('----END IS LOSE----')
  }

  reset(width) {
    this.x = 19;
    this.y = width / 2;
    this.status = "ongoing"
    this.width = width;
  }
}
