import Cycle from '../base/cycle';
import Input from '../base/input';
import {GravityBlockCollection} from './gravity_block';
import {MysteryBlockCollection} from './mystery_block';

const container = document.querySelector('.canvas-container');
const canvas = document.createElement('canvas');
container.appendChild(canvas);
const input = new Input(canvas);
canvas.height = 1000;
canvas.width = 1000;

const cycle = new Cycle(canvas, input);
cycle.start();


const objs = cycle.getObjs();
const blocks = new GravityBlockCollection();


function createImageDataReader(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return function (x, y, w, h) {
        if (x > img.width || y > img.height) {
            return null;
        }
        return ctx.getImageData(x, y, w, h);
    }
}

function construct (dx, dy, blocks, img, size) {
    blocks.reset();
    let reader = createImageDataReader(img);

    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            let w = 20;
            let h = 20;
            let imgData = reader(j * w, i * h, w, h);
            if (imgData == null) {
                continue;
            }

            blocks.add({
                x: dx + j * (w),
                y: dy + i * (h),
                w: w,
                h: h,
                imgData: imgData
            });
        }
    }
    objs.add(blocks);
}
const img = new Image();
img.onload = function () {
    construct(100, 50, blocks, img, 20);
}
img.src = '../assets/merry_christmas.jpg';