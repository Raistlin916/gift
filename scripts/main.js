//import {createHeartsByHeart} from './heart';
import {MysteryBlock} from './mystery_block';
import Cycle from './cycle';
import Input from './input';

const canvas = document.getElementsByTagName('canvas')[0];
const input = new Input(canvas);
canvas.height = 1000;
canvas.width = 1000;
canvas.style.border = '1px solid #e5e5e5';

const cycle = new Cycle(canvas, input);
cycle.start();


const objs = cycle.getObjs();

objs.push(new MysteryBlock({
    x: 100,
    y: 100,
    w: 10,
    h: 10,
    color: 'rgb(255, 160, 32)'
}));

canvas.onclick = e => {
    let pt = {x: e.offsetX, y: e.offsetY};
    objs.forEach( item => item.moveTo(pt));
};
//canvas.onclick = e => createHeartsByHeart(cycle.getObjs(), e.offsetX, e.offsetY);