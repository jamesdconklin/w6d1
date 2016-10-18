const Board = require('./board.js')

class SnakeView {
  constructor(board, $el){
    this.board = board;
    this.$el = $el;
    this.setUpBoard();
    this.render();
    this.addListeners();
  }

  setUpBoard(){
    console.log(this.board);
    for (var i = 0; i < 20; i++) {
      let $row = $('<ul></ul>');
      for (var j = 0; j < 20; j++) {
        let $cell = $('<li class="square"></li>');
        $cell.data("x", j);
        $cell.data("y", i);

        $row.append($cell);
      }

      this.$el.append($row)
    }

  }

  render(){
    let $squares = $('li');
    $squares.removeClass("snake");
    $squares.removeClass("apple");
    let board = this.board;
    $squares.each(function(index) {
      let $cell = $(this);
      let x = $cell.data('x');
      let y = $cell.data('y');
      if (board.snake.contains([y,x])) {
        $cell.addClass("snake");
      } else if (board.findApple([y,x])) {
        $cell.addClass("apple");
      }
    });

  }

  addListeners() {
    let snake = this.board.snake;
    let view = this;
    window.setInterval(
      function() {
        if (snake.move()) {

        } else {
          window.alert("CRASH");
          snake.dir = [0,0];

        }
        view.render();
      }, 300
    );
  }

}

module.exports = SnakeView;
