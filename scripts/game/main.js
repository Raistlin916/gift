import {MysteryBlockCollection} from './mystery_block';
import Cycle from './cycle';
import Input from './input';
import defaultData from './data';

const canvas = document.getElementsByTagName('canvas')[0];
const input = new Input(canvas);
canvas.height = 500;
canvas.width = 500;
canvas.style.border = '1px solid #e5e5e5';

const cycle = new Cycle(canvas, input);
cycle.start();


const objs = cycle.getObjs();
const blocks = new MysteryBlockCollection();

function construct () {
    let data;
    try {
        data = JSON.parse(document.getElementById('input').value);
    } catch(e) {
        data = defaultData;
    }
    
    blocks.reset();
    
    for (let i=0; i<data.h; i++) {
        for (let j=0; j<data.w; j++) {
            let index = i * data.w + j;
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
    objs.add(blocks);
}

construct();
document.getElementById('load-btn').onclick = construct;


//canvas.onclick = e => createHeartsByHeart(cycle.getObjs(), e.offsetX, e.offsetY);