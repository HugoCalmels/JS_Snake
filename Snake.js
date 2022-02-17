const wrapper = document.querySelector('#container')
const board = document.querySelector('#board')

const SPEED = 1

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
    this.last_x = 0;
    this.last_y = 0;
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
              this.y -= SPEED
            }
            this.moved = true
            this.direction = 'ArrowLeft'
            this.axis = 'horizontal'

            break;
          case 'ArrowRight':
            if (this.axis != 'horizontal') {
              this.y += SPEED
            }
            this.moved = true
            this.direction = 'ArrowRight'
            this.axis = 'horizontal'
   
            break;
          case 'ArrowUp':
            if (this.axis != 'vertical') {
              this.x -= SPEED
            }
            this.moved = true
            this.direction = 'ArrowUp'
            this.axis = 'vertical'
   
            break;
          case 'ArrowDown':
            if (this.axis != 'vertical') {
              this.x += SPEED

            }
            this.moved = true
            this.direction = 'ArrowDown'
            this.axis = 'vertical'
 
            break;
          }
        }
    });

    if (this.moved === false) {
      if (this.direction === 'ArrowLeft')
        this.y -= SPEED
      if (this.direction === 'ArrowRight')
        this.y += SPEED
      if (this.direction === 'ArrowUp')
        this.x -= SPEED
      if (this.direction === 'ArrowDown')
        this.x += SPEED
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
    console.log(`snakehead current y : ${this.y}`)
    console.log(`snakehead current x : ${this.x}`)
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
      this.bodyCount += 1
      
      let snakeIncrementation = document.createElement('div')
      snakeIncrementation.className += `snake-body id${this.bodyCount}`
      board.appendChild(snakeIncrementation)
      let snakeChild = {
        number: this.bodyCount,
        x: this.x,
        y: this.y
      }
      this.body.unshift(snakeChild)
 
   
    }
  }


  bodyMove() {
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJ')
    console.log(this.body)

    console.log('DDDEEEBBUGGGGGG')
    console.log('DDDEEEBBUGGGGGG')
    console.log('DDDEEEBBUGGGGGG')
    console.log(this.bodyCount)
    console.log('DDDEEEBBUGGGGGG')
    console.log('DDDEEEBBUGGGGGG')
    console.log('DDDEEEBBUGGGGGG')
    console.log('DDDEEEBBUGGGGGG')
  

    if (this.bodyCount != 0 ){

      this.body.forEach((e) => {

      })

      //(this.x % 1 === 0) && (this.y % 1 === 0))
   

      // je retire le dernier element et je le remets en premier element de l'array 
      let directionOfLastElement = this.body.slice(-1).bodyDirection
      console.log('TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
      console.log(directionOfLastElement)
      console.log('TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
      this.body.pop()
      let newBody = {
        bodyDirection: directionOfLastElement,

        x: this.last_x,
        y: this.last_y
      }
      this.body.unshift(newBody)

      // juste pour le css, selon l'array envoyée
      this.body.forEach((e, index) => {
        console.log('body-direction')
        console.log(e.bodyDirection)
        console.log('body-direction')
        let bodyElement = document.querySelectorAll('.snake-body')[index]
        
        bodyElement.style.setProperty('--x', e.x)
        bodyElement.style.setProperty('--y', e.y)
      })

      
      this.bodyCount +=1
    } 

 
        
    // je mets 3 body pour pas commencer avec un snake de 0, voila
      if (this.bodyCount === 0) {
        let incrementer = 3
        for (let index = 0; index < incrementer; index++){
          let snakeIncrementation = document.createElement('div')
          snakeIncrementation.className += `snake-body id${this.bodyCount}`
          board.appendChild(snakeIncrementation)
          let snakeChild = {
            bodyDirection: "ArrowRight",
            x: this.x ,
            y: this.y
          }
          this.body.unshift(snakeChild)
        
          this.bodyCount +=1
          
        }
      }




    
    

    


/*
    let newBody = 
    {
        index: this.body.pop().
      }
*/

    //this.body.unshift()

   
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
    let snakeBodies = document.querySelectorAll('.snake-body')
    snakeBodies.forEach((e) => {
      e.remove()
    })
    this.body = [];
    this.bodyCount = 0;
    this.direction = "ArrowRight"
    this.x = 19;
    this.y = width / 2;
    this.status = "ongoing"
    this.width = width;
  }
}

