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
  this.price = options.price;
  this.pricesArray = options.pricesArray;
  this.ballsArray = options.ballsArray;
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
  this.ballsArray.push(this.ball);

};

Game.prototype._update = function () {
  //console.log(this.pricesArray);
  console.log(this.ballsArray);
  this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
  if (this.status == 'win' || this.status == null){
      this._launchStatus();
  }
  this._drawBoard();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  this._drawPrices();
  this._bounce();
  if(this._hitBottom()) {
    this.status = 'gameOver';
  }

  //bounce with Bar
  this._barBounce();

  // if(this._barBounce(this.bar).value){
  //   this.ballsArray.forEach(function (ball) {
  //     var ballX = ball.x;
  //     var barX = this.bar.x;
  //     var barX1 = this.bar.x + (this.bar.width/5);
  //     var barX2 = this.bar.x + (this.bar.width/5)*2;
  //     var barX3 = this.bar.x + (this.bar.width/5)*3;
  //     var barX4 = this.bar.x + (this.bar.width/5)*4;
  //
  //     if (ballX > barX && ballX < barX1) {
  //       if (ball.vx > 0) {
  //         ball.vx = -ball.vx;
  //       } else {
  //         ball.vx = ball.vx*1.6;
  //       }
  //     }
  //     if (ballX > barX1 && ballX < barX2) {
  //       ball.vx = ball.vx*0.7;
  //     }
  //     if (ballX > barX2 && ballX < barX3) {
  //       ball.vx = ball.vx*0.3;
  //     }
  //     if (ballX > barX3 && ballX < barX4) {
  //       ball.vx = ball.vx*0.7;
  //     }
  //     if (ballX > barX4) {
  //       if (ball.vx < 0) {
  //         ball.vx = -ball.vx;
  //       } else {
  //         ball.vx = ball.vx*1.6;
  //       }
  //     }
  //     ball.vy = - ball.vy;
  //   }.bind(this));
  // }

  this._maxMinSpeed();
  this._bricksCollision();

  if (!this._checkIfWin()) {
    this.status = 'win';
    this._win();
  }
  //functions of the prices
  this.pricesDownMotion();
  this._deletePrice();
  this._priceTouchBar();
  this._assignControlKeys();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
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
  this.ball.vy = -5;
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

//---------------BALL FUNCTIONS---------------//

//Defines balls speed and bounce against walls
Game.prototype._bounce = function () {
  this.ballsArray.forEach(function (ball) {
    //acceleration of the ball
    ball.x += ball.vx;
    ball.y += ball.vy;
    //bounce of the ball
    if (ball.y + ball.vy < ball.radius) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > this.canvasWidth - ball.radius || ball.x + ball.vx < ball.radius) {
      ball.vx = -ball.vx;
    }
  }.bind(this));
};

//Deletes a ball from array if it hits bottom. Except if it's the last one.
Game.prototype._hitBottom = function () {
  this.ballsArray.forEach(function (ball, index, array) {
    if (ball.y + ball.vy > this.canvasHeight - ball.radius) {
      if (array.length == 1) {
        this.vx = 0;
        this.vy = 0;
        return true;
      }
      if (array.length > 1) {
        array.splice(index,1);
      }
    }
  }.bind(this));
};

//Defines balls max and min speeds
Game.prototype._maxMinSpeed = function () {
  this.ballsArray.forEach(function (ball, index, array) {
    if (ball.vx > 0 && ball.vx > 8) {
      ball.vx = 8;
    }
    if (ball.vx > 0 && ball.vx < 4) {
      ball.vx = 4;
    }
    if (ball.vx < 0 && ball.vx < -8) {
      ball.vx = -8;
    }
    if (ball.vx < 0 && ball.vx > -4) {
      ball.vx = -4;
    }
  }.bind(this));
};

//Defines bouncing of Bar and Balls
Game.prototype._barBounce = function () {
  this.ballsArray.forEach(function (ball) {
    var ballX = ball.x;
    var ballY = ball.y;
    var ballRadius = ball.radius;
    var barX = this.bar.x;
    var barY = this.bar.y;
    var barWidth = this.bar.width;
    var barHeight = this.bar.height;
        var distX = Math.abs(ballX - barX - barWidth / 2);
        var distY = Math.abs(ballY - barY - barHeight / 2);
        if (distX > (barWidth / 2 + ballRadius)) {
            return false;
        }
        if (distY > (barHeight / 2 + ballRadius)) {
            return false;
        }
        if (distX <= (barWidth / 2)) {
            this._barBounceEffect(ball);
            return true;
        }
        if (distY <= (barHeight / 2)) {
            this._barBounceEffect(ball);
            return true;
        }
        else {
          this._barBounceEffect(ball);
          return true;
        }
  }.bind(this));
};

Game.prototype._barBounceEffect = function (ball) {
    var ballX = ball.x;
    var barX = this.bar.x;
    var barX1 = this.bar.x + (this.bar.width/5);
    var barX2 = this.bar.x + (this.bar.width/5)*2;
    var barX3 = this.bar.x + (this.bar.width/5)*3;
    var barX4 = this.bar.x + (this.bar.width/5)*4;

    if (ballX > barX && ballX < barX1) {
      if (ball.vx > 0) {
        ball.vx = -ball.vx;
      } else {
        ball.vx = ball.vx*1.6;
      }
    }
    if (ballX > barX1 && ballX < barX2) {
      ball.vx = ball.vx*0.7;
    }
    if (ballX > barX2 && ballX < barX3) {
      ball.vx = ball.vx*0.3;
    }
    if (ballX > barX3 && ballX < barX4) {
      ball.vx = ball.vx*0.7;
    }
    if (ballX > barX4) {
      if (ball.vx < 0) {
        ball.vx = -ball.vx;
      } else {
        ball.vx = ball.vx*1.6;
      }
    }
    ball.vy = - ball.vy;
};

Game.prototype._bricksCollision = function () {
  this.ballsArray.forEach(function (ball) {
    var ballX = ball.x;
    var ballY = ball.y;
    var ballRadius = ball.radius;
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
              ball.vy = - ball.vy;
              if(brick.type != 'unb'){
                array.splice(index, 1);
                this._newPrice(brick.x, brick.y);
              }
              return true;
          }
          //toque a izquierda o derecha del ladrillo (eje X)
          if (distY <= (brickHeight / 2)) {
              ball.vx =- ball.vx;
              if(brick.type != 'unb'){
                array.splice(index, 1);
                this._newPrice(brick.x, brick.y);
              }
              return true;
          }
          // var dx = distX - brickWidth / 2;
          // var dy = distY -brickHeight / 2;
          // if(dx * dx + dy * dy <= (ballRadius*ballRadius)){
          //   console.log('diagonal');
          //   // this.ball.vy = - this.ball.vy;
          //   this.ball.vx = - this.ball.vx;
          //   if(brick.type != 'unb'){
          //     array.splice(index, 1);
          //   }
          // }
          // return (dx * dx + dy * dy <= (ballRadius*ballRadius));

    }.bind(this));
  }.bind(this));
  };

  Game.prototype._newPrice = function (brickX, brickY) {
    var random = Math.floor(Math.random() * 3); //0, 1 o 2
      if (random == 1) {
        var random2 = Math.floor(Math.random() * 3);
        //Math.floor(Math.random() * 3);
        switch (random2) {
          case 0: var price = new PriceBarLong(brickX, brickY);
          break;
          case 1: price = new PriceBarShort(brickX, brickY);
          break;
          case 2: price = new PriceNewBall(brickX, brickY);
          break;
        }
        this.pricesArray.push(price);

      }
  };

  Game.prototype.pricesDownMotion = function () {
    if (this.pricesArray.length> 0 ) {
      for (i = 0; i < this.pricesArray.length; i++) {
          this.pricesArray[i].y += this.pricesArray[i].vy;
      }
    }
  };

  // Game.prototype._deletePrice = function() {
  //   if (this.pricesArray.length> 0 ) {
  //     for (i = 0; i < this.pricesArray.length; i++) {
  //         if(this.pricesArray[i].y > this.canvasHeight) {
  //           this.pricesArray.splice(i);
  //         }
  //     }
  //   }
  // };

  Game.prototype._deletePrice = function() {
    this.pricesArray.forEach(function (price, index, array) {
      if(price.y > this.canvasHeight) {
        array.splice(index,1);
      }
    }.bind(this));
  };

  Game.prototype._priceTouchBar = function () {
    this.pricesArray.forEach(function (price, index, array) {
      var priceX = price.x;
      var priceBottom = price.y + price.height;
      if (priceX > this.bar.x && priceX < this.bar.x + this.bar.width && priceBottom >= this.bar.y) {
        switch (price.type) {
          case 'barlong':
          clearTimeout(action);
          this.bar.width = 200;
          var action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 15000);
          break;
          case 'barshort':
          clearTimeout(action);
          this.bar.width = 90;
          action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 15000);
          break;
          case 'newball':
          var newBall = new Ball(this.canvasWidth, this.canvasHeight);
          this.ballsArray.push(newBall);
          break;
        }
        array.splice(index,1);
      }
    }.bind(this));
  };

  // Game.prototype._priceTouchBar = function () {
  //   if (this.pricesArray.length> 0 ) {
  //     for (i = 0; i < this.pricesArray.length; i++) {
  //       var priceX = this.pricesArray[i].x;
  //       var priceBottom = this.pricesArray[i].y + this.pricesArray[i].height;
  //       if(priceX > this.bar.x && priceX < this.bar.x+this.bar.width && priceBottom >= this.bar.y) {
  //           switch (this.pricesArray[i].type) {
  //             case 'barlong':
  //             clearTimeout(action);
  //             this.bar.width = 200;
  //             var action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 15000);
  //             break;
  //             case 'barshort':
  //             clearTimeout(action);
  //             this.bar.width = 90;
  //             action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 15000);
  //             break;
  //             case 'newball':
  //             var newBall = new Ball(this.canvasWidth, this.canvasHeight);
  //             this.ballsArray.push(newBall);
  //             break;
  //           }
  //           this.pricesArray[i].width = 0;
  //       }
  //     }
  //   }
  // };

//---------------DRAWING FUNCTIONS---------------//

Game.prototype._drawBoard = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};

Game.prototype._drawBall = function () {
  this.ballsArray.forEach(function (ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = ball.shadowColor;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(ball.x-1, ball.y-1, ball.radius-2, 0, Math.PI * 2, true);
    this.ctx.fillStyle = ball.mediumColor1;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(ball.x-2, ball.y-2, ball.radius-3, 0, Math.PI * 2, true);
    this.ctx.fillStyle = ball.mediumColor2;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(ball.x-4, ball.y-4, ball.radius-7, 0, Math.PI * 2, true);
    this.ctx.fillStyle = ball.lightColor;
    this.ctx.fill();
  }.bind(this));
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
Game.prototype._drawPrices = function () {
  for (i=0; i<this.pricesArray.length; i++){
    this.ctx.fillStyle = this.pricesArray[i].color;
    this.ctx.fillRect(this.pricesArray[i].x,this.pricesArray[i].y,this.pricesArray[i].width, this.pricesArray[i].height);
    this.ctx.fillStyle = 'white';
    this.ctx.font = "bold 12px Arial";
    this.ctx.fillText(this.pricesArray[i].text, this.pricesArray[i].x + 5, this.pricesArray[i].y + this.pricesArray[i].height - 5 );
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
