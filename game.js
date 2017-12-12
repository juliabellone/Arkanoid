//---------------CREATE INSTANCE OF GAME---------------//

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
  this.level = options.level;
  this.levels = options.levels;
}

//---------------START AND UPDATE FUNCTIONS---------------//

Game.prototype.start = function () {
  this._assignLevel();
  this._assignControlKeys();
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  this._launchStatus();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));

};

Game.prototype._update = function () {
  // console.log(this.bricksArray);
  // console.log(this._checkIfWin());
  //  console.log(this.level);
  //  console.log(this.status);

  this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
  if (this.status == 'win' || this.status == null){
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
      //console.log("izquierda");
    }
    //pelota rebota en el lado derecho de la pala
    if(this.ball.vx < 0 && ballX > barX + this.bar.width*0.7) {
      this.ball.vx = - this.ball.vx;
      //console.log("derecha");
    }
    this.ball.vy = - this.ball.vy;
  }
  this.bricksCollision();

  // if(this.bricksCollision(this.bricksArray, this.ball)) {
  //   this.ball.vy = - this.ball.vy;
  // }
  //checks if there is any normal bricks left
  if (!this._checkIfWin()) {
    this.status = 'win';
    this._win();
  }

  this._assignControlKeys();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};

Game.prototype._updateBall = function () {
  this._drawBall();
  this.intervalGame = window.requestAnimationFrame(this._updateBall.bind(this));
};
//---------------MAIN GAME FUNCTIONS---------------//

Game.prototype._launchStatus = function () {
  //establece la barra en el centro
  this.x = this.canvasWidth/2 - this.width/2;
  this.y = this.canvasHeight - this.height;
  //establece la pelota encima de la barra y hace que la siga;
  this.ball.x = this.canvasWidth/2;
  this.ball.y = this.canvasHeight - this.ball.radius - this.bar.height;
  this.ball.x = this.bar.x + this.bar.width/2;
  //para la velocidad de la pelota
  this.ball.vx = 0;
  this.ball.vy = 0;
};

Game.prototype._launchBall = function () {
  //lanza la pelota hacia arriba y cambia el estado de la partida
  this.status = 'playing';
  this.ball.vx = -3;
  this.ball.vy = -2.8;
};

Game.prototype._pause = function () {
  if (this.status == 'playing'){
      window.cancelAnimationFrame(this.intervalGame);
      this.status = 'pause';
  } else if (this.status == 'pause') {
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  this.status = 'playing';
  }
};

Game.prototype._win = function () {
 if (this.level < 4){
  this.level++;
  this._assignLevel();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  console.log(this.bricksArray);
 }
};

Game.prototype._assignLevel = function () {
  switch (this.level) {
    case 1:
    this.levels.generateLevel1();
    this.bricksArray = this.levels.level1;
    break;
    case 2:
    this.levels.generateLevel2();
    this.bricksArray = this.levels.level2;
    break;
    case 3:
    this.levels.generateLevel3();
    this.bricksArray = this.levels.level3;
    break;
    case 4:
    this.levels.generateLevel4();
    this.bricksArray = this.levels.level4;
    break;
   }
};
Game.prototype._checkIfWin = function () {
  return this.bricksArray.some(function (brick) {
  return brick.type == 'normal';
  });
};

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
        //toque arriba o abajo del ladrillo (ejeY)
        if (distX <= (brickWidth / 2)) {
          console.log('arrr/aba');
            this.ball.vy = - this.ball.vy;
            if(brick.type != 'unb'){
              array.splice(index, 1);
            }
            return true;
        }
        //toque a izquierda o derecha del ladrillo (eje X)
        if (distY <= (brickHeight / 2)) {
          console.log('izq/der');
            this.ball.vx =- this.ball.vx;
            if(brick.type != 'unb'){
              array.splice(index, 1);
            }
            return true;
        }
        var dx = distX - brickWidth / 2;
        var dy = distY -brickHeight / 2;
        if(dx * dx + dy * dy <= (ballRadius*ballRadius)){
          console.log('diagonal');
          this.ball.vy = - this.ball.vy;
          this.ball.vx = - this.ball.vx;
          if(brick.type != 'unb'){
            array.splice(index, 1);
          }
        }
        return (dx * dx + dy * dy <= (ballRadius*ballRadius));

  }.bind(this));
  };

//---------------DRAWING FUNCTIONS---------------//

Game.prototype._drawBoard = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};

Game.prototype._drawBall = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
  this.ctx.fillStyle = this.ball.shadowColor;
  this.ctx.fill();
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x-1, this.ball.y-1, this.ball.radius-2, 0, Math.PI * 2, true);
  this.ctx.fillStyle = this.ball.mediumColor1;
  this.ctx.fill();
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x-2, this.ball.y-2, this.ball.radius-3, 0, Math.PI * 2, true);
  this.ctx.fillStyle = this.ball.mediumColor2;
  this.ctx.fill();
  this.ctx.beginPath();
  this.ctx.arc(this.ball.x-4, this.ball.y-4, this.ball.radius-7, 0, Math.PI * 2, true);
  this.ctx.fillStyle = this.ball.lightColor;
  this.ctx.fill();
};

Game.prototype._drawBar = function () {
  this.ctx.fillStyle = this.bar.shadowColor;
  this.ctx.fillRect(this.bar.x, this.bar.y, this.bar.width, this.bar.height);
  this.ctx.fillStyle = this.bar.mediumColor1;
  this.ctx.fillRect(this.bar.x, this.bar.y+2.4, this.bar.width, this.bar.height/1.5);
  this.ctx.fillStyle = this.bar.mediumColor2;
  this.ctx.fillRect(this.bar.x, this.bar.y+4, this.bar.width, this.bar.height/2.2);
  this.ctx.fillStyle = this.bar.lightColor;
  this.ctx.fillRect(this.bar.x, this.bar.y+5.4, this.bar.width, this.bar.height/4);

};

Game.prototype._drawBricks = function () {
  var effect = 3;
  for (i=0; i<this.bricksArray.length; i++){
    //console.log(this.bricksArray);
    this.ctx.fillStyle = this.bricksArray[i].color;
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y, this.bricksArray[i].width, this.bricksArray[i].height);
    //luz ladrillos
    this.ctx.fillStyle = this.bricksArray[i].colorLight;
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y,this.bricksArray[i].width,effect);
    this.ctx.fillRect(this.bricksArray[i].x, this.bricksArray[i].y,effect,this.bricksArray[i].height);
    //sombra ladrillos
    this.ctx.fillStyle = this.bricksArray[i].colorShadow;
    this.ctx.fillRect(this.bricksArray[i].x,
    (this.bricksArray[i].y + this.bricksArray[i].height)-effect,
    this.bricksArray[i].width,
    effect);
    this.ctx.fillRect((this.bricksArray[i].x+this.bricksArray[i].width), this.bricksArray[i].y,effect,this.bricksArray[i].height);
  }
};

//---------------ASSIGNING CONTROL KEYS---------------//
var keys = [];
Game.prototype._assignControlKeys = function () {

  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      if (this.status == null || this.status == 'win') {
      this._launchBall();
      } else {
      this._pause();
      }
    }
  }.bind(this);

  document.onkeyup = function (e) {
    if(e.keyCode == 37 || e.keyCode == 39) {
      this.bar.vx = 0;
    }
    //Tecla trampa para pasar de nivel con L
    if (e.keyCode == 76) {
      this.status = 'win';
      this._win();
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
