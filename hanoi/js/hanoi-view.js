class HanoiView {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;
    this.from = undefined;
    this.to = undefined;
    this.setupTowers();
    this.render();
    this.addClickHandlers();
  }

  setupTowers() {
    for (var i = 0; i < 3; i++) {
      let $list = $("<ul></ul>")
      $list.data("stack-id", i);
      this.$el.append($list);
    }
  }

  render() {
    let $lists = $('ul');
    for (var i = 0; i < 3; i++) {

      let tower = this.game.towers[i];
      console.log(tower);
      let $tower = $($lists[i]);
      $tower.empty();
      for (var k = 0; k < (3 - tower.length); k++) {
        $tower.append($("<li class='dummy'> </li>"));
      }
      for (var j = tower.length - 1; j >= 0; j--) {
        let $disc = $('<li></li>');
        $disc.addClass(`disc-${this.game.towers[i][j]}`);
        if (this.game.isWon()) {
          $disc.addClass("won");
        }
        $tower.append($disc);
      }
      console.log($tower.length)
    }
  }

  addClickHandlers() {
    let $towers = $('ul');
    let view = this;
    $towers.on("click", function(event){
      let $tower = $(event.currentTarget);
      console.log($tower);
      view.clickTower($tower);
    })

  }

  clickTower($tower) {
    if (this.from){
      this.to = $tower;
      if(!this.game.move(this.from.data("stack-id"), this.to.data("stack-id"))){
        window.alert("Invalid move!");
      }
      this.to = undefined;
      this.from.removeClass("from");
      this.from = undefined;
    } else {
      this.from = $tower;
      $tower.addClass("from");
    }
    if (this.game.isWon()){
      this.render();
      window.alert("Congrats, you win!");
      $("ul").off();
    }
    this.render();
  }
}

module.exports = HanoiView;
