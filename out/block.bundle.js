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
/******/ 	__webpack_require__.p = "/out/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cycle = __webpack_require__(1);

	var _cycle2 = _interopRequireDefault(_cycle);

	var _input = __webpack_require__(2);

	var _input2 = _interopRequireDefault(_input);

	var _mystery_block = __webpack_require__(4);

	var _gravity_block = __webpack_require__(8);

	var _data = __webpack_require__(9);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var container = document.querySelector('.canvas-container');
	var canvas = document.createElement('canvas');
	container.appendChild(canvas);
	var input = new _input2.default(canvas);
	canvas.height = 500;
	canvas.width = 500;

	var cycle = new _cycle2.default(canvas, input);
	cycle.start();

	var objs = cycle.getObjs();
	var MysteryBlocks = new _mystery_block.MysteryBlockCollection();
	var GravityBlocks = new _gravity_block.GravityBlockCollection();

	function construct(dx, dy, blocks) {
	    var data = undefined;
	    try {
	        data = JSON.parse(document.getElementById('input').value);
	    } catch (e) {
	        data = _data2.default;
	    }

	    blocks.reset();

	    if (data.mapData) {
	        for (var i = 0; i < data.h; i++) {
	            for (var j = 0; j < data.w; j++) {
	                var index = i * data.w + j;
	                var pixel = data.mapData[index];
	                blocks.add({
	                    x: dx + j * 6,
	                    y: dy + i * 6,
	                    w: 5,
	                    h: 5,
	                    color: 'rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')'
	                });
	            }
	        }
	    } else {
	        for (var i = 0; i < data.h; i++) {
	            for (var j = 0; j < data.w; j++) {
	                var index = i * data.w + j;
	                if (data.list.indexOf(index) == -1) {
	                    continue;
	                }
	                blocks.add({
	                    x: dx + j * 6,
	                    y: dy + i * 6,
	                    w: 5,
	                    h: 5,
	                    color: 'rgb(255, 160, 32)'
	                });
	            }
	        }
	    }
	    objs.add(blocks);
	}

	//construct(0, 0, MysteryBlocks);
	construct(100, 50, GravityBlocks);
	//document.getElementById('load-btn').onclick = construct;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cycle = (function () {
	    function Cycle(canvas, input) {
	        _classCallCheck(this, Cycle);

	        this.canvas = canvas;
	        this.ctx = canvas.getContext('2d');
	        this.input = input;
	        this.objs = new Set();
	    }

	    _createClass(Cycle, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;

	            var last = new Date();
	            var round = function round() {
	                var now = new Date();

	                var elapse = (now - last) / 1000;
	                last = now;
	                _this.update(elapse, _this.input);
	                _this.draw();
	                window.requestAnimationFrame(round);
	            };
	            round();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var _this2 = this;

	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	            this.objs.forEach(function (item) {
	                return item.draw(_this2.ctx);
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            this.objs.forEach(function (item) {
	                return item.update.apply(item, args);
	            });
	            this.recycle();
	        }
	    }, {
	        key: 'recycle',
	        value: function recycle() {
	            var _this3 = this;

	            this.objs.forEach(function (item) {
	                if (item.isDead) {
	                    _this3.objs.delete(item);
	                }
	            });
	        }
	    }, {
	        key: 'getObjs',
	        value: function getObjs() {
	            return this.objs;
	        }
	    }]);

	    return Cycle;
	})();

	exports.default = Cycle;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Input = (function () {
	    function Input(host) {
	        var _this = this;

	        _classCallCheck(this, Input);

	        this.host = host;
	        this.pt = null;
	        this.pts = [];

	        host.addEventListener('mousemove', function (e) {
	            _this.pt = new _victor2.default(e.offsetX, e.offsetY);
	            _this.pushPt(_this.pt);
	            _this.calcuState();
	        });

	        host.addEventListener('mouseout', function () {
	            _this.pt = null;
	            _this.pts = [];
	            _this.calcuState();
	        });
	    }

	    _createClass(Input, [{
	        key: 'pushPt',
	        value: function pushPt(pt) {
	            this.pts.push(pt);
	            if (this.pts.length > 4) {
	                this.pts.shift();
	            }
	        }
	    }, {
	        key: 'calcuState',
	        value: function calcuState() {
	            var l = this.pts.length;
	            var segs = [];
	            this.pts.forEach(function (item, i, arr) {
	                if (!arr[i + 1]) {
	                    return;
	                }
	                segs.push(arr[i + 1].clone().subtract(item));
	            });
	            var avg = segs.length > 1 ? segs.reduce(function (t, i) {
	                return t.clone().add(i);
	            }, new _victor2.default(0, 0)).divide(new _victor2.default(l, l)).normalize() : null;
	            this.avg = avg;
	        }
	    }]);

	    return Input;
	})();

	exports.default = Input;

/***/ },
/* 3 */
/***/ function(module, exports) {

	exports = module.exports = Victor;

	/**
	 * # Victor - A JavaScript 2D vector class with methods for common vector operations
	 */

	/**
	 * Constructor. Will also work without the `new` keyword
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = Victor(42, 1337);
	 *
	 * @param {Number} x Value of the x axis
	 * @param {Number} y Value of the y axis
	 * @return {Victor}
	 * @api public
	 */
	function Victor (x, y) {
		if (!(this instanceof Victor)) {
			return new Victor(x, y);
		}

		/**
		 * The X axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.x;
		 *     // => 42
		 *
		 * @api public
		 */
		this.x = x || 0;

		/**
		 * The Y axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.y;
		 *     // => 21
		 *
		 * @api public
		 */
		this.y = y || 0;
	};

	/**
	 * # Static
	 */

	/**
	 * Creates a new instance from an array
	 *
	 * ### Examples:
	 *     var vec = Victor.fromArray([42, 21]);
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromArray
	 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromArray = function (arr) {
		return new Victor(arr[0] || 0, arr[1] || 0);
	};

	/**
	 * Creates a new instance from an object
	 *
	 * ### Examples:
	 *     var vec = Victor.fromObject({ x: 42, y: 21 });
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromObject
	 * @param {Object} obj Object with the values for x and y
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromObject = function (obj) {
		return new Victor(obj.x || 0, obj.y || 0);
	};

	/**
	 * # Manipulation
	 *
	 * These functions are chainable.
	 */

	/**
	 * Adds another vector's X axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addX(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:10
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addX = function (vec) {
		this.x += vec.x;
		return this;
	};

	/**
	 * Adds another vector's Y axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addY(vec2);
	 *     vec1.toString();
	 *     // => x:10, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addY = function (vec) {
		this.y += vec.y;
		return this;
	};

	/**
	 * Adds another vector to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.add(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.add = function (vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	};

	/**
	 * Adds the given scalar to both vector axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalar(2);
	 *     vec.toString();
	 *     // => x: 3, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalar = function (scalar) {
		this.x += scalar;
		this.y += scalar;
		return this;
	};

	/**
	 * Adds the given scalar to the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarX(2);
	 *     vec.toString();
	 *     // => x: 3, y: 2
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarX = function (scalar) {
		this.x += scalar;
		return this;
	};

	/**
	 * Adds the given scalar to the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarY(2);
	 *     vec.toString();
	 *     // => x: 1, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarY = function (scalar) {
		this.y += scalar;
		return this;
	};

	/**
	 * Subtracts the X axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractX(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:50
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractX = function (vec) {
		this.x -= vec.x;
		return this;
	};

	/**
	 * Subtracts the Y axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractY(vec2);
	 *     vec1.toString();
	 *     // => x:100, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractY = function (vec) {
		this.y -= vec.y;
		return this;
	};

	/**
	 * Subtracts another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtract(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtract = function (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	};

	/**
	 * Subtracts the given scalar from both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalar(20);
	 *     vec.toString();
	 *     // => x: 80, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalar = function (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		return this;
	};

	/**
	 * Subtracts the given scalar from the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarX(20);
	 *     vec.toString();
	 *     // => x: 80, y: 200
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarX = function (scalar) {
		this.x -= scalar;
		return this;
	};

	/**
	 * Subtracts the given scalar from the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarY(20);
	 *     vec.toString();
	 *     // => x: 100, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarY = function (scalar) {
		this.y -= scalar;
		return this;
	};

	/**
	 * Divides the X axis by the x component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.divideX(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideX = function (vector) {
		this.x /= vector.x;
		return this;
	};

	/**
	 * Divides the Y axis by the y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.divideY(vec2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideY = function (vector) {
		this.y /= vector.y;
		return this;
	};

	/**
	 * Divides both vector axis by a axis values of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.divide(vec2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Victor} vector The vector to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divide = function (vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	};

	/**
	 * Divides both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalar(2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalar = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
			this.y /= scalar;
		} else {
			this.x = 0;
			this.y = 0;
		}

		return this;
	};

	/**
	 * Divides the X axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarX(2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarX = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
		} else {
			this.x = 0;
		}
		return this;
	};

	/**
	 * Divides the Y axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarY = function (scalar) {
		if (scalar !== 0) {
			this.y /= scalar;
		} else {
			this.y = 0;
		}
		return this;
	};

	/**
	 * Inverts the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertX();
	 *     vec.toString();
	 *     // => x:-100, y:50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertX = function () {
		this.x *= -1;
		return this;
	};

	/**
	 * Inverts the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertY();
	 *     vec.toString();
	 *     // => x:100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertY = function () {
		this.y *= -1;
		return this;
	};

	/**
	 * Inverts both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invert();
	 *     vec.toString();
	 *     // => x:-100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invert = function () {
		this.invertX();
		this.invertY();
		return this;
	};

	/**
	 * Multiplies the X axis by X component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyX = function (vector) {
		this.x *= vector.x;
		return this;
	};

	/**
	 * Multiplies the Y axis by Y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyY = function (vector) {
		this.y *= vector.y;
		return this;
	};

	/**
	 * Multiplies both vector axis by values from a given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.multiply(vec2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Victor} vector The vector to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiply = function (vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	};

	/**
	 * Multiplies both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalar(2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Number} The scalar to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalar = function (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};

	/**
	 * Multiplies the X axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarX(2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarX = function (scalar) {
		this.x *= scalar;
		return this;
	};

	/**
	 * Multiplies the Y axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarY = function (scalar) {
		this.y *= scalar;
		return this;
	};

	/**
	 * Normalize
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.normalize = function () {
		var length = this.length();

		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.divide(Victor(length, length));
		}
		return this;
	};

	Victor.prototype.norm = Victor.prototype.normalize;

	/**
	 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.limit(80, 0.9);
	 *     vec.toString();
	 *     // => x:90, y:50
	 *
	 * @param {Number} max The maximum value for both x and y axis
	 * @param {Number} factor Factor by which the axis are to be multiplied with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.limit = function (max, factor) {
		if (Math.abs(this.x) > max){ this.x *= factor; }
		if (Math.abs(this.y) > max){ this.y *= factor; }
		return this;
	};

	/**
	 * Randomizes both vector axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:67, y:73
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomize = function (topLeft, bottomRight) {
		this.randomizeX(topLeft, bottomRight);
		this.randomizeY(topLeft, bottomRight);

		return this;
	};

	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:55, y:50
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeX = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.x, bottomRight.x);
		var max = Math.max(topLeft.x, bottomRight.x);
		this.x = random(min, max);
		return this;
	};

	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:100, y:66
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeY = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.y, bottomRight.y);
		var max = Math.max(topLeft.y, bottomRight.y);
		this.y = random(min, max);
		return this;
	};

	/**
	 * Randomly randomizes either axis between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
	 *     vec.toString();
	 *     // => x:100, y:77
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
		if (!! Math.round(Math.random())) {
			this.randomizeX(topLeft, bottomRight);
		} else {
			this.randomizeY(topLeft, bottomRight);
		}
		return this;
	};

	/**
	 * Rounds both axis to an integer value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.unfloat = function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};

	/**
	 * Rounds both axis to a certain precision
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @param {Number} Precision (default: 8)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.toFixed = function (precision) {
		if (typeof precision === 'undefined') { precision = 8; }
		this.x = this.x.toFixed(precision);
		this.y = this.y.toFixed(precision);
		return this;
	};

	/**
	 * Performs a linear blend / interpolation of the X axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixX(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:100
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixX = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.x = (1 - amount) * this.x + amount * vec.x;
		return this;
	};

	/**
	 * Performs a linear blend / interpolation of the Y axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixY(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:100, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixY = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}

		this.y = (1 - amount) * this.y + amount * vec.y;
		return this;
	};

	/**
	 * Performs a linear blend / interpolation towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mix(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mix = function (vec, amount) {
		this.mixX(vec, amount);
		this.mixY(vec, amount);
		return this;
	};

	/**
	 * # Products
	 */

	/**
	 * Creates a clone of this vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = vec1.clone();
	 *
	 *     vec2.toString();
	 *     // => x:10, y:10
	 *
	 * @return {Victor} A clone of the vector
	 * @api public
	 */
	Victor.prototype.clone = function () {
		return new Victor(this.x, this.y);
	};

	/**
	 * Copies another vector's X component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyX(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:10
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyX = function (vec) {
		this.x = vec.x;
		return this;
	};

	/**
	 * Copies another vector's Y component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyY(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:10, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyY = function (vec) {
		this.y = vec.y;
		return this;
	};

	/**
	 * Copies another vector's X and Y components in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copy(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copy = function (vec) {
		this.copyX(vec);
		this.copyY(vec);
		return this;
	};

	/**
	 * Sets the vector to zero (0,0)
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *		 var1.zero();
	 *     vec1.toString();
	 *     // => x:0, y:0
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.zero = function () {
		this.x = this.y = 0;
		return this;
	};

	/**
	 * Calculates the dot product of this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.dot(vec2);
	 *     // => 23000
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Dot product
	 * @api public
	 */
	Victor.prototype.dot = function (vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	};

	Victor.prototype.cross = function (vec2) {
		return (this.x * vec2.y ) - (this.y * vec2.x );
	};

	/**
	 * Projects a vector onto another vector, setting itself to the result.
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 0);
	 *     var vec2 = new Victor(100, 100);
	 *
	 *     vec.projectOnto(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want to project this vector onto
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.projectOnto = function (vec2) {
	    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
	    this.x = coeff * vec2.x;
	    this.y = coeff * vec2.y;
	    return this;
	};


	Victor.prototype.horizontalAngle = function () {
		return Math.atan2(this.y, this.x);
	};

	Victor.prototype.horizontalAngleDeg = function () {
		return radian2degrees(this.horizontalAngle());
	};

	Victor.prototype.verticalAngle = function () {
		return Math.atan2(this.x, this.y);
	};

	Victor.prototype.verticalAngleDeg = function () {
		return radian2degrees(this.verticalAngle());
	};

	Victor.prototype.angle = Victor.prototype.horizontalAngle;
	Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
	Victor.prototype.direction = Victor.prototype.horizontalAngle;

	Victor.prototype.rotate = function (angle) {
		var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		this.x = nx;
		this.y = ny;

		return this;
	};

	Victor.prototype.rotateDeg = function (angle) {
		angle = degrees2radian(angle);
		return this.rotate(angle);
	};

	Victor.prototype.rotateTo = function(rotation) {
		return this.rotate(rotation-this.angle());
	};

	Victor.prototype.rotateToDeg = function(rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateTo(rotation);
	};

	Victor.prototype.rotateBy = function (rotation) {
		var angle = this.angle() + rotation;

		return this.rotate(angle);
	};

	Victor.prototype.rotateByDeg = function (rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateBy(rotation);
	};

	/**
	 * Calculates the distance of the X axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceX(vec2);
	 *     // => -100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceX = function (vec) {
		return this.x - vec.x;
	};

	/**
	 * Same as `distanceX()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.absDistanceX(vec2);
	 *     // => 100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceX = function (vec) {
		return Math.abs(this.distanceX(vec));
	};

	/**
	 * Calculates the distance of the Y axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => -10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceY = function (vec) {
		return this.y - vec.y;
	};

	/**
	 * Same as `distanceY()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => 10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceY = function (vec) {
		return Math.abs(this.distanceY(vec));
	};

	/**
	 * Calculates the euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distance(vec2);
	 *     // => 100.4987562112089
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distance = function (vec) {
		return Math.sqrt(this.distanceSq(vec));
	};

	/**
	 * Calculates the squared euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceSq(vec2);
	 *     // => 10100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceSq = function (vec) {
		var dx = this.distanceX(vec),
			dy = this.distanceY(vec);

		return dx * dx + dy * dy;
	};

	/**
	 * Calculates the length or magnitude of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.length();
	 *     // => 111.80339887498948
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.length = function () {
		return Math.sqrt(this.lengthSq());
	};

	/**
	 * Squared length / magnitude
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.lengthSq();
	 *     // => 12500
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y;
	};

	Victor.prototype.magnitude = Victor.prototype.length;

	/**
	 * Returns a true if vector is (0, 0)
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     vec.zero();
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isZero = function() {
		return this.x === 0 && this.y === 0;
	};

	/**
	 * Returns a true if this vector is the same as another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(100, 50);
	 *     vec1.isEqualTo(vec2);
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isEqualTo = function(vec2) {
		return this.x === vec2.x && this.y === vec2.y;
	};

	/**
	 * # Utility Methods
	 */

	/**
	 * Returns an string representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toString();
	 *     // => x:10, y:20
	 *
	 * @return {String}
	 * @api public
	 */
	Victor.prototype.toString = function () {
		return 'x:' + this.x + ', y:' + this.y;
	};

	/**
	 * Returns an array representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toArray();
	 *     // => [10, 20]
	 *
	 * @return {Array}
	 * @api public
	 */
	Victor.prototype.toArray = function () {
		return [ this.x, this.y ];
	};

	/**
	 * Returns an object representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toObject();
	 *     // => { x: 10, y: 20 }
	 *
	 * @return {Object}
	 * @api public
	 */
	Victor.prototype.toObject = function () {
		return { x: this.x, y: this.y };
	};


	var degrees = 180 / Math.PI;

	function random (min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function radian2degrees (rad) {
		return rad * degrees;
	}

	function degrees2radian (deg) {
		return deg / degrees;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MysteryBlockCollection = undefined;

	var _block = __webpack_require__(5);

	var _utils = __webpack_require__(7);

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MysteryBlock = (function (_Block) {
	    _inherits(MysteryBlock, _Block);

	    function MysteryBlock() {
	        _classCallCheck(this, MysteryBlock);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MysteryBlock).apply(this, arguments));
	    }

	    _createClass(MysteryBlock, [{
	        key: 'onTargetMovingEnd',
	        value: function onTargetMovingEnd() {
	            this.pt = this.originPt.clone();
	        }
	    }]);

	    return MysteryBlock;
	})(_block.Block);

	var MysteryBlockCollection = exports.MysteryBlockCollection = (function (_BlockCollection) {
	    _inherits(MysteryBlockCollection, _BlockCollection);

	    function MysteryBlockCollection() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, MysteryBlockCollection);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MysteryBlockCollection)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        _this2.childClass = MysteryBlock;
	        return _this2;
	    }

	    _createClass(MysteryBlockCollection, [{
	        key: 'add',
	        value: function add(item) {
	            item = _get(Object.getPrototypeOf(MysteryBlockCollection.prototype), 'add', this).call(this, item);
	            item.onMouseIn = this.onItemMouseIn.bind(this);
	        }
	    }, {
	        key: 'onItemMouseIn',
	        value: function onItemMouseIn(item) {
	            var correspondingIndex = (0, _utils.rand)(0, this.items.length);
	            var correspondingItem = this.items[correspondingIndex];
	            if (correspondingItem == item) {
	                return;
	            }
	            if (item.targetMoving || correspondingItem.targetMoving) {
	                return;
	            }
	            item.moveTo(correspondingItem.pt);
	            correspondingItem.moveTo(item.pt);
	        }
	    }]);

	    return MysteryBlockCollection;
	})(_block.BlockCollection);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BlockCollection = exports.Block = undefined;

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

	var _base_object = __webpack_require__(6);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Block = exports.Block = (function (_BaseObj) {
	    _inherits(Block, _BaseObj);

	    function Block() {
	        var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Block);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Block).call(this, option));

	        _this.color = option.color;
	        _this.originPt = _this.pt.clone();
	        return _this;
	    }

	    _createClass(Block, [{
	        key: 'update',
	        value: function update(t, input) {
	            _get(Object.getPrototypeOf(Block.prototype), 'update', this).call(this, t, input);

	            var mousePt = input.pt;
	            if (mousePt && this.isIn(mousePt)) {
	                this.onMouseIn(this, input);
	            }

	            if (this.targetMoving) {
	                var a = this.previousPt.distance(this.target);
	                var b = this.pt.distance(this.target);
	                var c = this.pt.distance(this.previousPt);

	                if (Math.abs(a + b - c) < _utils.PRECISION) {
	                    this.acc = new _victor2.default(0, 0);
	                    this.velocity = new _victor2.default(0, 0);
	                    this.pt = this.target.clone();
	                    this.targetMoving = false;
	                    this.target = null;
	                    this.onTargetMovingEnd();
	                }
	            }
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx) {
	            ctx.save();
	            ctx.fillStyle = this.color;
	            ctx.fillRect(this.pt.x, this.pt.y, this.size.w, this.size.h);
	            ctx.restore();
	        }
	    }, {
	        key: 'isIn',
	        value: function isIn(targetPt) {
	            return this.pt.x <= targetPt.x && this.pt.x + this.size.w >= targetPt.x && this.pt.y <= targetPt.y && this.pt.y + this.size.h >= targetPt.y;
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(pt) {
	            pt = pt.clone();
	            if (this.targetMoving) {
	                return;
	            }
	            this.targetMoving = true;
	            this.target = pt;
	            var target = _victor2.default.fromObject(pt);
	            var dist = this.pt.distance(target);
	            this.acc = target.clone().subtract(this.pt).norm().multiply(new _victor2.default(100, 100));
	        }
	    }, {
	        key: 'onMouseIn',
	        value: function onMouseIn() {}
	    }, {
	        key: 'onTargetMovingEnd',
	        value: function onTargetMovingEnd() {}
	    }]);

	    return Block;
	})(_base_object2.default);

	var BlockCollection = exports.BlockCollection = (function () {
	    function BlockCollection(childClass) {
	        _classCallCheck(this, BlockCollection);

	        this.childClass = childClass;
	        this.items = [];
	    }

	    _createClass(BlockCollection, [{
	        key: 'add',
	        value: function add(item) {
	            item = new this.childClass(item);
	            this.items.push(item);
	            return item;
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            this.items.forEach(function (i) {
	                return i.update.apply(i, args);
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }

	            this.items.forEach(function (i) {
	                return i.draw.apply(i, args);
	            });
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.items.length = 0;
	        }
	    }, {
	        key: 'onItemMouseIn',
	        value: function onItemMouseIn() {}
	    }]);

	    return BlockCollection;
	})();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseObj = (function () {
	    function BaseObj() {
	        var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, BaseObj);

	        this.pt = new _victor2.default(option.x, option.y);
	        this.size = Object.assign({}, { w: option.w, h: option.h });
	        this.velocity = new _victor2.default(option.vx || 0, option.vy || 0);
	        this.acc = new _victor2.default(option.ax || 0, option.ay || 0);
	    }

	    _createClass(BaseObj, [{
	        key: 'update',
	        value: function update(t) {
	            this.velocity.add(this.acc.clone().multiply(new _victor2.default(t, t)));
	            this.previousPt = this.pt.clone();
	            this.pt.add(this.velocity.clone().multiply(new _victor2.default(t, t)));
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx) {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.isDead = true;
	        }
	    }]);

	    return BaseObj;
	})();

	exports.default = BaseObj;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var rand = exports.rand = function rand(from, to) {
	    return ~ ~(from + Math.random() * (to - from));
	};

	var PRECISION = exports.PRECISION = 0.01;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GravityBlockCollection = exports.GravityBlock = undefined;

	var _block = __webpack_require__(5);

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GravityBlock = exports.GravityBlock = (function (_Block) {
	    _inherits(GravityBlock, _Block);

	    function GravityBlock() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, GravityBlock);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GravityBlock)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	    }

	    _createClass(GravityBlock, [{
	        key: 'onMouseIn',
	        value: function onMouseIn(item, input) {
	            if (this.falling || this.targetMoving || !input.avg) {
	                return;
	            }
	            this.falling = true;
	            this.acc = input.avg.clone().normalize().multiply(new _victor2.default(200, 200));
	            this.fallingTime = 0;
	        }
	    }, {
	        key: 'update',
	        value: function update(t) {
	            var _get2;

	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }

	            (_get2 = _get(Object.getPrototypeOf(GravityBlock.prototype), 'update', this)).call.apply(_get2, [this, t].concat(args));

	            if (this.falling) {
	                this.fallingTime += t;

	                if (this.fallingTime >= 1) {
	                    this.falling = false;
	                    this.moveTo(this.originPt);
	                }
	            }
	        }
	    }]);

	    return GravityBlock;
	})(_block.Block);

	var GravityBlockCollection = exports.GravityBlockCollection = (function (_BlockCollection) {
	    _inherits(GravityBlockCollection, _BlockCollection);

	    function GravityBlockCollection() {
	        var _Object$getPrototypeO2;

	        _classCallCheck(this, GravityBlockCollection);

	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        var _this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(GravityBlockCollection)).call.apply(_Object$getPrototypeO2, [this].concat(args)));

	        _this2.childClass = GravityBlock;
	        return _this2;
	    }

	    return GravityBlockCollection;
	})(_block.BlockCollection);

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//const defaultData = {"w":"15","h":"15","list":[21,22,23,35,39,49,55,63,66,68,71,78,86,93,95,99,101,109,111,112,113,115,125,129,141,142,143]};

	var defaultData = { "w": 30, "h": 30, "list": [], "mapData": [[123, 196, 233], [123, 196, 232], [92, 180, 204], [82, 175, 195], [104, 186, 215], [112, 179, 212], [63, 69, 72], [99, 102, 103], [15, 15, 15], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [8, 8, 8], [95, 97, 99], [83, 84, 86], [83, 130, 155], [122, 195, 232], [75, 171, 188], [79, 173, 191], [114, 191, 224], [123, 196, 233], [122, 195, 232], [105, 186, 216], [123, 196, 232], [123, 195, 232], [87, 177, 199], [88, 178, 201], [63, 101, 117], [100, 103, 104], [56, 57, 58], [0, 0, 0], [4, 4, 5], [30, 32, 34], [56, 61, 63], [65, 71, 74], [66, 72, 75], [66, 72, 75], [66, 72, 75], [64, 70, 72], [46, 50, 52], [27, 29, 30], [5, 6, 6], [0, 0, 0], [60, 62, 63], [104, 106, 108], [56, 66, 71], [87, 175, 197], [84, 176, 197], [113, 190, 223], [123, 196, 233], [120, 194, 230], [74, 171, 187], [88, 178, 200], [109, 189, 220], [123, 195, 233], [123, 196, 233], [86, 177, 198], [56, 70, 73], [121, 123, 125], [115, 123, 125], [139, 153, 158], [172, 190, 197], [176, 194, 200], [176, 194, 201], [176, 194, 201], [176, 194, 201], [176, 194, 201], [176, 194, 201], [176, 194, 201], [176, 193, 200], [176, 194, 201], [175, 193, 200], [154, 168, 175], [175, 180, 182], [173, 175, 175], [121, 123, 124], [59, 122, 137], [111, 190, 222], [123, 195, 232], [116, 192, 227], [80, 174, 193], [87, 177, 199], [99, 183, 210], [92, 180, 205], [114, 191, 224], [123, 196, 233], [107, 172, 204], [150, 151, 151], [242, 244, 245], [184, 200, 206], [176, 194, 201], [176, 194, 201], [175, 193, 200], [162, 177, 184], [144, 158, 164], [134, 147, 152], [132, 145, 150], [132, 145, 150], [132, 145, 150], [135, 148, 153], [153, 168, 174], [172, 188, 195], [176, 194, 200], [186, 201, 207], [247, 249, 249], [254, 254, 254], [87, 113, 127], [123, 195, 232], [113, 190, 223], [87, 177, 199], [91, 179, 203], [116, 192, 226], [123, 195, 233], [108, 188, 219], [98, 183, 211], [118, 193, 228], [85, 135, 160], [225, 225, 225], [188, 199, 204], [118, 129, 134], [73, 81, 83], [37, 40, 42], [8, 9, 9], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [1, 1, 1], [19, 21, 22], [47, 51, 53], [117, 121, 123], [203, 204, 204], [111, 119, 124], [111, 190, 222], [93, 181, 206], [102, 185, 214], [123, 196, 233], [123, 196, 232], [104, 186, 216], [123, 195, 232], [115, 191, 225], [108, 188, 220], [72, 113, 134], [145, 147, 148], [11, 12, 12], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [25, 26, 26], [103, 106, 108], [63, 64, 65], [98, 176, 204], [115, 192, 225], [123, 196, 233], [114, 191, 224], [96, 182, 208], [122, 195, 232], [107, 188, 218], [117, 193, 227], [119, 194, 229], [65, 103, 120], [103, 106, 108], [9, 9, 10], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [19, 19, 20], [103, 107, 108], [72, 74, 75], [107, 171, 203], [121, 195, 231], [108, 188, 219], [110, 189, 221], [107, 187, 217], [123, 196, 233], [123, 195, 232], [117, 193, 227], [116, 192, 226], [69, 102, 120], [98, 101, 102], [17, 18, 18], [0, 0, 0], [15, 13, 11], [41, 33, 30], [66, 54, 50], [54, 44, 41], [16, 15, 14], [104, 85, 79], [71, 58, 53], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [25, 26, 26], [99, 102, 103], [69, 71, 72], [108, 175, 207], [116, 192, 226], [118, 193, 228], [90, 179, 202], [100, 184, 211], [123, 196, 233], [123, 196, 233], [123, 196, 233], [122, 195, 232], [73, 119, 141], [1, 1, 1], [20, 18, 17], [233, 214, 205], [189, 160, 149], [140, 115, 106], [179, 147, 135], [223, 184, 169], [95, 80, 74], [159, 132, 121], [251, 207, 190], [203, 167, 153], [86, 71, 65], [21, 17, 16], [32, 26, 24], [0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0], [1, 1, 1], [27, 40, 46], [123, 195, 232], [103, 185, 214], [100, 184, 211], [99, 184, 211], [86, 177, 198], [123, 196, 233], [123, 195, 232], [112, 178, 212], [72, 115, 137], [62, 99, 118], [0, 0, 0], [113, 104, 99], [219, 199, 190], [160, 123, 114], [138, 100, 91], [76, 55, 50], [50, 37, 34], [152, 123, 113], [125, 103, 94], [220, 182, 166], [251, 206, 189], [200, 164, 151], [64, 47, 43], [68, 49, 45], [79, 58, 52], [170, 124, 113], [160, 131, 122], [161, 148, 141], [0, 0, 0], [31, 53, 63], [72, 132, 152], [70, 121, 142], [95, 180, 206], [114, 191, 224], [123, 196, 232], [106, 187, 217], [122, 195, 232], [85, 104, 113], [175, 160, 153], [119, 109, 104], [0, 0, 0], [127, 116, 111], [252, 232, 221], [185, 167, 158], [156, 122, 112], [164, 126, 115], [189, 143, 131], [243, 196, 180], [212, 175, 160], [248, 205, 188], [251, 207, 189], [251, 206, 190], [206, 159, 145], [176, 135, 123], [154, 120, 110], [170, 138, 128], [228, 210, 201], [228, 209, 200], [0, 0, 0], [16, 17, 17], [165, 152, 145], [162, 149, 142], [80, 126, 150], [123, 196, 232], [123, 196, 232], [100, 184, 212], [92, 180, 205], [92, 93, 92], [201, 165, 152], [135, 120, 113], [25, 23, 21], [84, 77, 74], [240, 220, 211], [119, 118, 118], [58, 30, 23], [96, 86, 81], [118, 101, 95], [233, 194, 179], [181, 149, 136], [251, 207, 189], [251, 207, 189], [250, 207, 190], [150, 132, 125], [57, 27, 19], [107, 97, 93], [109, 105, 102], [193, 179, 171], [227, 209, 200], [0, 0, 0], [109, 100, 95], [142, 120, 111], [185, 157, 146], [83, 111, 126], [112, 190, 222], [95, 182, 207], [123, 196, 233], [123, 196, 232], [109, 105, 103], [204, 169, 155], [205, 169, 156], [79, 73, 69], [146, 134, 128], [250, 230, 220], [254, 249, 246], [148, 106, 95], [126, 74, 61], [202, 189, 184], [252, 224, 213], [172, 138, 127], [251, 206, 189], [251, 207, 189], [251, 211, 195], [237, 234, 232], [132, 82, 71], [132, 81, 69], [228, 222, 218], [250, 233, 225], [227, 209, 200], [68, 62, 60], [158, 142, 134], [232, 191, 176], [202, 173, 161], [70, 102, 110], [94, 181, 207], [100, 184, 212], [109, 188, 220], [113, 190, 223], [102, 112, 116], [251, 210, 194], [158, 122, 111], [65, 56, 53], [240, 220, 210], [252, 232, 221], [251, 223, 211], [246, 209, 195], [232, 196, 180], [251, 215, 200], [248, 202, 186], [159, 119, 108], [237, 187, 171], [251, 206, 189], [251, 207, 189], [251, 212, 196], [240, 204, 189], [238, 202, 187], [251, 212, 197], [252, 230, 220], [247, 227, 217], [89, 83, 80], [90, 75, 70], [188, 152, 139], [241, 209, 195], [72, 111, 131], [123, 196, 232], [123, 195, 232], [100, 184, 212], [106, 187, 217], [67, 108, 124], [187, 163, 152], [117, 86, 78], [183, 168, 161], [194, 179, 171], [225, 206, 197], [196, 163, 151], [251, 207, 189], [251, 207, 189], [251, 207, 189], [229, 176, 161], [157, 115, 105], [228, 174, 159], [248, 202, 185], [251, 207, 189], [251, 207, 189], [251, 206, 189], [248, 204, 187], [186, 153, 140], [214, 187, 175], [173, 159, 152], [187, 180, 176], [173, 167, 164], [114, 89, 82], [137, 123, 117], [105, 166, 198], [123, 195, 233], [123, 195, 232], [123, 196, 233], [123, 196, 232], [116, 185, 220], [96, 97, 98], [126, 101, 94], [134, 118, 112], [132, 121, 116], [248, 222, 211], [229, 189, 173], [251, 207, 189], [251, 207, 189], [251, 207, 189], [225, 171, 157], [176, 140, 129], [250, 206, 189], [250, 206, 188], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [223, 184, 169], [248, 211, 196], [173, 159, 152], [167, 145, 136], [150, 137, 131], [97, 88, 83], [73, 102, 114], [109, 189, 220], [105, 186, 215], [99, 183, 211], [123, 196, 233], [123, 196, 233], [123, 195, 232], [98, 157, 186], [116, 112, 110], [231, 212, 203], [131, 121, 115], [252, 231, 221], [251, 209, 193], [251, 207, 189], [251, 207, 189], [251, 207, 189], [248, 202, 185], [167, 129, 118], [222, 166, 151], [240, 190, 174], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 219, 205], [157, 144, 138], [209, 172, 158], [199, 175, 165], [49, 65, 73], [108, 183, 214], [105, 187, 217], [102, 185, 214], [99, 184, 211], [123, 196, 233], [123, 196, 233], [123, 196, 232], [123, 195, 232], [106, 169, 201], [71, 97, 110], [48, 67, 76], [235, 216, 207], [251, 218, 205], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 190], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 206, 189], [251, 207, 189], [251, 207, 189], [251, 206, 189], [252, 226, 215], [85, 81, 78], [197, 162, 148], [199, 175, 164], [92, 146, 174], [123, 196, 232], [123, 195, 232], [123, 195, 232], [123, 195, 232], [123, 195, 232], [114, 191, 225], [111, 189, 222], [107, 188, 219], [118, 193, 228], [122, 195, 232], [110, 175, 209], [142, 133, 128], [252, 229, 219], [251, 209, 193], [251, 207, 189], [251, 207, 189], [193, 159, 146], [166, 137, 126], [167, 137, 126], [167, 138, 126], [167, 138, 127], [247, 203, 186], [251, 207, 189], [251, 206, 189], [251, 213, 199], [231, 213, 203], [54, 80, 93], [186, 153, 140], [202, 178, 168], [80, 138, 161], [109, 188, 220], [107, 188, 218], [106, 187, 217], [117, 193, 228], [78, 173, 192], [97, 183, 210], [109, 189, 221], [123, 196, 232], [123, 196, 233], [123, 196, 233], [123, 196, 232], [80, 122, 144], [182, 168, 161], [252, 228, 217], [251, 210, 193], [251, 207, 189], [251, 206, 190], [236, 193, 177], [207, 170, 156], [241, 196, 180], [251, 206, 189], [250, 206, 189], [251, 206, 189], [251, 212, 197], [237, 216, 207], [78, 71, 68], [85, 95, 100], [175, 144, 132], [210, 183, 173], [113, 104, 99], [77, 101, 110], [111, 189, 221], [104, 186, 215], [84, 176, 197], [122, 195, 232], [123, 196, 233], [123, 196, 233], [123, 196, 233], [123, 195, 232], [114, 191, 225], [116, 192, 227], [122, 195, 232], [82, 128, 151], [157, 147, 141], [252, 229, 218], [251, 211, 196], [251, 206, 190], [215, 167, 152], [141, 103, 94], [178, 134, 123], [250, 206, 188], [251, 207, 189], [251, 215, 200], [209, 192, 183], [85, 78, 74], [132, 122, 116], [239, 219, 210], [211, 177, 164], [234, 205, 194], [224, 205, 196], [172, 158, 151], [70, 93, 104], [120, 191, 227], [123, 196, 232], [123, 195, 232], [123, 195, 232], [119, 194, 229], [101, 184, 213], [104, 186, 216], [110, 189, 222], [119, 194, 229], [123, 195, 232], [122, 193, 230], [59, 72, 80], [117, 108, 104], [246, 225, 215], [251, 214, 199], [154, 127, 116], [22, 18, 16], [98, 81, 74], [251, 207, 190], [251, 219, 206], [164, 150, 144], [59, 59, 59], [171, 157, 150], [251, 222, 209], [251, 217, 203], [221, 181, 167], [238, 198, 182], [247, 203, 186], [187, 168, 159], [133, 109, 101], [79, 126, 150], [123, 196, 232], [108, 188, 219], [90, 179, 202], [98, 183, 210], [103, 186, 214], [108, 188, 219], [102, 162, 193], [56, 85, 100], [53, 68, 77], [43, 47, 49], [88, 90, 92], [57, 59, 60], [70, 67, 65], [216, 198, 189], [51, 46, 43], [0, 0, 0], [1, 1, 1], [224, 200, 190], [108, 100, 96], [59, 61, 62], [95, 96, 98], [182, 167, 160], [251, 210, 194], [251, 206, 189], [228, 183, 168], [249, 205, 188], [247, 202, 185], [234, 201, 188], [200, 179, 170], [71, 107, 125], [123, 196, 232], [99, 184, 211], [101, 185, 213], [95, 182, 207], [120, 194, 229], [95, 154, 183], [59, 62, 65], [105, 107, 109], [91, 93, 95], [53, 55, 56], [72, 74, 75], [57, 60, 61], [71, 74, 75], [51, 51, 52], [92, 85, 82], [113, 104, 99], [117, 107, 103], [63, 60, 59], [67, 70, 71], [73, 77, 78], [95, 96, 98], [165, 151, 145], [250, 208, 191], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 212, 196], [244, 224, 214], [71, 111, 132], [123, 195, 232], [82, 175, 195], [110, 189, 220], [113, 190, 223], [113, 191, 224], [54, 75, 85], [108, 109, 112], [74, 78, 79], [73, 77, 78], [53, 54, 55], [65, 66, 68], [50, 52, 53], [73, 77, 78], [73, 77, 78], [68, 72, 73], [78, 79, 81], [51, 53, 54], [72, 76, 77], [73, 77, 78], [71, 74, 75], [64, 65, 67], [122, 113, 109], [251, 216, 202], [250, 206, 189], [251, 207, 189], [251, 207, 189], [251, 207, 189], [251, 215, 201], [152, 142, 137], [95, 162, 190], [115, 192, 226], [111, 190, 222], [102, 185, 213], [118, 193, 228], [122, 195, 231], [53, 55, 58], [90, 93, 94], [73, 77, 78], [71, 74, 75], [65, 66, 67], [75, 78, 79], [48, 52, 53], [73, 77, 78], [73, 77, 78], [73, 77, 78], [101, 102, 104], [59, 62, 63], [72, 76, 77], [60, 64, 65], [46, 49, 50], [72, 75, 76], [70, 70, 71], [181, 166, 158], [251, 215, 200], [251, 207, 189], [251, 207, 189], [251, 211, 195], [149, 138, 132], [65, 127, 143], [118, 193, 228], [113, 191, 224], [107, 187, 218], [123, 195, 232], [114, 191, 224], [93, 175, 200], [53, 54, 55], [84, 87, 88], [73, 77, 78], [55, 57, 58], [84, 86, 88], [73, 76, 78], [55, 58, 59], [73, 77, 78], [79, 83, 84], [120, 123, 123], [99, 101, 103], [83, 85, 86], [146, 147, 148], [147, 157, 161], [46, 48, 49], [73, 77, 78], [89, 90, 92], [27, 27, 28], [183, 161, 151], [251, 207, 189], [251, 207, 189], [133, 127, 125], [102, 162, 192], [96, 182, 208], [81, 174, 194], [113, 190, 223], [123, 195, 232], [98, 183, 210], [89, 179, 202], [85, 171, 193], [53, 54, 55], [86, 89, 90], [73, 76, 78], [44, 45, 46], [95, 97, 99], [74, 76, 78], [56, 58, 59], [73, 77, 78], [110, 112, 113], [195, 196, 196], [98, 101, 102], [144, 148, 150], [194, 207, 213], [135, 148, 153], [57, 59, 60], [73, 77, 78], [86, 88, 90], [34, 35, 36], [186, 162, 152], [251, 207, 189], [251, 207, 190], [109, 121, 124], [123, 195, 232], [123, 195, 232], [89, 178, 200], [78, 173, 190], [82, 175, 194], [86, 177, 198], [90, 179, 202], [123, 195, 232], [53, 54, 55], [87, 90, 91], [73, 76, 78], [42, 43, 44], [106, 107, 109], [78, 79, 81], [57, 59, 61], [62, 65, 66], [90, 92, 94], [94, 97, 98], [99, 100, 102], [116, 128, 132], [176, 194, 201], [110, 121, 125], [68, 71, 72], [73, 77, 78], [88, 90, 92], [31, 31, 32], [222, 194, 182], [251, 207, 189], [251, 207, 189], [114, 124, 126], [92, 180, 203], [123, 195, 232], [122, 195, 232], [81, 174, 194], [81, 174, 193], [94, 180, 205], [123, 196, 233], [123, 195, 232], [51, 52, 53], [82, 85, 87], [73, 76, 78], [69, 72, 73], [44, 45, 46], [83, 84, 86], [75, 78, 79], [57, 61, 63], [95, 104, 107], [62, 66, 67], [85, 86, 88], [121, 133, 137], [176, 194, 201], [90, 99, 102], [73, 77, 78], [83, 85, 87], [47, 48, 49], [39, 39, 39], [249, 217, 203], [251, 207, 189], [251, 207, 190], [113, 123, 124], [88, 178, 200], [94, 181, 206], [123, 195, 232], [121, 195, 231]] };

	exports.default = defaultData;

/***/ }
/******/ ]);