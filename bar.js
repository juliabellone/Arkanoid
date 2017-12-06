function Bar (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.color = '#2e7d32';
  this.width = 125;
  this.height = 15;
  this.x = this.canvasWidth/2 - this.width/2;
  this.y = this.canvasHeight - this.height;
  this.vx = 0;
  this.maxSpeed = 25;
  this.direction = null; //se puede usar para botar diferente segun la direccion de la barra y la tecla pulsada
}



//barra choca contra las paredes
Bar.prototype._barLimits = function () {
  if (this.x < 0 ) {
    this.x = 0;
  }
  if (this.x + this.width > this.canvasWidth) {
    this.x = this.canvasWidth - this.width;
  }
};

Bar.prototype.goLeft = function () {
  if (this.direction == 'right') {
    this.vx = 0;
  }
  this.direction = 'left';
  this.x = this.x + this.vx;
  if (this.vx > -this.maxSpeed) {
    this.vx -=0.7;
  }
this._barLimits();
};

Bar.prototype.goRight = function () {
  if (this.direction == 'left') {
    this.vx = 0;
  }
  this.direction = 'right';
  this.x = this.x + this.vx;
  if (this.vx < this.maxSpeed){
    this.vx +=0.7;
    // console.log("esto es x "+this.x);
    // console.log("derecha "+this.vx);
  }
this._barLimits();
};
