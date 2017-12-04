function Game(options) {
  this.canvasWidth = options.canvasWidth;
  this.canvasHeight = options.canvasHeight;
  this.ball = options.ball;
  this.bar = options.bar;
  this.brickColumns = options.brickColumns;
  this.brickRows = options.brickRows;
  this.bricksArray = options.bricksArray;
  this.color = options.color;
  this.ctx = options.ctx;
  this.canvas = options.canvas;
}
Game.prototype._generatePositionsBricks = function () {
  var valueX = 40; // valor inicial al que le sumaremos una constante
  var valueY = 40;
  for(var i = 0; i < this.brickRows; i++) {
      for(var j = 0; j < this.brickColumns; j++){
        var newBrick = new Brick({
          color:"red",
          width:(this.canvasWidth-80)/this.brickColumns,
          height:25,
          x:valueX,
          y:valueY,
        });
         this.bricksArray.push(newBrick);
         valueX +=(this.canvasWidth-80)/this.brickColumns;
      }
      valueX = 40;
      valueY += 30;
    }
  console.log(this.bricksArray);
  };
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
Game.prototype._drawBricks = function () {
  for (i=0; i<this.bricksArray.length; i++){
    //console.log(this.bricksArray);
    this.ctx.fillStyle = this.bricksArray[i].color;
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y, this.bricksArray[i].width-8, this.bricksArray[i].height);
  }
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
  this._generatePositionsBricks();
  this._drawBricks();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._update = function () {
  this._assignControlKeys();
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  this.ball.bounce();
  //bounce with Bar
  this.ball.barBounce(this.bar);
  this.ball.barBounceBricks(this.bricks);
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};
