import {createHeartsByHeart} from './heart';
import Cycle from './cycle';

const canvas = document.getElementsByTagName('canvas')[0];
canvas.height = 1000;
canvas.width = 1000;
canvas.style.border = '1px solid #e5e5e5';

const cycle = new Cycle(canvas);
cycle.start();


canvas.onclick = e => createHeartsByHeart(cycle.getObjs(), e.offsetX, e.offsetY);