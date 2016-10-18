class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  }

  bindEvents() {
    let game = this.game;
    $('li').on("click", function(event) {
      // console.log(event.currentTarget)
      let $square = $(event.currentTarget);
      let x = $square.data('x');
      let y = $square.data('y');
      let mark = game.currentPlayer;
      try {
        game.playMove([y,x]);
        $square.addClass("marked");
        $square.addClass(mark);
        $square.text(mark.toUpperCase());
      }
      catch(err){
        window.alert("Invalid move");
      }
      if (game.isOver()) {
        let winner = game.board.winner();
        if (winner) {
          window.alert(`${winner.toUpperCase()} wins!`);
        } else {
          window.alert("It's a draw");
        }
        $('li').off();
      }
    });
  }

  makeMove($square) {}

  setupBoard() {
    let $grid = $("<ul></ul>");
    for (var i = 0; i < 9; i++) {
      let $square = $("<li></li>");
      $square.data('x', i % 3);
      $square.data('y',  Math.floor(i/3));
      $grid.append($square);

    }
    this.$el.append($grid);
    this.bindEvents();
  }
}

module.exports = View;
