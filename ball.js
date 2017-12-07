function Ball (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.radius = 10;
  this.x = null;
  this.y = null;
  this.color = '#2e7d32';
  this.vx = 0;
  this.vy = 0;
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
};

Ball.prototype.hitBottom = function () {
  if (this.y + this.vy > this.canvasHeight - this.radius) {
    this.vx = 0;
    this.vy = 0;
    console.log('gameOver');
    return true;
  }

};


Ball.prototype.barBounce = function (bar) {
  var ballX = this.x;
  var ballY = this.y;
  var ballRadius = this.radius;

  var barX = bar.x;
  var barY = bar.y;
  var barWidth = bar.width;
  var barHeight = bar.height;


      var distX = Math.abs(ballX - barX - barWidth / 2);
      var distY = Math.abs(ballY - barY - barHeight / 2);

      if (distX > (barWidth / 2 + ballRadius)) {
          return {value: false, ballX: ballX, barX: barX};
      }
      if (distY > (barHeight / 2 + ballRadius)) {
          return {value: false, ballX: ballX, barX: barX};
      }
      if (distX <= (barWidth / 2)) {
          return {value: true, ballX: ballX, barX: barX};
          }
      if (distY <= (barHeight / 2)) {
          return {value: true, ballX: ballX, barX: barX};
      }

      var dx = distX - barWidth / 2;
      var dy = distY - barHeight / 2;
      if (dx * dx + dy * dy <= (ballRadius * ballRadius)){
        return {value: true, ballX: ballX, barX: barX};
      } else {
        return {value: false, ballX, barX};
      }

};
