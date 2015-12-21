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

	var _heart = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementsByTagName('canvas')[0];
	var input = new _input2.default(canvas);
	canvas.height = 500;
	canvas.width = 500;
	canvas.style.border = '1px solid #e5e5e5';

	var cycle = new _cycle2.default(canvas, input);
	cycle.start();

	canvas.onclick = function (e) {
	  return (0, _heart.createHeartsByHeart)(cycle.getObjs(), e.offsetX, e.offsetY);
	};

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
	        host.addEventListener('mousemove', function (e) {
	            _this.pt = new _victor2.default(e.offsetX, e.offsetY);
	        });

	        host.addEventListener('mouseout', function () {
	            _this.pt = null;
	        });
	    }

	    _createClass(Input, [{
	        key: 'getPt',
	        value: function getPt() {
	            return this.pt;
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
/* 4 */,
/* 5 */,
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
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createHeartsByHeart = exports.createHearts = undefined;

	var _base_object = __webpack_require__(6);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Heart = (function (_BaseObj) {
	  _inherits(Heart, _BaseObj);

	  function Heart() {
	    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Heart);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Heart).call(this, option));

	    _this.color = option.color || 'red';
	    _this.opacity = option.opacity || 1;
	    return _this;
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

	      this.pt.x += t * this.velocity.x;
	      this.pt.y += t * this.velocity.y;

	      this.velocity.y += t * 600;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.save();
	      ctx.translate(this.pt.x, this.pt.y);

	      ctx.globalAlpha = this.opacity;
	      ctx.drawImage(heartCacheMap[this.color], -30, -30);

	      ctx.restore();
	    }
	  }]);

	  return Heart;
	})(_base_object2.default);

	var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

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

	var createHearts = exports.createHearts = function createHearts(objs, x, y) {
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
	    objs.add(heart);
	  }
	};

	var createHeartsByHeart = exports.createHeartsByHeart = function createHeartsByHeart(objs, dx, dy) {
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
	        objs.add(heart);
	      }, n * 10);
	    })(x, y);
	  });
	};

/***/ }
/******/ ]);