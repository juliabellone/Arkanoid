function Game(options) {
  this.ball = options.ball;
  //this.bar = options.bar;
  this.rows = options.rows;
  this.columns = options.columns;
  this.color = options.color;
  this.ctx = options.ctx;
  this.canvas = options.canvas;
}

Game.prototype._drawBoard = function () {
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++){
    for(var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
    }
  }
};

Game.prototype._drawBall = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
  this.ctx.closePath();
  this.ctx.fillStyle = this.ball.color;
  this.ctx.fill();
};

Game.prototype.start = function () {
  this._drawBoard();
  this._drawBall();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._update = function () {
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  this._drawBoard();
  this._drawBall();
  this.ball.x += this.ball.vx;
  this.ball.y += this.ball.vy;
  if (this.ball.y + this.ball.vy > this.canvas.height - 15 || this.ball.y + this.ball.vy < 15) {
    this.ball.vy = -this.ball.vy;
  }
  if (this.ball.x + this.ball.vx > this.canvas.height - 15 || this.ball.x + this.ball.vx < 15) {
    this.ball.vx = -this.ball.vx;
  }
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};
