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
  valueX = 30;
  valueY = 30;
  for(var i = 0; i < 3; i++) {                          //rows
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
         this.level1.push(newBrick);
         valueX += 60;
        }
      valueX = 30;
      valueY += 25;
    }
};

Levels.prototype.generateLevel2 = function () {
  valueX = 30;
  valueY = 30;
  for(var i = 0; i < 12; i++) { //filas
      var rowLenght = 12;
      for(var j = 0; j < rowLenght-i; j++){ //columnas
        var newBrick = new Brick({
          color: this.colors[1],
          colorShadow: this.shadows[1],
          colorLight: this.lights[1],
          width:50,
          height:20,
          x:valueX,
          y:valueY
        });
        this.level2.push(newBrick);
        valueX += 60;
        }

      valueX = 30;
      valueY += 25;
    }
};




  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 100, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 210, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 310, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 410, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 510, y: 40},
  // {color: "red", colorShadow: "#9b0000", colorLight:"#ff8787" , width: 80, height: 30, x: 610, y: 40},
