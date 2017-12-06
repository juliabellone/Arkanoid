$(document).ready(function(){
  var game;
  var canvas = document.getElementById("arkanoid");
  var ctx = canvas.getContext("2d");
  //como parametro le pasamos directamente un objeto
  game = new Game({
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    color: '#dfdfdf',
    brickRows: 5,
    brickColumns: 5,
    bricksArray: [],
    ball: new Ball(canvas.width, canvas.height),
    bar: new Bar(canvas.width, canvas.height),
    ctx: ctx,
    canvas: canvas,
    intervalGame: null,
    status: null,
    level: 1,
  });
  game.start();

  if (game.newLevel()) {
    console.log ('hola');
    game = new Game({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      color: '#dfdfdf',
      brickRows: 5,
      brickColumns: 5,
      bricksArray: [],
      ball: new Ball(canvas.width, canvas.height),
      bar: new Bar(canvas.width, canvas.height),
      ctx: ctx,
      canvas: canvas,
      intervalGame: null,
      status: null,
      level: 1,
    });
    game.start();
  }



  //
  // if (game.status !== null) {
  //   console.log("algo")
    // game = new Game({
    //   canvasWidth: canvas.width,
    //   canvasHeight: canvas.height,
    //   color: '#dfdfdf',
    //   brickRows: 5,
    //   brickColumns: 11,
    //   bricksArray: [],
    //   ball: new Ball(canvas.width, canvas.height),
    //   bar: new Bar(canvas.width, canvas.height),
    //   ctx: ctx,
    //   canvas: canvas,
    //   intervalGame: null,
    //   status: null,
    //   level: 2,
    // });
    // game.start();

  //}

});
