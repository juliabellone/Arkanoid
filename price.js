function Price (brickX, brickY) {
  this.x = brickX;
  this.y = brickY;
  this.vy = 4;
  this.width = 25;
  this.height = 10;
  this.color = 'red';
}

Price.prototype.downMotion = function () {
  this.y += this.vy;
};
