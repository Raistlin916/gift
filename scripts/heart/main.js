import Cycle from '../base/cycle';
import Input from '../base/input';
import {createHeartsByHeart} from './heart';

const canvas = document.getElementsByTagName('canvas')[0];
const input = new Input(canvas);
canvas.height = 500;
canvas.width = 500;
canvas.style.border = '1px solid #e5e5e5';

const cycle = new Cycle(canvas, input);
cycle.start();

canvas.onclick = e => createHeartsByHeart(cycle.getObjs(), e.offsetX, e.offsetY);