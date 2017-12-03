function Ball (canvasWidth, canvasHeight) {
  this.x = 100;
  this.y = 100;
  this.radius = 10;
  this.color = '#2e7d32';
  this.vx = 5;
  this.vy = 7;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

Ball.prototype.bounce = function () {
  //acceleration of the ball
  this.x += this.vx;
  this.y += this.vy;
  //bounce of the ball
  if (this.y + this.vy < this.radius) {
    this.vy = -this.vy;
  }
  if (this.x + this.vx > this.canvasHeight - this.radius || this.x + this.vx < this.radius) {
    this.vx = -this.vx;
  }
  if (this.y + this.vy > this.canvasHeight - this.radius) {
    this.vx = 0;
    this.vy = 0;
  }
};

Ball.prototype.barBounce = function (bar) {
  var barTop = this.canvasHeight - bar.height;
  var barLeftMargin = bar.x;
  var barRightMargin = bar.x + bar.width;
  var ballBottom = this.y + this.radius;
  var ballX = this.x;
  if (ballBottom >= barTop && ballX + this.radius >= barLeftMargin && ballX - this.radius <= barRightMargin) {
    this.vy = - this.vy;
  }

};
