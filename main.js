$(document).ready(function(){
  var game;
  var canvas = document.getElementById("arkanoid");
  var ctx = canvas.getContext("2d");

  //como parametro le pasamos directamente un objeto
  game = new Game({
    ball: new Ball(),
    // bar: new Bar,
    rows: canvas.width / 10,
    columns: canvas.height / 10,
    color: '#E3D4AB',
    ctx: ctx,
    canvas: canvas,
  });
  game.start();
});
