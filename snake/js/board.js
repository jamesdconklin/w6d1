const Snake = require('./snake.js');

class Board {
  constructor() {
    this.grid = [];
    while(this.grid.length < 20) {
      this.grid.push(new Array(20));
    }

    this.snake = new Snake(this, {});
    this.apples = [];

  }

  findApple(pos) {
    let apple = this.apples.indexOf(pos);
    return apple >= 0;
  }

  eatApple(pos) {
    if(this.findApple(pos)){
      this.apples.splice(pos, 1);
      return true;
    }
    return false;
  }

  validPos(pos){
    // debugger
    if (Math.min(...pos)< 0 || Math.max(...pos) >= 20){
      return false;
    } else {
      return true;
    }
  }


}

module.exports = Board;
