function Ball (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.radius = 10;
  this.x = null;
  this.y = null;
  this.color = '#2e7d32';
  this.vx = 0;
  this.vy = 0;
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

Ball.prototype.barBounce = function (bar) { //deberia estar en el game ya que hay una parte del rebote d la barra que se hace alli
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

// Snake.prototype.collidesWith = function (position) {
//   return this.body.some(function(bodyPiece) {
//     return bodyPiece.row === position.row && bodyPiece.column === position.column;
//   });
// };

// Ball.prototype.bricksCollision = function (bricksArray) {
//   return bricksArray.some(function(brick) {
//     var ballX = this.x;
//     var ballY = this.y;
//     var ballRadius = this.radius;
//     var brickX = brick.x;
//     var brickY = brick.y;
//     var brickWidth = brick.width;
//     var brickHeight = brick.height;
//     var distX = Math.abs(ballX - brickX - brickWidth / 2);
//     var distY = Math.abs(ballY - brickY - brickHeight / 2);
//
//         if (distX > (brickWidth / 2 + ballRadius)) {
//             return false;
//         }
//         if (distY > (brickHeight / 2 + ballRadius)) {
//             return false;
//         }
//         if (distX <= (brickWidth / 2)) {
//             return true;
//         }
//         if (distY <= (brickHeight / 2)) {
//             return true;
//         }
//         var dx = distX - brickWidth / 2;
//         var dy = distY - brickHeight / 2;
//         console.log("esquina");
//         return (dx * dx + dy * dy <= (ballRadius * ballRadius));
//   }.bind(this));
//   };
///ESTA ES LA BUENA
// Ball.prototype.bricksCollision = function (bricksArray) {
//   return bricksArray.some(function(brick) {
//     var ballX = this.x;
//     var ballY = this.y;
//     var ballRadius = this.radius;
//     var brickX = brick.x;
//     var brickY = brick.y;
//     var brickWidth = brick.width;
//     var brickHeight = brick.height;
//     var distX = Math.abs(ballX - brickX);
//     var distY = Math.abs(ballY - brickY);
//
//         if (distX > (brickWidth / 2 + ballRadius)) {
//             return false;
//         }
//         if (distY > (brickHeight / 2 + ballRadius)) {
//             return false;
//         }
//         if (distX <= (brickWidth / 2)) {
//             return true;
//         }
//         if (distY <= (brickHeight / 2)) {
//             return true;
//         }
//         var hypot = (distX - brickWidth/2)*(distX- brickWidth/2) + (distY - brickHeight/2)*(distY - brickHeight/2);
//         return (hypot <= (ballRadius*ballRadius));
//
//   }.bind(this));
//   };

//};.e.prototype.collidesWith = function (position) {
//   return this.body.some(function(bodyPiece) {
//     return bodyPiece.row === position.row && bodyPiece.column === position.column;
//   });
// }
//
// Snake.prototype.hasEatenFood = function (food) {
//   return this.body[0].row === food.row && this.body[0].column === food.column;
// };
