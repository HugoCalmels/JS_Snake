const board = document.querySelector('#board')
const CUSTOM_WIDTH_PERCENTAGE = 80

// function qui sort toutes les fois ou j'essaye de mettre un carré et je recupere un float

// recalculer le nb de carrés à envoyer ...
const squareSide = window.innerHeight / 100

function calculateNumberOfSquares(square) {

  let offsetWidth = board.offsetWidth
  let offsetHeight = board.offsetHeight

 // Recalculer le max-height ( ou le height ) en fonction du nb de carrés posés
  // normalement je dois trouver combien de carrés sont posés ligne 1 .. ligne 2 .. et de maniere respons

  let res = (offsetWidth*offsetHeight) / (square*square )

  console.log(res)

  for (let i = 0; i <res+90; i++) {

    let boardCell = document.createElement("div");
    boardCell.classList.add('board-cell')
    board.appendChild(boardCell)
  
  
  }

}

calculateNumberOfSquares(squareSide)


 




window.addEventListener('resize', () => {
  let height = (CUSTOM_WIDTH_PERCENTAGE * window.innerHeight) / 100
  let width = (CUSTOM_WIDTH_PERCENTAGE * window.innerWidth) / 100
  let square = window.innerHeight / 100
  let squareArea = square * square

if (isDisplayale() === true) {
  console.log("hello")
}
})






let customheight = 1200
let customwidth = 900
let customsquare = 11.5



function isDisplayale() {
  
  let height = (CUSTOM_WIDTH_PERCENTAGE * window.innerHeight) / 100
  let width = (CUSTOM_WIDTH_PERCENTAGE * window.innerWidth) / 100
  let square = window.innerHeight / 100
  let squareArea = square * square

  let size = height * width
  let res = Math.round(size / squareArea)
  //console.log(isInt(res))
  //console.log(res)
}

//isDisplayale(customheight, customwidth, customsquare)

function isInt(n) {
  return n % 1 === 0
}

let boardHeight = (CUSTOM_WIDTH_PERCENTAGE * window.innerHeight) / 100
let boardWidth = (CUSTOM_WIDTH_PERCENTAGE * window.innerWidth) / 100





// La height restera la même, ce sera uniquement la width qui va changer.

/*
const CUSTOM_WIDTH_PERCENTAGE = 80
let boardHeight = (CUSTOM_WIDTH_PERCENTAGE * window.innerHeight) / 100
let boardWidth = (CUSTOM_WIDTH_PERCENTAGE * window.innerWidth) / 100
console.log(`board height = ${boardHeight}`)
console.log(`board width = ${boardWidth}`)
let vhUnit = window.innerHeight / 100
let vwUnit = window.innerWidth / 100
console.log(`1x vh unit = ${vhUnit}`)
console.log(`1x vw unit = ${vwUnit}`)
*/
// height of one square, depending on board width



// BOARDSIZE = (height px* width px)/ vh unit

/*
let BOARD_SIZE = (boardHeight / vhUnit) * ((boardWidth / vhUnit))

console.log(BOARD_SIZE)

console.log(Math.round(vhUnit))
console.log(vhUnit)

console.log(boardWidth % vhUnit)

let relativeHeight = vhUnit
let relativeWidth = vwUnit






board.style.setProperty('height', `${relativeHeight}px`)
board.style.setProperty('width', `${relativeWidth}px`)
*/
/*
let boardWidth = board.getBoundingClientRect().width
let boardHeight = board.getBoundingClientRect().height
*/
// let boardCellWidth = document.querySelector('#board-cell').getBoundingClientRect().width

/*
const CUSTOM_WIDTH_PERCENTAGE = 80
let boardHeight = (CUSTOM_WIDTH_PERCENTAGE * window.innerHeight) / 100
let boardWidth = (CUSTOM_WIDTH_PERCENTAGE * window.innerWidth) / 100


let vhUnit = window.innerHeight / 100
let vwUnit = window.innerWidth / 100
console.log(`1x vh unit = ${vhUnit}`)
console.log(`1x vw unit = ${vwUnit}`)

console.log(`board height = ${boardHeight}`)
console.log(`board width = ${boardWidth}`)

console.log(`there should be ${Math.round(boardHeight/vhUnit)} units on the height`)
console.log(`there should be ${Math.round(boardWidth / vwUnit)} units on the width`)

let diff = 1+((boardWidth - boardHeight) / boardHeight)

console.log(diff)

board.style.setProperty('height', `${boardHeight}px`)
board.style.setProperty('width', `${boardWidth}px`)

// let BOARD_SIZE = (( vhUnit * CUSTOM_WIDTH_PERCENTAGE  ) * ( vwUnit * CUSTOM_WIDTH_PERCENTAGE )) /4
// Utiliser uniquement la view height, puisque ce sont des carrés pour envoyer le nb de carrés
let BOARD_SIZE = ((CUSTOM_WIDTH_PERCENTAGE)/2) * (((CUSTOM_WIDTH_PERCENTAGE)/2)*diff)

// need to say how much squares I want ( not the pixels yet )
console.log(BOARD_SIZE)

// looping to define how much squares, depending on screen size
for (let i = 0; i < BOARD_SIZE; i++) {
  let boardCell = document.createElement("div");
  boardCell.classList.add('board-cell')

  board.appendChild(boardCell)
}
*/
/*
let responsiveHeight = windowHeight / boardCellWidth
let responsiveWidth = windowWidth / boardCellWidth
console.log(responsiveHeight)
console.log(responsiveWidth)
*/

/*
let rest = responsiveHeight - Math.floor(responsiveHeight) 
rest += responsiveWidth - Math.floor(responsiveWidth)
*/

/*
let BOARD_SIZE = (responsiveHeight *responsiveWidth)
console.log(BOARD_SIZE)
board.style.setProperty('width', `${windowWidth}px`)
board.style.setProperty('height', `${windowHeight}px`)
*/


// calc the board width and height 




/*



*/


