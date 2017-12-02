function Bar (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.color = '#2e7d32';
  this.width = 180;
  this.height = 25;
  this.x = this.canvasWidth/2 - this.width/2;
  this.y = this.canvasHeight - this.height;
  this.vx = 25;
}
// a mejorar el movimiento de la barra y la colision con los lados
Bar.prototype.goLeft = function () {
  if (this.x > 0) {
    this.x -= this.vx;
  }
  if (this.x < 0 ){
    this.x = 0;
  }
  console.log(this.x);
};

Bar.prototype.goRight = function () {
  if (this.x + this.width < this.canvasWidth) {
    this.x += this.vx;
  } if (this.x + this.width > this.canvasWidth) {
    this.x = this.canvasWidth - this.width;
  }
  console.log(this.x + this.width);
};

// if (this.x + this.vx > this.canvasHeight - this.radius || this.x + this.vx < this.radius) {
//   this.vx = -this.vx;
// }
