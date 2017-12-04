// function Brick (canvasWidth, canvasHeight) {
//   this.canvasWidth = canvasWidth;
//   this.canvasHeight = canvasHeight;
//   this.color = 'red';
//   this.brickColumns = 8;
//   this.brickRows = 5;
//   this.width = (this.canvasWidth-80)/this.brickColumns;
//   this.height = 25;
//   this.x = null;
//   this.y = null;
//   this.bricksArray = [];
// }

function Brick(options) {
  this.color = options.color;
  this.width = options.width;
  this.height = options.height;
  this.x = options.x;
  this.y = options.y;
  //this.brickType = options.brickType;
}
