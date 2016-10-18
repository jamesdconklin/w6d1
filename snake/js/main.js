const SnakeView = require("./snake-view.js");
const Board = require("./board.js");


$( () => {
  let board = new Board();
  let $el = $('figure.snake');
  new SnakeView(board, $el);
  // Your code here
});
