$(document).ready(function(){
  var game;
  var canvas = document.getElementById("arkanoid");
  var ctx = canvas.getContext("2d");

  //como parametro le pasamos directamente un objeto
  game = new Game({
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    color: '#E3D4AB',
    brickRows: 5,
    brickColumns: 8,
    bricksArray: [],
    ball: new Ball(canvas.width, canvas.height),
    bar: new Bar(canvas.width, canvas.height),
    ctx: ctx,
    canvas: canvas,
  });
  game.start();
});
