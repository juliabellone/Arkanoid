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
  this._playMusic();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  this.ballsArray.push(this.ball);

};

Game.prototype._update = function () {
  //console.log(this.status+' level: '+this.level);
  //console.log(this.pricesArray);
  //console.log(this.status);
  //console.log(this.intervalGame);
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
  this._hitBottom();

  if(this.status == 'gameOver') {
    this._gameOver();
  }

  //rebote con la barra
  this._barBounce();
  this._maxMinSpeed();
  this._bricksCollision();

  if (!this._checkIfWin()) {
    this.status = 'win';
    this._win();
  }
  //funciones de los premios
  this.pricesDownMotion();
  this._deletePrice();
  this._priceTouchBar();
  this._assignControlKeys();
  //animation frame
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};

//---------------MAIN GAME FUNCTIONS---------------//

Game.prototype._playMusic = function () {
  myAudio = new Audio("sound/arcade-music-loop.wav");
  myAudio.loop = true;
  myAudio.play();
};

Game.prototype._playBrickSound = function () {
  myAudio2 = new Audio("sound/hit1.wav");
  myAudio2.play();
};

Game.prototype._launchStatus = function () {
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
      myAudio.pause();
  } else if (this.status == 'pause') {
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  this.status = 'playing';
  myAudio.play();
  }
};

Game.prototype._win = function () {
 if (this.level < 4){
  //sube el nivel y dibuja todo de nuevo
  this.level++;
  this._assignLevel();
  this._drawBall();
  this._drawBar();
  this._drawBricks();
  //hace reset del array de pelotas
  this.ballsArray = [];
  this.ballsArray.push(this.ball);
  //hace reset del array de premios
  this.pricesArray = [];
  // deja la barra al tamaño original
  this.bar.width = 125;
 }
 else alert('has ganado el juego!');
};

Game.prototype._gameOver = function () {
  //para la pelota cuando pierdes
  this.ballsArray[0].vx = 0;
  this.ballsArray[0].vy = 0; 
  //alerta de que has perdido y pinta la pantalla de rojo
  this._drawGameOver();
}

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

//Devuelve verdadero si hay algun ladrillo de tipo normal aun en pantalla
Game.prototype._checkIfWin = function () {
  return this.bricksArray.some(function (brick) {
  return brick.type == 'normal';
  });
};

//---------------BALL FUNCTIONS---------------//

//Define la velocidad de la peloa y el rebote contra las paredes
Game.prototype._bounce = function () {
  this.ballsArray.forEach(function (ball) {
    //aceleración de la pelota
    ball.x += ball.vx;
    ball.y += ball.vy;
    //rebote de la pelota
    if (ball.y + ball.vy < ball.radius) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > this.canvasWidth - ball.radius || ball.x + ball.vx < ball.radius) {
      ball.vx = -ball.vx;
    }
  }.bind(this));
};

//Borra una pelota del array cuando toca el suelo. Excepto si se trata de la última
Game.prototype._hitBottom = function () {
  this.ballsArray.forEach(function (ball, index, array) {
    if (ball.y + ball.vy == this.canvasHeight - ball.radius) {
      if (array.length == 1) {
        this.status = 'gameOver';
      }
      if (array.length > 1) {
        array.splice(index,1);
      }

    }
  }.bind(this));
};

//Define las velocidades máximas y mínimas de las pelotas
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

//Define el rebote en la barra y las paredes de las pelotas
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

//Crea el efecto de cambio de velocidad cuando la pelota toca cada parte de la barra (cinco partes diferenciadas)
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
        ball.vx = ball.vx*1.8;
      }
    }
    if (ballX > barX1 && ballX < barX2) {
      ball.vx = ball.vx*0.6;
    }
    if (ballX > barX2 && ballX < barX3) {
      ball.vx = ball.vx*0.2;
    }
    if (ballX > barX3 && ballX < barX4) {
      ball.vx = ball.vx*0.6;
    }
    if (ballX > barX4) {
      if (ball.vx < 0) {
        ball.vx = -ball.vx;
      } else {
        ball.vx = ball.vx*1.8;
      }
    }
    ball.vy = - ball.vy;
};

//Define que los ladrillos se rompan al tocarlos una pelota y que sea llamada la funcion de los premios
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
                this._playBrickSound();
                this._newPrice(brick.x, brick.y);
              }
              return true;
          }
          //toque a izquierda o derecha del ladrillo (eje X)
          if (distY <= (brickHeight / 2)) {
              ball.vx =- ball.vx;
              if(brick.type != 'unb'){
                array.splice(index, 1);
                this._playBrickSound(); 
                this._newPrice(brick.x, brick.y);
              }
              return true;
          }
          //toque en una esquina del ladrillo
          var dx=distX-brickWidth/2;
          var dy=distY-brickHeight/2;
          if (dx*dx+dy*dy<=(ballRadius*ballRadius)){
          ball.vx =- ball.vx;
          if(brick.type != 'unb'){
            array.splice(index, 1);
            this._playBrickSound(); 
            this._newPrice(brick.x, brick.y);
          }
          console.log('esquina');  
          return true;
          };
          
    }.bind(this));
  }.bind(this));
  };

  //Crea un premio una de cada 4 veces que es llamada
  Game.prototype._newPrice = function (brickX, brickY) {
    var random = Math.floor(Math.random() * 4);
      if (random == 1) {
        var random2 = Math.floor(Math.random() * 3);
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

  //mueve los premios hacia abajo
  Game.prototype.pricesDownMotion = function () {
    if (this.pricesArray.length> 0 ) {
      for (i = 0; i < this.pricesArray.length; i++) {
          this.pricesArray[i].y += this.pricesArray[i].vy;
      }
    }
  };

  //Borra los premios del array cuando estan fuera de la vista
  Game.prototype._deletePrice = function() {
    this.pricesArray.forEach(function (price, index, array) {
      if(price.y > this.canvasHeight) {
        array.splice(index,1);
      }
    }.bind(this));
  };

  //Define que pasa cuando un premio toca la barra y que hace cada premio
  Game.prototype._priceTouchBar = function () {
    this.pricesArray.forEach(function (price, index, array) {
      var priceX = price.x;
      var priceBottom = price.y + price.height;
      if (priceX > this.bar.x && priceX < this.bar.x + this.bar.width && priceBottom >= this.bar.y) {
        switch (price.type) {
          case 'barlong':
          clearTimeout(action);
          this.bar.width = 200;
          var action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 10000);
          break;
          case 'barshort':
          clearTimeout(action);
          this.bar.width = 90;
          action = setTimeout(function(){ this.bar.width = 125; }.bind(this), 10000);
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

//---------------DRAWING FUNCTIONS---------------//

Game.prototype._drawBoard = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};

Game.prototype._drawGameOver = function () {
  this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.ctx.fillStyle = '#fff';
  this.ctx.font = "bold 50px Arial";
  this.ctx.fillText('Game Over', 260, 220);
  this.ctx.font = "bold 30px Arial";
  this.ctx.fillText('Press enter to try again', 230, 260);
} 

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
  this.bricksArray.forEach(function(brick){
    this.ctx.fillStyle = brick.color;
    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    //luz ladrillos
    this.ctx.fillStyle = brick.colorLight;
    this.ctx.fillRect(brick.x, brick.y,brick.width,effect);
    this.ctx.fillRect(brick.x, brick.y,effect,brick.height);
    //sombra ladrillos
    this.ctx.fillStyle = brick.colorShadow;
    this.ctx.fillRect(brick.x,
    (brick.y + brick.height)-effect,
    brick.width,
    effect);
    this.ctx.fillRect((brick.x+brick.width), brick.y,effect,brick.height);
  }.bind(this));
};

Game.prototype._drawPrices = function () {
  this.pricesArray.forEach(function (price){
    this.ctx.beginPath()
    this.ctx.fillStyle = price.color;
    this.ctx.moveTo(price.x,price.y+price.radius);
    this.ctx.lineTo(price.x,price.y+price.height-price.radius);
    this.ctx.quadraticCurveTo(price.x,price.y+price.height,price.x+price.radius,+price.y+price.height);
    this.ctx.lineTo(price.x+price.width-price.radius,price.y+price.height);
    this.ctx.quadraticCurveTo(price.x+price.width,price.y+price.height,price.x+price.width,price.y+price.height-price.radius);
    this.ctx.lineTo(price.x+price.width,price.y+price.radius);
    this.ctx.quadraticCurveTo(price.x+price.width,price.y,price.x+price.width-price.radius,price.y);
    this.ctx.lineTo(price.x+price.radius,price.y);
    this.ctx.quadraticCurveTo(price.x,price.y,price.x,price.y+price.radius);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = 'white';
    this.ctx.font = "bold 13px sans-serif";
    this.ctx.fillText(price.text, price.x + 5, price.y + price.height - 5 );
  }.bind(this));
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
    this.ctx.closePath();
  }.bind(this));
};

//---------------ASSIGNING CONTROL KEYS---------------//
var keys = [];
Game.prototype._assignControlKeys = function () {

  //Pausa y despausa el juego con la barra espaciadora
  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      if (this.status == null || this.status == 'win') {
      this._launchBall();
      } else {
      this._pause();
      }
    }
    //Tecla trampa para pasar de nivel con L
    if (e.keyCode == 76) {
      this.status = 'win';
      this._win();
    }
    // //Reinicia el juego desde el nivel uno cuando se pierde con tecla enter
    if (e.keyCode == 13) {
      if (this.status == 'gameOver'){
        this.status = null;
        //Deja el primer nivel y dibuja todo de nuevo
        this.level = 1;
        this._assignLevel();
        this._drawBall();
        this._drawBar();
        this._drawBricks();
        //hace reset del array de pelotas
        this.ballsArray = [];
        this.ballsArray.push(this.ball);
        //hace reset del array de premios y deja la barra al tamaño original
        this.pricesArray = [];
        this.bar.width = 125;
      }
    }
  }.bind(this);

  //Reinicia la velocidad de la barra para evitar problemas al cambiar de dirección
  document.onkeyup = function (e) {
    if(e.keyCode == 37 || e.keyCode == 39) {
      this.bar.vx = 0;
    }
    
    
  }.bind(this);

  //"escucha" las teclas todo el rato paramover la barra de forma fluida
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

//Funcion para el boton de sonido

$(function(){
  
  $(".slider").click(function(){
    $(this).toggleClass("active");
    if ($(this).hasClass("active")){
      //apagar sonido
      myAudio.pause();  
      myAudio = null;
    }
    else {
      //encender sonido
      myAudio = new Audio("sound/arcade-music-loop.wav");
      myAudio.play();  
    }
  });

});

