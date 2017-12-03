function Brick (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.color = 'red';
  this.brickColumns = 8;
  this.brickRows = 5;
  this.width = (this.canvasWidth-80)/this.brickColumns;
  this.height = 25;
  this.x = null;
  this.y = null;
  this.positions = [];
}

Brick.prototype.generatePositionsBricks = function () {
  var valueX = 40; // valor inicial al que le sumaremos una constante
  var valueY = 40;
  for(var i = 0; i < this.brickRows; i++) {
      for(var j = 0; j < this.brickColumns; j++){
        this.positions.push({x:valueX,y:valueY});
        valueX +=this.width;
      }
      valueX = 40;
      valueY += 30;
      console.log(this.positions);
      console.log(i);
    }
  };
