var game;
$(document).ready(function(){

  var canvas = document.getElementById("arkanoid");
  var ctx = canvas.getContext("2d");
  //como parametro le pasamos directamente un objeto
  game = new Game({
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    color: '#dfdfdf',
    brickRows: 6,
    brickColumns: 5,
    bricksArray: [],
    ball: new Ball(canvas.width, canvas.height),
    bar: new Bar(canvas.width, canvas.height),
    ctx: ctx,
    intervalGame: null,
    status: null,
    levels: new Levels(canvas.width, canvas.height),
    level: 1,
  });
  game.start();


});
