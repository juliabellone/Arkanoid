function Brick (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.color = 'red';
  this.brickRows = 8;
  this.width = (this.canvasWidth-80)/this.brickRows;
  this.height = 25;
  this.x = null;
  this.y = null;
  this.positions = [];
}

Brick.prototype.generatePositionsBricks = function () {
  var valueY = 40;
  var valueX = 40; // valor inicial al que le sumaremos una constante
  var i = 0;
  do {
    this.positions.push({x:valueX,y:valueY}); // mas 46
    valueX +=this.width;
    i++;
  } while (i<this.brickRows);

};
