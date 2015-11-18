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

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _utils = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.height = 1000;
	canvas.width = 1000;
	canvas.style.border = '1px solid #e5e5e5';

	var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];
	var ctx = canvas.getContext('2d');

	var Heart = (function () {
	  function Heart() {
	    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Heart);

	    this.pt = Object.assign({ x: 0, y: 0 }, { x: option.x, y: option.y });
	    this.speed = Object.assign({ x: 0, y: 0 }, { x: option.vx, y: option.vy });
	    this.color = option.color || 'red';
	    this.opacity = option.opacity || 1;
	  }

	  _createClass(Heart, [{
	    key: 'update',
	    value: function update(t) {
	      this.opacity -= t * .5;

	      if (this.opacity < 0) {
	        this.opacity = 0;
	        this.destroy();
	        return;
	      }

	      this.pt.x += t * this.speed.x;
	      this.pt.y += t * this.speed.y;

	      this.speed.y += t * 600;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(elapse) {
	      ctx.save();
	      ctx.translate(this.pt.x, this.pt.y);

	      ctx.globalAlpha = this.opacity;
	      ctx.drawImage(heartCacheMap[this.color], -30, -30);

	      ctx.restore();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.isDead = true;
	    }
	  }]);

	  return Heart;
	})();

	function createCanvasCache(ctxProcess) {
	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext('2d');
	  ctxProcess(ctx, canvas);
	  return canvas;
	}
	var heartCacheMap = {};
	colors.forEach(function (c) {
	  var canvas = createCanvasCache(function (ctx, canvas) {
	    canvas.width = 60;
	    canvas.height = 60;
	    ctx.beginPath();
	    ctx.translate(30, 30);
	    ctx.moveTo(0, 0);

	    getHeartPath(function (x, y) {
	      return ctx.lineTo(x, y);
	    });

	    ctx.fillStyle = c;
	    ctx.closePath();
	    ctx.fill();
	  });

	  heartCacheMap[c] = canvas;
	});

	function getHeartPath(cb) {
	  var x = undefined,
	      y = undefined;
	  for (var t = 0; t < 6.6; t += .1) {
	    x = 16 * Math.pow(Math.sin(t), 3);
	    y = -(13 * Math.cos(t)) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
	    cb(x, y);
	  }
	}

	var objs = [];
	function createHearts(x, y) {
	  var heart = undefined;
	  for (var i = 0; i < 100; i++) {
	    heart = new Heart({
	      x: x,
	      y: y,
	      vx: (0, _utils.rand)(-300, 300),
	      vy: (0, _utils.rand)(-100, -600),
	      color: colors[(0, _utils.rand)(0, 5)],
	      opacity: (0, _utils.rand)(6, 9) / 10
	    });
	    objs.push(heart);
	  }
	};

	function createHeartsByHeart(dx, dy) {
	  var heart = undefined;
	  var n = 0;
	  getHeartPath(function (x, y) {
	    n++;
	    if (n % 2 != 0) {
	      return;
	    }

	    x *= 10;
	    y *= 10;

	    (function () {
	      setTimeout(function () {
	        heart = new Heart({
	          x: dx + x,
	          y: dy + y,
	          vx: 0,
	          vy: 0,
	          color: colors[(0, _utils.rand)(0, 5)],
	          opacity: (0, _utils.rand)(6, 10) / 10
	        });
	        objs.push(heart);
	      }, n * 10);
	    })(x, y);
	  });
	};

	canvas.onclick = function (e) {
	  return createHearts(e.offsetX, e.offsetY);
	};

	function start() {
	  var last = new Date();
	  function round() {
	    var now = new Date();

	    var elapse = (now - last) / 1000;
	    last = now;
	    update(elapse);
	    draw();
	    recycle();
	    window.requestAnimationFrame(round);
	  };
	  round();
	};

	function draw() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  objs.forEach(function (item) {
	    return item.draw();
	  });
	}

	function update(t) {
	  objs.forEach(function (item) {
	    return item.update(t);
	  });
	}

	function recycle() {
	  objs.forEach(function (item) {
	    if (item.isDead) {
	      objs.splice(objs.indexOf(item), 1);
	    }
	  });
	}

	start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var rand = exports.rand = function rand(from, to) {
	    return ~ ~(from + Math.random() * (to - from));
	};

/***/ }
/******/ ]);