
import Snake from './Snake.js';
import Board from './Board.js';
import Fruit from './Fruit.js';
import SnakeDigest from './SnakeDigest.js';
import data from './data.js';


var fps =2;
var now;
var then;
var interval = 1000/fps;
var delta;
const board = new Board(document.querySelector('#board'), document.querySelector('#menu'));
let snakeDiv = document.querySelectorAll('.snake')[0];
let btn = document.querySelector('#btn');
let alert = document.querySelector('#alert');
let lastKey;
let hasMoved;
let keyboardHasBeenPressed;
let snakeDigestArray = []
let pauseElem = document.querySelector('#pause');
board.update();
let snake = new Snake(snakeDiv, board.width);
let fruit = new Fruit(board.width);
/* extra old code up resize the board 
window.addEventListener('resize', () => {
  board.width = 0
  board.update()
  board.devTools()
})
*/

//
async function writeNewData() {

  /*
  await fetch('./data.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName: snake.userName, score: snake.score})
  });
  */

}

async function checkData() {
  const response = await fetch('./data.json')
  const data = await response.json()
  return data

}
//

// listen for pause anytime
listenForOnePause();
// listen restart btn
btn.addEventListener('click', () => {

  data.push({ userName: snake.userName, score: snake.score })
  
  data.forEach((el) => console.log(el))
  /*
  writeNewData().then(() => {
    checkData().then((data) => {
      console.log(data)
      snake.reset(board.width);
      alert.style.opacity = 0;
      play();
    })
  })
*/

})
let inputName = document.querySelector('#alert input')
console.log(inputName)

inputName.addEventListener('keydown', (e) => {
  if (e.keyCode >= 48 && e.keyCode <= 90) {
    console.log(e)
    snake.userName += e.key
    inputName.value = snake.userName
  } else if (e.keyCode === 8) {
    console.log('BACKSPACE TRIGGERED')
    snake.userName = snake.userName.slice(0, -1)
    inputName.value = snake.userName
  }
})

setTimeout(() => {
  play()
}, 500)

// functions 
function play() {
  // the main function
  draw(); 
}

function draw(now) {
  if (!then) { then = now; }
    window.requestAnimationFrame(draw);
    delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      // done with recursive here
      if (snake.status === "ongoing") {
        keyboardHasBeenPressed = false // reset de la variable
        // check if snakeHead & snakeBody collided
        lastKey = snake.direction
        snake.checkBody(snake.direction)

        // async call sur le clavier avec .. beaucoup de 'if'
        const waitForKeyboard = new Promise((resolve, reject) => {
          hasMoved = false
          keyboardHasBeenPressed = false
          document.addEventListener('keydown', (e) => {
            e.preventDefault()
            if (snake.unitsMoved > 1){
              if (snake.direction !== e.key) {             
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  resolve(e.key)
                }  
              }
            }
          })
        })

        // si il n'y a pas de keypressed je veux lancer l'update auto, le plus tard possible
        setTimeout(() => {
          hasMoved = false // par défaut je lance l'update auto
          waitForKeyboard.then((data) => {
            if (data === 'ArrowLeft' && snake.direction === 'ArrowRight'
              || data === 'ArrowRight' && snake.direction === 'ArrowLeft'
              || data === 'ArrowDown' && snake.direction === 'ArrowUp'
              || data === 'ArrowUp' && snake.direction === 'ArrowDown'
            ) {
              // il ne se passe rien si on va dans la direction inverse
            } else {
              // on avance ..
              keyboardHasBeenPressed = true
              snake.unitsMoved += 1
              lastKey = data
            }
          })
        
          // un 'if' lancé avec du délai, pour update auto ou update manuel
          setTimeout(() => {
            if (keyboardHasBeenPressed === false) {
              snake.updateAuto()
              snake.unitsMoved += 1
              keyboardHasBeenPressed = true
            } else  {
              snake.updateByKeyboard(lastKey)
            }
            snake.bodyMove()
          }, 450) // fin du timeout nesté
        }, 20)
          
        // recupération des données de snakeHead
        snake.last_x = snake.x
        snake.last_y = snake.y

        // utilisation des données
        snake.checkWalls(board.rightWall)
        snake.checkFruit(fruit)
        
    
        if (snake.isEaten === true) {
          // will remove the fruit and generate a new one here, if one fruit has been eaten
            // fruit has been handled, now the rest of the fruit must stay inside the snake
          //let snakeDigest = document.createElement('div')
          //snakeDigest.className += ' snake-digest'
          //let newSnakeDigestElem = document.createElement('div')
          //newSnakeDigestElem.className += 'snake-digest'
          let snakeDigest = new SnakeDigest(snake.body[0].x, snake.body[0].y)
          snakeDigest.moveToPosition()
          snakeDigestArray.push(snakeDigest)
          fruit.moveToRandomPosition(snake.body) 
          snake.isEaten = false
        }
        if (snakeDigestArray.length > 0) {

          for (let i = 0; i < snakeDigestArray.length; i++){
            if (snake.checkDigest(snakeDigestArray[i].x, snakeDigestArray[i].y) === false) {
              document.querySelectorAll('.snake-digest')[i].remove()
              snakeDigestArray.pop()
            }
          }
          /*
          snakeDigestArray.forEach((digest)=>{
            if (snake.checkDigest(digest.x, digest.y) === false) {
              
            }
          })
          */
        }
      }
    }
}


function listenForOnePause() {
  window.addEventListener('keydown', (key) => {
    if (key.code === 'Space')
      if (snake.status === 'ongoing') {
        snake.status = 'pause'
        pauseElem.classList.toggle('active')
      } else {
        snake.status = 'ongoing'
        pauseElem.classList.remove('active')
      }
  })
}