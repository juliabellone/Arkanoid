function Ball (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.radius = 10;
  this.x = null;
  this.y = null;
  this.mediumColor1 = '#878787';
  this.mediumColor2 = '#a8a8a8';
  this.lightColor ='#d6d6d6';
  this.shadowColor ='#6d6d6d';
  this.vx = 1;
  this.vy = 1;
  this.status = null;
}

Ball.prototype.bounce = function () {
  //acceleration of the ball
  this.x += this.vx;
  this.y += this.vy;
  //bounce of the ball
  if (this.y + this.vy < this.radius) {
    this.vy = -this.vy;
  }
  if (this.x + this.vx > this.canvasWidth - this.radius || this.x + this.vx < this.radius) {
    this.vx = -this.vx;
  }
};

Ball.prototype.hitBottom = function () {
  if (this.y + this.vy > this.canvasHeight - this.radius) {
    this.vx = 0;
    this.vy = 0;
    return true;
  }
};
