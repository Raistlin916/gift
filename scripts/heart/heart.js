import BaseObj from '../base/base_object';
import {rand} from '../base/utils';

class Heart extends BaseObj {
  constructor (option={}) {
    super(option);
    this.color = option.color || 'red';
    this.opacity = option.opacity || 1;
  }
  
  update (t) {
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
  
  draw (ctx) {
    ctx.save();
    ctx.translate(this.pt.x, this.pt.y);
    
    
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(heartCacheMap[this.color], -30, -30);
    
    ctx.restore();
  }
  
}

const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

function createCanvasCache(ctxProcess) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctxProcess(ctx, canvas); 
  return canvas;
}
let heartCacheMap = {};
colors.forEach( c => {
  let canvas = createCanvasCache( (ctx, canvas) => {
    canvas.width = 60;
    canvas.height = 60;
    ctx.beginPath();
    ctx.translate(30, 30);
    ctx.moveTo(0, 0);

    getHeartPath( (x, y) => ctx.lineTo(x, y));

    ctx.fillStyle = c;
    ctx.closePath();
    ctx.fill();
  });
  
  heartCacheMap[c] = canvas;
}); 

function getHeartPath(cb) {
  let x, y;
  for(let t=0;t<6.6;t+=.1){
    x = 16*(Math.pow(Math.sin(t),3)); 
    y = -(13*Math.cos(t))+(5*Math.cos(2*t))+(2*Math.cos(3*t))+(Math.cos(4*t));
    cb(x, y);
  } 
}

export let createHearts = (objs, x, y) => {
  let heart;
  for(let i = 0; i<100; i++) {
     heart = new Heart({
      x: x,
      y: y, 
      vx: rand(-300, 300),
      vy: rand(-100, -600),
      color: colors[rand(0, 5)],
      opacity: rand(6, 9)/10
    });   
    objs.add(heart);
  } 
};

export let createHeartsByHeart = (objs, dx, dy) => {
  let heart;
  let n = 0;
  getHeartPath(function (x, y) {
    n ++;
    if(n%2 != 0){
      return;
    }

    x *= 10;
    y *= 10;
    
    (function () {
      setTimeout(function(){
        heart = new Heart({
          x: dx + x,
          y: dy + y, 
          vx: 0,
          vy: 0,
          color: colors[rand(0, 5)],
          opacity: rand(6, 10)/10
        });
        objs.add(heart);      
      }, n * 10);
    })(x, y);
    
  });
};