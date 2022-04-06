const wrapper = document.querySelector('#container')
const board = document.querySelector('#board')
const snakeWrapper = document.querySelector('#snake')

const SPEED = 1

export default class Snake {
  constructor(snakeHead, width) {
    // valeurs par defaut
    this.snakeHead = snakeHead;
    this.width = width;
    this.direction = 'ArrowRight';
    this.axis = "horizontal";
    this.snakeLenght = 3; 
    this.status = 'ongoing';
    this.body = [];
    this.bodyCount = 0;
    this.isEaten = false;
    this.last_x = 0;
    this.last_y = 0;
    this.unitsMoved = 0;
    this.score = 0;
    this.scoreElem = document.getElementById('score')
    this.y = this.width / 3
    this.x = 40 / 2
    this.userName = ''
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

 

  updateByKeyboard(key) {
    let snakeEyes = document.querySelector('.snake-eyes')

      switch (key) {
        case 'ArrowLeft':
          if (this.axis != 'horizontal' ) {
            this.y -= SPEED
          }
          this.snakeHead.style.borderTopRightRadius = "0rem"
          this.snakeHead.style.borderBottomRightRadius = "0rem"
          this.snakeHead.style.borderTopLeftRadius = "5rem"
          this.snakeHead.style.borderBottomLeftRadius = "5rem"
          snakeEyes.style.transform = "rotate(0deg)"
          this.direction = 'ArrowLeft'
          this.axis = 'horizontal'
          break;
        case 'ArrowRight':
          if (this.axis != 'horizontal') {
            this.y += SPEED
          }
          this.snakeHead.style.borderTopRightRadius = "5rem"
          this.snakeHead.style.borderBottomRightRadius = "5rem"
          this.snakeHead.style.borderTopLeftRadius = "0rem"
          this.snakeHead.style.borderBottomLeftRadius = "0rem"
          snakeEyes.style.transform = "rotate(0deg)"
          this.direction = 'ArrowRight'
          this.axis = 'horizontal'
          break;
        case 'ArrowUp':
          if (this.axis != 'vertical') {
            this.x -= SPEED
          }
          this.snakeHead.style.borderTopRightRadius = "5rem"
          this.snakeHead.style.borderBottomRightRadius = "0rem"
          this.snakeHead.style.borderTopLeftRadius = "5rem"
          this.snakeHead.style.borderBottomLeftRadius = "0rem"
          snakeEyes.style.transform = "rotate(90deg)"
          this.direction = 'ArrowUp'
          this.axis = 'vertical'
          break;
        case 'ArrowDown':
          if (this.axis != 'vertical') {
            this.x += SPEED
          }
          this.snakeHead.style.borderTopRightRadius = "0rem"
          this.snakeHead.style.borderBottomRightRadius = "5rem"
          this.snakeHead.style.borderTopLeftRadius = "0rem"
          this.snakeHead.style.borderBottomLeftRadius = "5rem"
          snakeEyes.style.transform = "rotate(-90deg)"
          this.direction = 'ArrowDown'
          this.axis = 'vertical'
          break;
      }
  }

  updateAuto() {
      if (this.direction === 'ArrowLeft')
        this.y -= SPEED
      if (this.direction === 'ArrowRight')
        this.y += SPEED
      if (this.direction === 'ArrowUp')
        this.x -= SPEED
      if (this.direction === 'ArrowDown')
        this.x += SPEED
  }

  checkBody(lastKey) {
    for ( let i = this.body.length -1; i >= 0; i-- ) {
      if (this.body[i].x === this.x && this.body[i].y === this.y ){
        if ( this.unitsMoved > 1)
          if (lastKey === 'ArrowLeft' && this.direction === 'ArrowRight'
              || lastKey === 'ArrowRight' && this.direction === 'ArrowLeft'
              || lastKey === 'ArrowDown' && this.direction === 'ArrowUp'
              || lastKey === 'ArrowUp' && this.direction === 'ArrowDown'
            ) {

            } else {
              this.isLose()
          }
      }
    }
  }
  

  checkWalls(rightWall) {
    let leftWall = 0;
    let topWall = 0;
    let bottomWall = 40;
    if (this.y >= rightWall)
      this.isLose()
    if (this.y < leftWall)
      this.isLose()
    if (this.x < topWall)
      this.isLose()
    if (this.x >= bottomWall)
      this.isLose()
  }

  checkDigest(X_DIGEST, Y_DIGEST) {
    let condition = false
    this.body.forEach((el) => {
      if (el.x === X_DIGEST && el.y === Y_DIGEST)
        condition = true
    })
    if (condition === true)
      return true
    else 
      return false
  }

  checkFruit(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {

      // say that the snake has eaten this round 
      this.isEaten = true
      this.bodyCount += 1
      this.score += 1
      this.scoreElem.innerHTML = this.score
      
      let snakeIncrementation = document.createElement('div')
      snakeIncrementation.className += `snake-body id${this.bodyCount}`
      board.appendChild(snakeIncrementation)
      let snakeChild = {
        bodyDirection: this.direction,
        x: this.x,
        y: this.y,
      }
      this.body.unshift(snakeChild)

    

    }
  }


  bodyMove() {
    if (this.bodyCount != 0 ){

      // simple, je retire le dernier element et je le remets en premier element de l'array
      this.body.pop()
      let newBody = {
        bodyDirection: this.direction,
        x: this.last_x,
        y: this.last_y,
      }
      this.body.unshift(newBody)

      // la meme chose juste pour le css
      this.body.forEach((e, index) => {
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
            bodyDirection: this.direction,
            x: this.x ,
            y: this.y - index ,
          }
          this.body.unshift(snakeChild)
          this.bodyCount +=1 
        }
      }
    
    // controlling last part of the body only to make it rounded
    let bodyElements = document.querySelectorAll('.snake-body')
    bodyElements.forEach((body) => {
      body.style.borderTopRightRadius = "0rem"
      body.style.borderBottomRightRadius = "0rem"
      body.style.borderTopLeftRadius = "0rem"
      body.style.borderBottomLeftRadius = "0rem"
    })

    // une déclaration de variable un peu late ..... mais apres que ca ait bougé
    let lastBodyDomElement = document.querySelectorAll('.snake-body')[document.querySelectorAll('.snake-body').length - 1]

    // round les cotés quand ca tourne
    for (let i = 0; i < this.body.length -1 ; i++) {
      if (i === 0) {
        //console.log('previous elem :' + this.x)
        //console.log('current elem :' + this.body[i])
        if (this.direction !== this.body[i].bodyDirection || this.body[i].bodyDirection !== this.body[i+1].bodyDirection ) {
          if (this.body[i].bodyDirection === 'ArrowRight' && this.body[i+1].bodyDirection === 'ArrowUp') {
            document.querySelectorAll('.snake-body')[i].style.borderTopLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowLeft' && this.body[i+1].bodyDirection === 'ArrowUp') {
            document.querySelectorAll('.snake-body')[i].style.borderTopRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowRight' && this.body[i+1].bodyDirection === 'ArrowDown') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowLeft' && this.body[i+1].bodyDirection === 'ArrowDown') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomRightRadius = "1rem"
          }
          //
          if (this.body[i].bodyDirection === 'ArrowUp' && this.body[i+1].bodyDirection === 'ArrowRight') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowUp' && this.body[i+1].bodyDirection === 'ArrowLeft') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowDown' && this.body[i+1].bodyDirection === 'ArrowRight') {
            document.querySelectorAll('.snake-body')[i].style.borderTopRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowDown' && this.body[i+1].bodyDirection === 'ArrowLeft') {
            document.querySelectorAll('.snake-body')[i].style.borderTopLeftRadius = "1rem"
          }
          
        } else {
          document.querySelectorAll('.snake-body')[i].style.border = "0 rem"
        }
      } else {
        //console.log('previous elem :' + this.body[i - 1])
        //console.log('current elem :' + this.body[i])
       
        if (this.body[i + 1].bodyDirection !== this.body[i].bodyDirection) {
          if (this.body[i].bodyDirection === 'ArrowRight' && this.body[i+1].bodyDirection === 'ArrowUp') {
            document.querySelectorAll('.snake-body')[i].style.borderTopLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowLeft' && this.body[i+1].bodyDirection === 'ArrowUp') {
            document.querySelectorAll('.snake-body')[i].style.borderTopRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowRight' && this.body[i+1].bodyDirection === 'ArrowDown') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowLeft' && this.body[i+1].bodyDirection === 'ArrowDown') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomRightRadius = "1rem"
          }
          //
          if (this.body[i].bodyDirection === 'ArrowUp' && this.body[i+1].bodyDirection === 'ArrowRight') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowUp' && this.body[i+1].bodyDirection === 'ArrowLeft') {
            document.querySelectorAll('.snake-body')[i].style.borderBottomLeftRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowDown' && this.body[i+1].bodyDirection === 'ArrowRight') {
            document.querySelectorAll('.snake-body')[i].style.borderTopRightRadius = "1rem"
          }
          if (this.body[i].bodyDirection === 'ArrowDown' && this.body[i+1].bodyDirection === 'ArrowLeft') {
            document.querySelectorAll('.snake-body')[i].style.borderTopLeftRadius = "1rem"
          }
        } else {
          document.querySelectorAll('.snake-body')[i].style.border = "0 rem"
        }
   
      }
    }
  

    switch (this.body.slice(-1)[0].bodyDirection) {
      case "ArrowRight":
        lastBodyDomElement.style.borderTopRightRadius = "0rem"
        lastBodyDomElement.style.borderBottomRightRadius = "0rem"
        lastBodyDomElement.style.borderTopLeftRadius = "5rem"
        lastBodyDomElement.style.borderBottomLeftRadius = "5rem"
        break;
      case "ArrowLeft":
        lastBodyDomElement.style.borderTopRightRadius = "5rem"
        lastBodyDomElement.style.borderBottomRightRadius = "5rem"
        lastBodyDomElement.style.borderTopLeftRadius = "0rem"
        lastBodyDomElement.style.borderBottomLeftRadius = "0rem"
        break;
      case "ArrowUp":
        lastBodyDomElement.style.borderTopRightRadius = "0rem"
        lastBodyDomElement.style.borderBottomRightRadius = "5rem"
        lastBodyDomElement.style.borderTopLeftRadius = "0rem"
        lastBodyDomElement.style.borderBottomLeftRadius = "5rem"
        break;
      case "ArrowDown":
        lastBodyDomElement.style.borderTopRightRadius = "5rem"
        lastBodyDomElement.style.borderBottomRightRadius = "0rem"
        lastBodyDomElement.style.borderTopLeftRadius = "5rem"
        lastBodyDomElement.style.borderBottomLeftRadius = "0rem"
        break;
    }

  }


  isLose() {
    this.status = "lost"
    this.unitsMoved = 0;
    let alert = document.querySelector('#alert')
    alert.style.opacity = '1';

  }

  reset() {
    let snakeBodies = document.querySelectorAll('.snake-body')
    snakeBodies.forEach((e) => {
      e.remove()
    })
    let snakeEyes = document.querySelector('.snake-eyes')
    snakeEyes.style.transform = "rotate(0deg)"
    this.snakeHead.style.borderTopRightRadius = "5rem"
    this.snakeHead.style.borderBottomRightRadius = "5rem"
    this.snakeHead.style.borderTopLeftRadius = "0rem"
    this.snakeHead.style.borderBottomLeftRadius = "0rem"
    this.direction = 'ArrowRight';
    this.axis = "horizontal";
    this.snakeLenght = 3; 
    this.status = 'ongoing';
    this.body = [];
    this.bodyCount = 0;
    this.isEaten = false;
    this.last_x = 0;
    this.last_y = 0;
    this.unitsMoved = 0;
    this.score = 0;
    this.y = this.width / 3
    this.x = 40 / 2
    this.userName = ''
  }
}

