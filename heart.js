'use strict';
var canvas = document.getElementsByTagName('canvas')[0];
canvas.height = 1000;
canvas.width = 1000;
canvas.style.border = '1px solid #e5e5e5';

var colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

var ctx = canvas.getContext('2d');

function Heart (option) {
  this.pt = extend({x:0, y:0}, {x: option.x, y: option.y}); 
  this.speed = extend({x: 0, y: 0}, {x: option.vx, y: option.vy});
  this.color = option.color || 'red';
  this.opacity = option.opacity || 1;
}
Heart.prototype = {
  update: function (t) {
    this.pt.x += t * this.speed.x;
    this.pt.y += t * this.speed.y;
    
    this.opacity -= t * .5;
    if (this.opacity < 0) {
      this.opacity = 0;
      this.destroy();
    }
    
    this.speed.y += t * 600;
  },
  draw: function (elapse) {
    ctx.save();
    ctx.translate(this.pt.x, this.pt.y);
    
    
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(heartCacheMap[this.color], -30, -30);
    
    ctx.restore();
    
  },
  destroy: function () {
    objs.splice(objs.indexOf(this), 1);
  }
  
}

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

    var x, y;
    for(var t=0;t<10;t+=.1){
      x = 16*(Math.pow(Math.sin(t),3)); 
      y = -(13*Math.cos(t))+(5*Math.cos(2*t))+(2*Math.cos(3*t))+(Math.cos(4*t));
      x *= 1;
      y *= 1;
      ctx.lineTo(x, y);
    } 

    ctx.fillStyle = c;
    ctx.closePath();
    ctx.fill();
  });
  
  heartCacheMap[c] = canvas;
}); 



var objs = [];
function createHearts(x, y) {
  var heart;
  for(var i = 0; i < 50; i++) {
     heart = new Heart({
      x: x,
      y: y, 
      vx: rand(-300, 300),
      vy: rand(-100, -600),
      color: colors[rand(0, 5)],
      opacity: rand(6, 10)/10
    });   
    objs.push(heart);
  } 
};
canvas.onclick = function (e) {
  createHearts(e.offsetX, e.offsetY); 
};



function start() {
  var last = new Date;
  function round () {
    var now = new Date;
   
    var elapse = (now - last)/1000;
    last = now;
    update(elapse);
    draw();
    window.requestAnimationFrame(round);
  };
  round();
};

  
function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objs.forEach(function(item){
    item.draw();
  });
}

function update (t) {
  objs.forEach(function(item) {
     item.update(t); 
  });
}

start();

function extend( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

function rand(from, to) {
  return ~~(from + Math.random() * (to - from));
}


