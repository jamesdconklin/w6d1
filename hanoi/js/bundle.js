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

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);


	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);