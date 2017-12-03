$(document).ready(function(){
  var game;
  var canvas = document.getElementById("arkanoid");
  var ctx = canvas.getContext("2d");

  //como parametro le pasamos directamente un objeto
  game = new Game({
    rows: canvas.width / 10, //quizas no lo use y se puede borrar
    columns: canvas.height / 10, //quizas no lo use y se puede borrar
    ball: new Ball(canvas.width, canvas.height),
    bar: new Bar(canvas.width, canvas.height),
    color: '#E3D4AB',
    ctx: ctx,
    canvas: canvas,
    bricks: new Brick(canvas.width, canvas.height),
  });
  game.start();
});
