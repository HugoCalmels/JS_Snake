import Game from './Game.js'

let btn = document.querySelector('#btn')
let alert = document.querySelector('#alert')

let game = new Game()

game.play()


btn.addEventListener('click', () => {
  alert.style.opacity = 0
  game.play()

})