function Game(options) {
  this.ball = options.ball;
  this.bar = options.bar;
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
Game.prototype._drawBar = function () {
  this.ctx.fillStyle = this.bar.color;
  this.ctx.fillRect(this.bar.x, this.bar.y, this.bar.width, this.bar.height);
};
var keys = [];
Game.prototype._assignControlKeys = function () {

  window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });
  window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });

  if (keys[37]) {
    this.bar.goLeft();
  }

  if (keys[39]) {
    this.bar.goRight();
  }
  //console.log(keys);
};

Game.prototype.start = function () {
  this._assignControlKeys();
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._update = function () {
  this._assignControlKeys();
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this.ball.bounce();
  //bounce with Bar
  // if (this.ball.barBounce(this.bar)){
  //
  // }
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};
