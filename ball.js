function Ball (canvasWidth, canvasHeight) {
  this.x = 100;
  this.y = 300;
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
          return false;
      }
      if (distY > (barHeight / 2 + ballRadius)) {
          return false;
      }

      if (distX <= (barWidth / 2)) {
          return true;
      }
      if (distY <= (barHeight / 2)) {
          return true;
      }

      var dx = distX - barWidth / 2;
      var dy = distY - barHeight / 2;
      return (dx * dx + dy * dy <= (ballRadius * ballRadius));
};

// Snake.prototype.collidesWith = function (position) {
//   return this.body.some(function(bodyPiece) {
//     return bodyPiece.row === position.row && bodyPiece.column === position.column;
//   });
// };

Ball.prototype.bricksCollision = function (bricksArray) {
  var that = this;
  return bricksArray.some(function(brick) {
    var ballX = that.x;
    var ballY = that.y;
    var ballRadius = that.radius;
    var brickX = brick.x;
    var brickY = brick.y;
    var brickWidth = brick.width;
    var brickHeight = brick.height;
    var distX = Math.abs(ballX - brickX - brickWidth / 2);
    var distY = Math.abs(ballY - brickY - brickHeight / 2);

        if (distX > (brickWidth / 2 + ballRadius)) {
            return false;
        }
        if (distY > (brickHeight / 2 + ballRadius)) {
            return false;
        }
        if (distX <= (brickWidth / 2)) {
            return true;
        }
        if (distY <= (brickHeight / 2)) {
            return true;
        }
        var dx = distX - brickWidth / 2;
        var dy = distY - brickHeight / 2;
        console.log("esquina");
        return (dx * dx + dy * dy <= (ballRadius * ballRadius));
  });
  };

// return true if the rectangle and circle are colliding
// Ball.prototype.bricksCollision = function (bricksArray) {
//   for (i=0; i<bricksArray.length; i++){
//     console.log(i);
//     var ballX = this.x;
//     var ballY = this.y;
//     var ballRadius = this.radius;
//     var brickX = bricksArray[i].x;
//     var brickY = bricksArray[i].y;
//     var brickWidth = bricksArray[i].width;
//     var brickHeight = bricksArray[i].height;
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
//         return (dx * dx + dy * dy <= (ballRadius * ballRadius));
//     }
//   };
//
// Ball.prototype.bricksCollision = function (bricksArray) {
//   var that = this;
//   return bricksArray.forEach(function(brick){
//     //console.log(that.x);
//     var ballX = that.x;
//     var ballY = that.y;
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
//         return (dx * dx + dy * dy <= (ballRadius * ballRadius));
//   });
// };
//};.e.prototype.collidesWith = function (position) {
//   return this.body.some(function(bodyPiece) {
//     return bodyPiece.row === position.row && bodyPiece.column === position.column;
//   });
// }
//
// Snake.prototype.hasEatenFood = function (food) {
//   return this.body[0].row === food.row && this.body[0].column === food.column;
// };
