/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);
	const Board = __webpack_require__(2);


	$( () => {
	  let board = new Board();
	  let $el = $('figure.snake');
	  new SnakeView(board, $el);
	  // Your code here
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2)

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const utils = __webpack_require__(4);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	let utils = {
	  arrayLookup(arr, pos){
	    for (var i = 0; i < arr.length; i++) {
	      let x = arr[i][1];
	      let y = arr[i][0];
	      if(pos[0] ===y && pos[1]===x ){
	        return i;
	      }
	    }
	    return -1;
	  }
	}


	module.exports = utils;


/***/ }
/******/ ]);