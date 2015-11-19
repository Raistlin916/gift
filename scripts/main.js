import {rand} from './utils';
import {createHeartsByHeart} from './heart';

const canvas = document.getElementsByTagName('canvas')[0];
canvas.height = 1000;
canvas.width = 1000;
canvas.style.border = '1px solid #e5e5e5';
const ctx = canvas.getContext('2d');


let objs = [];
canvas.onclick = e => createHeartsByHeart(objs, e.offsetX, e.offsetY);


function start() {
  let last = new Date;
  function round () {
    const now = new Date;
   
    let elapse = (now - last)/1000;
    last = now;
    update(elapse);
    draw();
    recycle();
    window.requestAnimationFrame(round);
  };
  round();
};

  
function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objs.forEach(item => item.draw(ctx));
}

function update (t) {
  objs.forEach(item => item.update(t));
}

function recycle () {
  objs.forEach( item => {
    if(item.isDead){
      objs.splice(objs.indexOf(item), 1);
    }
  });
}

start();

