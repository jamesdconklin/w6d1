const utils = require("./utils.js");

const DIRS = {
  'N': [-1,0],
  'E': [0,1],
  'S': [1,0],
  'W': [0,-1]
};

class Snake {

  constructor(board, opts) {

    this.grow = 0;
    this.board = board;
    this.dir = DIRS[opts.dir] || [-1,0];
    this.pos = opts.pos || [19,10];
    this.body = [this.pos];

  }

  contains(pos) {
    return utils.arrayLookup(this.body, pos) >= 0;
  }

  move() {
    if (this.grow) {
      this.grow--;
    } else {
      this.body.shift();
    }
    // Check for collisions
    // Check valid position && check that we don't contain new pos.
    let x = this.pos[1] + this.dir[1];
    let y = this.pos[0] + this.dir[0];
    let pos = [y,x];
    console.log(pos);
    if (utils.arrayLookup(this.body, pos) >= 0) {
      return false;
    }
    if (!this.board.validPos(pos)) {
      return false;
    }
    this.body.push(pos);
    this.pos = pos;
    if (this.board.eatApple()) {
      this.grow += 2;
    }
    return true;
  }

  turn(dir) {
    this.dir = DIRS[dir];
  }
}

module.exports = Snake;
