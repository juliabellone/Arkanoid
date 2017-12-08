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
  this.intervalGame = options.intervalGame;
  this.status = options.status;
  this.levels = options.levels;
}



// Game.prototype._generatePositionsBricks = function () {
//   var valueX = 0; // la mitad del margen que queramos darle para que los ladrillos queden centrados
//   var valueY = 0;
//   for(var i = 0; i < this.brickRows; i++) {
//       for(var j = 0; j < this.brickColumns; j++){
//         var newBrick = new Brick({
//           color:"red",
//           width:(this.canvasWidth-5*this.brickColumns)/this.brickColumns,
//           height:((this.canvasHeight/3)/this.brickRows),
//           x:valueX,
//           y:valueY
//         });
//          this.bricksArray.push(newBrick);
//          valueX +=(this.canvasWidth)/this.brickColumns+2,5; //margen horizontal de los ladrillos;
//       }
//       valueX = 0;
//       valueY += ((this.canvasHeight/3)/this.brickRows) + 2,5; //margen vertical de los ladrillos
//     }
//   console.log(this.bricksArray);
// };

Game.prototype._drawBoard = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
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
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y, this.bricksArray[i].width, this.bricksArray[i].height);
    //luz ladrillos
    this.ctx.fillStyle = this.bricksArray[i].colorLight;
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y,this.bricksArray[i].width,5);
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y,5,this.bricksArray[i].height);
    //sombra ladrillos
    this.ctx.fillStyle = this.bricksArray[i].colorShadow;
    this.ctx.fillRect(this.bricksArray[i].x,
    (this.bricksArray[i].y + this.bricksArray[i].height)-5,
    this.bricksArray[i].width,
    5);
    this.ctx.fillRect((this.bricksArray[i].x+this.bricksArray[i].width), this.bricksArray[i].y,5,this.bricksArray[i].height);
  }
};

Game.prototype._launchStatus = function () {
  //establece la pelota encima de la barra y hace que la siga;
  this.ball.x = this.canvasWidth/2;
  this.ball.y = this.canvasHeight - this.ball.radius - this.bar.height;
  this.ball.x = this.bar.x + this.bar.width/2;
};
Game.prototype._launchBall = function () {
  //lanza la pelota hacia arriba y cambia el estado de la partida
  this.status = 'playing';
  this.ball.vx = -5;
  this.ball.vy = -7;
};

var keys = [];
Game.prototype._assignControlKeys = function () {


  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      if (this.status == null) {
      this._launchBall();
      } else {
      this._pause();
      }
    }
  }.bind(this);

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
};

// Game.prototype.ballCollisions = function () {
//
// }
Game.prototype.bricksCollision = function () {
  var ballX = this.ball.x;
  var ballY = this.ball.y;
  var ballRadius = this.ball.radius;
  return this.bricksArray.some(function(brick, index, array) {
    var brickX = brick.x;
    var brickY = brick.y;
    var brickWidth = brick.width;
    var brickHeight = brick.height;
    var distX = Math.abs(ballX - brickX - brickWidth/2);
    var distY = Math.abs(ballY - brickY - brickHeight/2);

        if (distX > (brickWidth / 2 + ballRadius)) {
            return false;
        }
        if (distY > (brickHeight / 2 + ballRadius)) {
            return false;
        }
        if (distX <= (brickWidth / 2)) {
            // brick.height = 0;
            // brick.width = 0;
            array.splice(index, 1);
            return true;
        }
        if (distY <= (brickHeight / 2)) {
            // brick.height = 0;
            // brick.width = 0;
            array.splice(index, 1);
            return true;
        }
        var dx = distX - brickWidth / 2;
        var dy = distY -brickHeight / 2;
        return (dx * dx + dy * dy <= (ballRadius*ballRadius));

  }.bind(this));
  };

Game.prototype._pause = function () {

  if (this.status == 'playing'){
      window.cancelAnimationFrame(this.intervalGame);
      this.status = 'pause';
  } else {
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  this.status = 'playing';
  }
};

Game.prototype._win = function () {
 this.status = 'win';
 this.ball.vy = 0;
 this.ball.vx = 0;
};


Game.prototype.start = function () {
  this.levels.generateLevel1();
  this.levels.generateLevel2();
  this.bricksArray = this.levels.level2;
  // for (i=1; i<=this.level; i++) {
  //   this.bricksArray = this.levels.level[i];
  //
  // }this.levels.generateLevel1();

  this._assignControlKeys();
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  //this._generatePositionsBricks();
  this._drawBricks();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};


Game.prototype._update = function () {
  this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
  if (this.status == null){
      this._launchStatus();
  }
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  this.ball.bounce();
  if(this.ball.hitBottom()) {
    this.status = 'gameOver';
  }

  //bounce with Bar
  if(this.ball.barBounce(this.bar).value){
    var ballX = this.ball.barBounce(this.bar).ballX;
    var barX = this.ball.barBounce(this.bar).barX;
    //pelota rebota en el lado izquierdo de la pala
    if(this.ball.vx > 0 && ballX < barX + this.bar.width*0.3) {
      this.ball.vx = - this.ball.vx;
      console.log("izquierda");
    }
    //pelota rebota en el lado derecho de la pala
    if(this.ball.vx < 0 && ballX > barX + this.bar.width*0.7) {
      this.ball.vx = - this.ball.vx;
      console.log("derecha");
    }
    this.ball.vy = - this.ball.vy;
  }

  if(this.bricksCollision(this.bricksArray, this.ball)) {
    this.ball.vy = - this.ball.vy;
  }

  if (this.bricksArray.length == 0) {
    this._win();
    this.level++;
  }

  this._assignControlKeys();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};
