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

	var _data = __webpack_require__(7);

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
	var blocks = new _mystery_block.MysteryBlockCollection();

	function construct() {
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
	                    x: 50 + j * 10,
	                    y: 50 + i * 10,
	                    w: 8,
	                    h: 8,
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
	                    x: 50 + j * 10,
	                    y: 50 + i * 10,
	                    w: 8,
	                    h: 8,
	                    color: 'rgb(255, 160, 32)'
	                });
	            }
	        }
	    }
	    objs.add(blocks);
	}

	construct();
	document.getElementById('load-btn').onclick = construct;

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MysteryBlockCollection = exports.MysteryBlock = exports.Block = undefined;

	var _base_object = __webpack_require__(5);

	var _base_object2 = _interopRequireDefault(_base_object);

	var _utils = __webpack_require__(6);

	var _victor = __webpack_require__(3);

	var _victor2 = _interopRequireDefault(_victor);

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
	        return _this;
	    }

	    _createClass(Block, [{
	        key: 'update',
	        value: function update(t, input) {
	            _get(Object.getPrototypeOf(Block.prototype), 'update', this).call(this, t, input);

	            var mousePt = input.getPt();
	            if (mousePt && this.isIn(mousePt)) {
	                if (this.moveToTarget) return;
	                this.onMouseIn(this);
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
	        key: 'onMouseIn',
	        value: function onMouseIn() {}
	    }]);

	    return Block;
	})(_base_object2.default);

	var MysteryBlock = exports.MysteryBlock = (function (_Block) {
	    _inherits(MysteryBlock, _Block);

	    function MysteryBlock() {
	        var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, MysteryBlock);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MysteryBlock).call(this, option));
	    }

	    _createClass(MysteryBlock, [{
	        key: 'moveTo',
	        value: function moveTo(pt) {
	            var target = _victor2.default.fromObject(pt);
	            var dist = this.pt.distance(target);
	            this.velocity = target.clone().subtract(this.pt).norm().multiply(new _victor2.default(dist * 4, dist * 4));

	            this.moveToTarget = target;
	            this.moveToSide = this.pt.cross(target) > 0;
	            this.moveToSideLen = this.pt.length() > target.length();
	        }
	    }, {
	        key: 'isMove',
	        value: function isMove() {
	            return !!this.moveToTarget;
	        }
	    }, {
	        key: 'update',
	        value: function update(t) {
	            var _get2,
	                _this3 = this;

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            (_get2 = _get(Object.getPrototypeOf(MysteryBlock.prototype), 'update', this)).call.apply(_get2, [this, t].concat(args));

	            var whenAcross = function whenAcross() {
	                _this3.pt = _this3.moveToTarget;
	                _this3.moveToTarget = null;
	                _this3.moveToSide = null;
	                _this3.moveToSideLen = null;
	                _this3.velocity = new _victor2.default(0, 0);
	            };

	            if (this.isMove()) {
	                var cross = this.pt.cross(this.moveToTarget);
	                if (cross == 0) {
	                    var moveToSideLen = this.pt.length() > this.moveToTarget.length();
	                    if (moveToSideLen != this.moveToSideLen) {
	                        whenAcross();
	                        return;
	                    }
	                } else {
	                    if (cross > 0 != this.moveToSide) {
	                        whenAcross();
	                        return;
	                    }
	                }
	            }
	        }
	    }]);

	    return MysteryBlock;
	})(Block);

	var MysteryBlockCollection = exports.MysteryBlockCollection = (function () {
	    function MysteryBlockCollection() {
	        _classCallCheck(this, MysteryBlockCollection);

	        this.items = [];
	    }

	    _createClass(MysteryBlockCollection, [{
	        key: 'add',
	        value: function add(i) {
	            i = new MysteryBlock(i);
	            i.onMouseIn = this.onItemMouseIn.bind(this);
	            this.items.push(i);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }

	            this.items.forEach(function (i) {
	                return i.update.apply(i, args);
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                args[_key3] = arguments[_key3];
	            }

	            this.items.forEach(function (i) {
	                return i.draw.apply(i, args);
	            });
	        }
	    }, {
	        key: 'onItemMouseIn',
	        value: function onItemMouseIn(item) {
	            var correspondingIndex = (0, _utils.rand)(0, this.items.length);
	            var correspondingItem = this.items[correspondingIndex];
	            if (correspondingItem == item) {
	                return;
	            }
	            if (item.isMove() || correspondingItem.isMove()) {
	                return;
	            }
	            item.moveTo(correspondingItem.pt);
	            correspondingItem.moveTo(item.pt);
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.items.length = 0;
	        }
	    }]);

	    return MysteryBlockCollection;
	})();

/***/ },
/* 5 */
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
	        this.velocity = new _victor2.default(option.vx, option.vy);
	    }

	    _createClass(BaseObj, [{
	        key: 'update',
	        value: function update(t) {
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var rand = exports.rand = function rand(from, to) {
	    return ~ ~(from + Math.random() * (to - from));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//const defaultData = {"w":"15","h":"15","list":[21,22,23,35,39,49,55,63,66,68,71,78,86,93,95,99,101,109,111,112,113,115,125,129,141,142,143]};

	var defaultData = { "w": 20, "h": 20, "list": [], "mapData": [[122, 195, 232], [109, 189, 220], [84, 176, 196], [102, 168, 198], [84, 88, 90], [31, 32, 32], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [3, 3, 3], [92, 93, 95], [74, 100, 113], [103, 185, 214], [82, 175, 194], [119, 194, 229], [113, 190, 223], [94, 181, 206], [122, 195, 232], [106, 187, 217], [64, 108, 119], [115, 118, 119], [85, 93, 96], [123, 135, 140], [150, 165, 171], [161, 177, 183], [162, 178, 184], [161, 177, 184], [152, 166, 172], [132, 145, 150], [107, 118, 122], [142, 145, 147], [115, 117, 118], [76, 152, 172], [118, 193, 228], [110, 189, 221], [84, 176, 197], [104, 186, 215], [103, 185, 214], [123, 195, 232], [141, 158, 166], [216, 224, 227], [169, 186, 193], [137, 151, 156], [111, 122, 126], [94, 103, 107], [88, 97, 100], [88, 97, 100], [89, 98, 101], [105, 115, 119], [127, 139, 144], [173, 184, 189], [253, 253, 253], [105, 143, 163], [111, 189, 221], [93, 180, 205], [112, 190, 223], [114, 191, 225], [112, 190, 223], [114, 191, 225], [126, 131, 134], [52, 56, 58], [4, 4, 4], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [99, 102, 103], [85, 112, 122], [106, 187, 217], [121, 195, 231], [107, 187, 218], [119, 194, 229], [114, 191, 225], [117, 190, 225], [76, 78, 79], [8, 8, 8], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [83, 86, 87], [79, 98, 108], [119, 194, 229], [112, 190, 223], [100, 184, 211], [123, 195, 232], [123, 195, 232], [118, 191, 227], [30, 35, 37], [62, 58, 56], [144, 126, 119], [132, 109, 100], [181, 149, 137], [91, 77, 71], [218, 179, 165], [116, 96, 88], [22, 18, 16], [14, 11, 10], [0, 0, 0], [0, 0, 0], [26, 27, 27], [65, 94, 109], [113, 191, 224], [101, 184, 212], [96, 182, 207], [123, 196, 233], [106, 166, 196], [115, 140, 153], [8, 13, 16], [162, 149, 143], [192, 163, 154], [129, 94, 86], [103, 75, 68], [184, 149, 136], [198, 163, 149], [251, 206, 189], [138, 107, 98], [95, 69, 63], [155, 115, 105], [202, 178, 169], [46, 43, 41], [42, 66, 76], [104, 134, 144], [100, 176, 204], [122, 195, 232], [98, 183, 210], [98, 128, 138], [167, 143, 133], [60, 55, 53], [148, 136, 130], [164, 154, 149], [94, 68, 59], [139, 119, 113], [240, 198, 183], [207, 171, 156], [251, 207, 189], [193, 162, 150], [101, 76, 68], [132, 118, 113], [215, 198, 190], [68, 62, 60], [103, 94, 90], [174, 150, 141], [92, 138, 161], [106, 187, 217], [123, 196, 232], [115, 138, 150], [223, 184, 170], [96, 82, 77], [204, 188, 180], [252, 237, 230], [167, 128, 116], [201, 174, 165], [247, 209, 195], [200, 163, 149], [251, 207, 189], [245, 223, 214], [159, 116, 104], [216, 192, 183], [251, 232, 223], [131, 120, 115], [168, 143, 134], [222, 188, 175], [80, 130, 147], [108, 188, 219], [100, 184, 212], [85, 134, 152], [175, 146, 136], [150, 127, 119], [213, 196, 187], [223, 195, 183], [251, 206, 189], [251, 207, 189], [220, 169, 154], [192, 145, 133], [249, 205, 187], [251, 207, 189], [251, 207, 189], [221, 182, 167], [235, 211, 200], [142, 134, 131], [124, 110, 106], [169, 146, 136], [104, 165, 196], [123, 195, 232], [123, 196, 232], [120, 191, 227], [94, 102, 106], [167, 146, 138], [172, 158, 151], [240, 203, 188], [251, 207, 189], [251, 207, 189], [191, 148, 135], [235, 187, 171], [246, 200, 182], [251, 207, 189], [251, 207, 189], [238, 196, 180], [250, 219, 206], [152, 131, 123], [127, 114, 109], [90, 117, 127], [100, 184, 212], [93, 181, 206], [123, 196, 233], [123, 196, 232], [112, 178, 212], [116, 134, 143], [127, 127, 127], [251, 221, 208], [251, 207, 189], [251, 207, 189], [250, 206, 189], [231, 186, 170], [250, 206, 188], [251, 207, 189], [251, 207, 189], [251, 207, 189], [232, 209, 198], [138, 115, 107], [147, 140, 138], [120, 191, 227], [123, 195, 232], [123, 195, 232], [108, 188, 220], [104, 186, 216], [114, 191, 225], [122, 195, 232], [99, 150, 176], [219, 200, 192], [251, 212, 196], [251, 207, 189], [206, 170, 156], [195, 161, 147], [195, 160, 147], [230, 190, 174], [251, 207, 189], [251, 215, 200], [145, 140, 137], [143, 134, 132], [151, 143, 139], [92, 155, 180], [103, 186, 215], [105, 186, 216], [109, 189, 220], [123, 195, 232], [123, 195, 232], [119, 194, 229], [120, 194, 230], [100, 139, 159], [210, 192, 184], [251, 213, 198], [246, 201, 184], [165, 126, 115], [214, 169, 155], [251, 207, 189], [250, 215, 200], [153, 140, 134], [137, 126, 121], [193, 166, 155], [208, 185, 175], [181, 167, 161], [98, 147, 173], [112, 190, 223], [123, 195, 232], [107, 187, 218], [105, 187, 216], [110, 189, 222], [109, 175, 208], [89, 141, 167], [71, 77, 80], [171, 157, 150], [232, 200, 187], [27, 22, 20], [126, 104, 96], [234, 204, 192], [109, 104, 101], [139, 129, 125], [251, 216, 202], [227, 187, 173], [244, 202, 186], [212, 181, 170], [102, 91, 88], [123, 196, 232], [96, 182, 207], [100, 184, 211], [112, 190, 222], [74, 104, 119], [76, 77, 79], [66, 68, 69], [77, 80, 81], [53, 55, 57], [92, 87, 84], [71, 65, 62], [93, 85, 82], [72, 71, 70], [83, 85, 87], [141, 133, 128], [251, 208, 191], [251, 206, 189], [251, 206, 189], [251, 211, 194], [171, 159, 153], [123, 195, 232], [99, 183, 210], [111, 190, 222], [94, 155, 183], [88, 89, 90], [73, 77, 78], [61, 63, 64], [65, 67, 68], [61, 65, 65], [72, 76, 77], [79, 81, 83], [60, 63, 64], [73, 77, 78], [65, 67, 68], [90, 86, 85], [249, 214, 200], [250, 206, 189], [251, 206, 189], [243, 207, 192], [111, 135, 145], [112, 190, 223], [106, 187, 217], [119, 193, 228], [68, 121, 140], [92, 95, 96], [73, 76, 78], [68, 69, 71], [69, 72, 73], [65, 69, 70], [87, 91, 92], [100, 102, 104], [88, 91, 91], [119, 124, 127], [55, 58, 59], [81, 83, 84], [93, 86, 83], [251, 209, 193], [239, 200, 185], [106, 133, 146], [91, 177, 201], [108, 188, 219], [108, 188, 218], [88, 178, 201], [65, 119, 137], [93, 96, 97], [68, 71, 72], [77, 78, 80], [68, 70, 72], [66, 70, 71], [142, 144, 145], [108, 110, 111], [155, 164, 167], [145, 159, 165], [64, 67, 68], [80, 83, 84], [70, 67, 66], [251, 209, 191], [225, 189, 175], [92, 157, 184], [116, 192, 226], [84, 176, 196], [80, 174, 193], [109, 188, 219], [82, 130, 155], [91, 93, 95], [70, 73, 74], [60, 62, 63], [81, 82, 84], [58, 61, 63], [82, 88, 90], [80, 82, 84], [138, 152, 157], [122, 134, 139], [75, 78, 80], [69, 70, 72], [100, 94, 91], [251, 207, 189], [230, 195, 181], [71, 143, 162], [110, 189, 221], [113, 190, 223]] };

	exports.default = defaultData;

/***/ }
/******/ ]);