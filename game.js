
import Snake from './components/Snake.js';
import Board from './components/Board.js';
import Fruit from './components/Fruit.js';
import SnakeDigest from './components/SnakeDigest.js';

// VARIABLES
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
let inputName = document.querySelector('#alert input')
let form = document.querySelector('#alert form')
const leaderboard = document.querySelector('.menu-leaderboard')
let input = document.querySelector('#input-elem')
let loader = document.querySelector('.loader-elem')

/* extra old code up resize the board 
window.addEventListener('resize', () => {
  board.width = 0
  board.update()
  board.devTools()
})
*/

// --- DEBUT DE LA SEQUENCE --- //
// load le leaderboard 
firstDisplayOfData()

// listeners
listenForOnePause();
listenResetBtn()
listenInput()
// --- FIN DE LA SEQUENCE --- //

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
      // we are done with recursive here
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
          // will move ( not remove ) the fruit and generate a new one here, if one fruit has been eaten
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
        }
      }
    }
}

// listeners functions

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

function listenResetBtn() {
  btn.addEventListener('click', () => {
  
    // turn on loader
    let loader = document.querySelector('.loader-elem')
    console.log(loader)

    loader.classList.add('active')
    writeNewData().then(() => {
      getData().then((data) => {

        // reset leaderboard
        let lastLeaderboardElements = document.querySelectorAll('.menu-leaderboard-user')
        if (lastLeaderboardElements.length > 0) {
          lastLeaderboardElements.forEach((el) => el.remove())
        }
        
        // trier la data en fonction du score
        let sortedData = data.sort(function (a, b) {return b.score - a.score})
        sortedData.forEach((el, index) => {
          let newUserScore = document.createElement('div')
          newUserScore.className += 'menu-leaderboard-user'
          newUserScore.innerHTML = `
          <p class="leaderboard-user-index">#${index + 1}</p>
          <p class="leaderboard-user-name">${el.name}</p>
          <p class="leaderboard-user-score">${el.score}</p>
          `
          leaderboard.append(newUserScore)
        })
 
        // nouveau jeu
        loader.classList.remove('active')
        snake.reset(board.width);
        alert.style.opacity = 0;
        form.reset()
        btn.classList.remove('active')
        input.classList.remove('active')
        // relancement du jeu
        play();
      })
    })
  
  })
}

function listenInput(){
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

    // displaying "play again" button, depending on characeters length
    if (snake.userName.length > 3 && snake.userName.length < 13) {
      btn.classList.add('active')
      input.classList.add('active')
    } else {
      btn.classList.remove('active')
      input.classList.remove('active')
    }
      
  })
}


// async functions 

async function writeNewData() {
  await fetch('https://snake-api-plus.herokuapp.com/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      name: snake.userName,
      score: snake.score
    }),
    headers: { 'Content-Type': 'application/json' }
    })
}

async function getData() {
  const response = await fetch('https://snake-api-plus.herokuapp.com/api/v1/users', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

function firstDisplayOfData() {
  loader.classList.add('active')
  getData().then((data) => {
    if (data.length > 0) {
      // trier la data en fonction du score
      let sortedData = data.sort(function (a, b) {return b.score - a.score})
      sortedData.forEach((el,index) => {
        let newUserScore = document.createElement('div')
        newUserScore.className += 'menu-leaderboard-user'
        newUserScore.innerHTML = `
        <p class="leaderboard-user-index">#${index + 1}</p>
        <p class="leaderboard-user-name">${el.name}</p>
        <p class="leaderboard-user-score">${el.score}</p>
      `
        leaderboard.append(newUserScore)
      })
    }
    loader.classList.remove('active')
    // lancement du jeu
    play()
  })
}