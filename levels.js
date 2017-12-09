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

// Levels.prototype.generateLevel1 = function () {
//   this.level1 = [];
//   valueX = 40;
//   valueY = 40;
//   var newColor = 0;
//   for(var i = 0; i < 7; i++) {
//       for(var j = 0; j < 12; j++){
//         var newBrick = new Brick({
//           color: this.colors[newColor],
//           colorShadow: this.shadows[newColor],
//           colorLight: this.lights[newColor],
//           width:50,
//           height:20,
//           x:valueX,
//           y:valueY
//         });
//         this.level1.push(newBrick);
//         valueX += 60;
//         }
//       if (newColor < this.colors.length-1){
//         newColor++;
//       }
//       else {newColor = 0;}
//       valueX = 40;
//       valueY += 25;
//     }
// };

Levels.prototype.generateLevel1 = function () {
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
          y:valueY,
          type:'normal',
        });
         this.level1.push(newBrick);
         valueX += 60;
        }
      valueX = 40;
      valueY += 25;
    }
      unbvalueX = 0;
      for(var unbj = 0; unbj < 13; unbj++){
          var unbnewBrick = new Brick({
            color: '#878787',
            colorShadow: '#6d6d6d',
            colorLight: '#d6d6d6',
            width:50,
            height:20,
            x:unbvalueX,
            y:230,
            type:'unb',
          });
           this.level1.push(unbnewBrick);
           unbvalueX += 54;
           if (unbvalueX == 270) {unbvalueX = 530;}
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
          y:valueY,
          type:'normal',
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
          y:valueY,
          type:'normal',
        });
        this.level3.push(newBrick);
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
