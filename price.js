function Price (brickX, brickY) {
  this.x = brickX;
  this.y = brickY;
  this.vy = 4;
  this.width = 25;
  this.height = 10;
}

// Price.prototype.downMotion = function () {
//   this.y += this.vy;
// };
function PriceBarLong (brickX, brickY) {
  this.x = brickX;
  this.y = brickY;
  this.vy = 4;
  this.width = 45;
  this.height = 20;
  this.color = 'green' ;
  this.text = 'BAR +';
  this.type = 'barlong';
  this.radius = 10;
}

function PriceBarShort (brickX, brickY) {
  this.x = brickX;
  this.y = brickY;
  this.vy = 4;
  this.width = 45;
  this.height = 20;
  this.color = 'red' ;
  this.text = 'BAR -';
  this.type = 'barshort';
  this.radius = 10;
}

function PriceNewBall (brickX, brickY) {
  this.x = brickX;
  this.y = brickY;
  this.vy = 4;
  this.width = 45;
  this.height = 20;
  this.color = 'blue' ;
  this.text = 'BALL';
  this.type = 'newball';
  this.radius = 10;
}
