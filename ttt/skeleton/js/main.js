const View = require("./ttt-view.js");
const Game = require("./game.js");

$( () => {
  let game = new Game();
  let board = $("figure.ttt");
  let view = new View(game, board);
  // Your code here
});
