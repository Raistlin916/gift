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

	'use strict'
	//import {rand} from './utils';

	;
	let rand = __webpack_require__(1).rand;

	const canvas = document.getElementsByTagName('canvas')[0];
	canvas.height = 1000;
	canvas.width = 1000;
	canvas.style.border = '1px solid #e5e5e5';

	const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];
	const ctx = canvas.getContext('2d');

	class Heart {
	  constructor(option) {
	    this.pt = Object.assign({ x: 0, y: 0 }, { x: option.x, y: option.y });
	    this.speed = Object.assign({ x: 0, y: 0 }, { x: option.vx, y: option.vy });
	    this.color = option.color || 'red';
	    this.opacity = option.opacity || 1;
	  }

	  update(t) {
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

	  draw(elapse) {
	    ctx.save();
	    ctx.translate(this.pt.x, this.pt.y);

	    ctx.globalAlpha = this.opacity;
	    ctx.drawImage(heartCacheMap[this.color], -30, -30);

	    ctx.restore();
	  }

	  destroy() {
	    this.isDead = true;
	  }
	}

	function createCanvasCache(ctxProcess) {
	  const canvas = document.createElement('canvas');
	  const ctx = canvas.getContext('2d');
	  ctxProcess(ctx, canvas);
	  return canvas;
	}
	let heartCacheMap = {};
	colors.forEach(c => {
	  let canvas = createCanvasCache((ctx, canvas) => {
	    canvas.width = 60;
	    canvas.height = 60;
	    ctx.beginPath();
	    ctx.translate(30, 30);
	    ctx.moveTo(0, 0);

	    getHeartPath((x, y) => ctx.lineTo(x, y));

	    ctx.fillStyle = c;
	    ctx.closePath();
	    ctx.fill();
	  });

	  heartCacheMap[c] = canvas;
	});

	function getHeartPath(cb) {
	  let x, y;
	  for (let t = 0; t < 6.6; t += .1) {
	    x = 16 * Math.pow(Math.sin(t), 3);
	    y = -(13 * Math.cos(t)) + 5 * Math.cos(2 * t) + 2 * Math.cos(3 * t) + Math.cos(4 * t);
	    x *= 1;
	    y *= 1;
	    cb(x, y);
	  }
	}

	let objs = [];
	function createHearts(x, y) {
	  let heart;
	  for (let i = 0; i < 100; i++) {
	    heart = new Heart({
	      x: x,
	      y: y,
	      vx: rand(-300, 300),
	      vy: rand(-100, -600),
	      color: colors[rand(0, 5)],
	      opacity: rand(6, 10) / 10
	    });
	    objs.push(heart);
	  }
	};

	function createHeartsByHeart(dx, dy) {
	  let heart;
	  let n = 0;
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
	          color: colors[rand(0, 5)],
	          opacity: rand(6, 10) / 10
	        });
	        objs.push(heart);
	      }, n * 10);
	    })(x, y);
	  });
	};

	canvas.onclick = e => createHeartsByHeart(e.offsetX, e.offsetY);

	function start() {
	  let last = new Date();
	  function round() {
	    const now = new Date();

	    let elapse = (now - last) / 1000;
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
	  objs.forEach(item => item.draw());
	}

	function update(t) {
	  objs.forEach(item => item.update(t));
	}

	function recycle() {
	  objs.forEach(item => {
	    if (item.isDead) {
	      objs.splice(objs.indexOf(item), 1);
	    }
	  });
	}

	start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	const utils = {
	    rand: (from, to) => {
	        return ~ ~(from + Math.random() * (to - from));
	    }
	};

	//export default utils;

	module.exports = utils;

/***/ }
/******/ ]);