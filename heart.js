var canvas = document.getElementsByTagName('canvas')[0];
canvas.height = 1000;
canvas.width = 1000;
canvas.style.border = '1px solid #e5e5e5';

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
    this.opacity -= t * 0.1;
    this.speed.y += t * 300;
  },
  draw: function (elapse) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pt.x, this.pt.y);
    
    var start = null;
    for(var t=0;t<10;t+=0.1){
      var x = 16*(Math.pow(Math.sin(t),3)); 
      var y = -(13*Math.cos(t))+(5*Math.cos(2*t))+(2*Math.cos(3*t))+(Math.cos(4*t));
      x *= 1;
      y *= 1;
      if(!start){
        start = {x:x, y:y};
        ctx.moveTo(x, y);
        continue;
      }
      ctx.lineTo(x, y);
    } 
    
    
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    console.log(ctx.globalAlpha);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
  }
}


function Input() {
  
}
Input.prototype = {
  
};

var objs = [];
(function () {
  var heart;
  for(var i = 0; i < 50; i++) {
     heart = new Heart({
      x: 300,
      y: 300, 
      vx: rand(-200, 200),
      vy: rand(-100, -800),
      color: ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'][rand(0, 5)]
    });   
    objs.push(heart);
  } 
})();



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

setTimeout(start, 1000);

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


