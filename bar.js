function Bar (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.color = '#2e7d32';
  this.width = 180;
  this.height = 25;
  this.x = this.canvasWidth/2 - this.width/2;
  this.y = this.canvasHeight - this.height;
  this.vx = 30;
}
// a mejorar el movimiento de la barra y la colision con los lados
Bar.prototype.goLeft = function () {
  if (this.x > 0) {
    this.x -= this.vx;
  }
//  console.log(this.x);
};

Bar.prototype.goRight = function () {
  if (this.x < this.canvasWidth - this.width) {
    this.x += this.vx;
  }
console.log(this.x);
};

// if (this.x + this.vx > this.canvasHeight - this.radius || this.x + this.vx < this.radius) {
//   this.vx = -this.vx;
// }
