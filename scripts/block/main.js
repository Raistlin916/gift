import Cycle from '../base/cycle';
import Input from '../base/input';
import {MysteryBlockCollection} from './mystery_block';
import defaultData from './data';


const container = document.querySelector('.canvas-container');
const canvas = document.createElement('canvas');
container.appendChild(canvas);
const input = new Input(canvas);
canvas.height = 500;
canvas.width = 500;

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

    if (data.mapData) {
        for (let i=0; i<data.h; i++) {
            for (let j=0; j<data.w; j++) {
                let index = i * data.w + j;
                let pixel = data.mapData[index];
                blocks.add({
                    x: 50 + j * 10,
                    y: 50 + i * 10,
                    w: 8,
                    h: 8,
                    color: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
                });
            }
        }
    } else {
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
    }
    objs.add(blocks);
}

construct();
document.getElementById('load-btn').onclick = construct;