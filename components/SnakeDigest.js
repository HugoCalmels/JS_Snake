const fruitsDigestWrapper = document.querySelector('.fruits-digest-wrapper')
export default class SnakeDigest{
  constructor(x, y){
    this.X_SNAKE = x,
    this.Y_SNAKE= y,
    this.elem = document.createElement('div')
  }

  get x() {
    return parseFloat(getComputedStyle(this.elem).getPropertyValue('--x-fruitDigest'))
  }
  get y() {
    return parseFloat(getComputedStyle(this.elem).getPropertyValue('--y-fruitDigest'))
  }

  set x(value) {
    return this.elem.style.setProperty('--x-fruitDigest', value);
  }
  set y(value) {
    return this.elem.style.setProperty('--y-fruitDigest', value);
  }

  moveToPosition() {
    this.elem.className += 'snake-digest'
    fruitsDigestWrapper.append(this.elem)
    this.x = this.X_SNAKE
    this.y = this.Y_SNAKE
  }
}