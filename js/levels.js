  // //green, cyan, yellow, pink, paleta que paree de bebe
    // this.colors = ['#b0ff00','#00ffd2', '#fdff00', '#ff99fa'];
  // this.lights = ['#d7ff7f', '#99ffed', '#feff99', '#ff00f4'];
  // this.shadows = ['#587f00', '#007f69',  '#7e7f00', '#7f007a'];


function Levels (canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  // //red, yellow, violet, turquoise
  // this.colors = ['#FF451E', '#FFE11E', '#ff65f8', '#17C759'];
  // this.lights = ['#FF8C74', '#FFEC74', '#ffc1fc', '#64DD91'];
  // this.shadows = ['#BB2000', '#BBA200',  '#993c94', '#008833'];  

  
  this.colors = ['#fffa00','#6aff00','#00fff2','#ff3877','#ff7728'];
  this.lights = ['#fffc72','#9eff59', '#72fff7', '#ff7fa7', '#ff9e66'];
  this.shadows= ['#7f7d00', '#357f00', '#007f79', '#7f1c3b', '#7f3b14'];

  this.level1 = [];
  this.level2 = [];
  this.level3 = [];
  this.level4 = [];
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
  valueX = 80;
  valueY = 60;
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
        this.level1.push(newBrick);
        valueX += 54;
        }
      if (newColor < this.colors.length-1){
        newColor++;
      }
      else {newColor = 0;}
      valueX = 80;
      valueY += 21;
    }
};

Levels.prototype.generateLevel2 = function () {
  this.level2 = [];
  valueX = 80;
  valueY = 60;
  for(var i = 0; i < 12; i++) { //filas
      var rowLenght = 12;
      for(var j = 0; j < rowLenght-i; j++){ //columnas
        var r = Math.floor(Math.random()*5);
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
        valueX += 54;
        }

      valueX = 80;
      valueY += 21;
    }
};


Levels.prototype.generateLevel3 = function () {
  this.level3 = [];
  valueX = 80;
  valueY = 60;
  var newColor = 0;
  for(var i = 0; i < 5; i++) {                          //rows
      for(var j = 0; j < 12; j++){                    //columns
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
         valueX += 54;
        }
        if (newColor < this.colors.length-1){
          newColor++;
        }
        else {newColor = 0;}
        valueX = 80;
        valueY += 21;
    }
      unbvalueX = 0;
      for(var unbj = 0; unbj < 10; unbj++){
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
           this.level3.push(unbnewBrick);
           unbvalueX += 53;
           if (unbvalueX == 265) {unbvalueX = 535;}
          }
};
Levels.prototype.generateLevel4 = function () {
  this.level4 = [];
  valueX = 197;
  valueY = 112;
  var newColor = 0;
  for(var i = 0; i < 7; i++) {                          //rows
      for(var j = 0; j < 8; j++){                    //columns
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
         this.level4.push(newBrick);
         valueX += 54;
        }
        if (newColor < this.colors.length-1){
          newColor++;
        }
        else {newColor = 0;}
        valueX = 197;
        valueY += 21;
    }
    //fila de abajo del unb
      unbvalueX = 116;
      for(var unbj = 0; unbj < 11; unbj++){
          var unbnewBrick = new Brick({
            color: '#878787',
            colorShadow: '#6d6d6d',
            colorLight: '#d6d6d6',
            width:50,
            height:20,
            x:unbvalueX,
            y:290,
            type:'unb',
          });
           this.level4.push(unbnewBrick);
           unbvalueX += 53;
      }
      //fila de arriba del unb
      unbvalueX = 116;
      for(var unbj = 0; unbj < 8; unbj++){
          var unbnewBrick = new Brick({
            color: '#878787',
            colorShadow: '#6d6d6d',
            colorLight: '#d6d6d6',
            width:50,
            height:20,
            x:unbvalueX,
            y:70,
            type:'unb',
          });
           this.level4.push(unbnewBrick);
           unbvalueX += 53;
           if (unbvalueX == 328) {unbvalueX = 487;}
      }
      //fila laterla izq del unb
      unbvalueX = 116;
      unbvalueY = 270;
      for(var unbj = 0; unbj < 10; unbj++){
          var unbnewBrick = new Brick({
            color: '#878787',
            colorShadow: '#6d6d6d',
            colorLight: '#d6d6d6',
            width:50,
            height:20,
            x:unbvalueX,
            y:unbvalueY,
            type:'unb',
          });
           this.level4.push(unbnewBrick);
           unbvalueY -= 20;
      }
      //fila laterla der del unb
      unbvalueX = 646;
      unbvalueY = 270;
      for(var unbj = 0; unbj < 10; unbj++){
          var unbnewBrick = new Brick({
            color: '#878787',
            colorShadow: '#6d6d6d',
            colorLight: '#d6d6d6',
            width:50,
            height:20,
            x:unbvalueX,
            y:unbvalueY,
            type:'unb',
          });
           this.level4.push(unbnewBrick);
           unbvalueY -= 20;
      }
};
