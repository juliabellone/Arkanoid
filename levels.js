function Levels (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  //red, yellow, violet, turquoise
  this.colors = ['#FF451E', '#FFE11E', '#5927BF', '#17C759'];
  this.lights = ['#FF8C74', '#FFEC74', '#906DD7', '#64DD91'];
  this.shadows = ['#BB2000', '#BBA200',  '#310B80', '#008833'];
  this.level1 = [];
  this.level2 = [];
  this.level3 = [];
}

function Brick(options) {
  this.color = options.color;
  this.colorLight = options.colorLight;
  this.colorShadow = options.colorShadow;
  this.width = options.width;
  this.height = options.height;
  this.x = options.x;
  this.y = options.y;
  this.type = options.type;
}

Levels.prototype.generateLevel1 = function () {
  this.level1 = [];
  valueX = 40;
  valueY = 40;
  var newColor = 0;
  for(var i = 0; i < 7; i++) {
      for(var j = 0; j < 12; j++){
        var newBrick = new Brick({
          color: this.colors[newColor],
          colorShadow: this.shadows[newColor],
          colorLight: this.lights[newColor],
          width:50,
          height:20,
          x:valueX,
          y:valueY
        });
        this.level1.push(newBrick);
        valueX += 60;
        }
      if (newColor < this.colors.length-1){
        newColor++;
      }
      else {newColor = 0;}
      valueX = 40;
      valueY += 25;
    }
};

Levels.prototype.generateLevel2 = function () {
  this.level2 = [];
  valueX = 40;
  valueY = 40;
  for(var i = 0; i < 12; i++) { //filas
      var rowLenght = 12;
      for(var j = 0; j < rowLenght-i; j++){ //columnas
        var r = Math.floor(Math.random()*4);
        var newBrick = new Brick({
          color: this.colors[r],
          colorShadow: this.shadows[r],
          colorLight: this.lights[r],
          width:50,
          height:20,
          x:valueX,
          y:valueY
        });
        this.level2.push(newBrick);
        valueX += 60;
        }

      valueX = 40;
      valueY += 25;
    }
};

Levels.prototype.generateLevel3 = function () {
  this.level3 = [];
  valueX = 40;
  valueY = 40;
  for(var i = 0; i < 4; i++) {                          //rows
      for(var j = 0; j < 12; j++){                    //columns
        var newBrick = new Brick({
          color: this.colors[i],
          colorShadow: this.shadows[i],
          colorLight: this.lights[i],
          width:50,
          height:20,
          x:valueX,
          y:valueY
        });
         this.level3.push(newBrick);
         valueX += 60;
        }
      valueX = 40;
      valueY += 25;
    }
};



  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 100, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 210, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 310, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 410, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 510, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 610, y: 40},
