//import {createHeartsByHeart} from './heart';
import {MysteryBlockCollection} from './mystery_block';
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
const blocks = new MysteryBlockCollection();

for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
        blocks.add({
            x: 100 + i*12,
            y: 100 + j*12,
            w: 10,
            h: 10,
            color: 'rgb(255, 160, 32)'
        });
    }
}



objs.push(blocks);


//canvas.onclick = e => createHeartsByHeart(cycle.getObjs(), e.offsetX, e.offsetY);