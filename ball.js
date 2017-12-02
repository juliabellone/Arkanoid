function Ball (canvasWidth, canvasHeight) {
  this.x = 100;
  this.y = 100;
  this.radius = 15;
  this.color = '#2e7d32';
  this.vx = 7;
  this.vy = 5;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

Ball.prototype.bounce = function () {
  //acceleration of the ball
  this.x += this.vx;
  this.y += this.vy;
  //bounce of the ball
  if (this.y + this.vy > this.canvasHeight - this.radius || this.y + this.vy < this.radius) {
    this.vy = -this.vy;
  }
  if (this.x + this.vx > this.canvasHeight - this.radius || this.x + this.vx < this.radius) {
    this.vx = -this.vx;
  }
};

// Ball.prototype.barBouce = function (bar) {
//   var barTop =
//   if (this.y + this.vy > this.canvasHeight - this.radius || this.y + this.vy < this.radius) {
//     this.vy = -this.vy;
//   }
//};
