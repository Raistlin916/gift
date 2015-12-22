import {Block, BlockCollection} from './block';
import Vector from 'victor';
import {PRECISION} from '../base/utils';

export class GravityBlock extends Block {

    constructor (...args) {
        super(...args);
    }

    onMouseIn (item, input) {
        if (this.falling || this.targetMoving || !input.avg) {
            return;
        }
        this.falling = true;
        this.acc = input.avg.clone().normalize().multiply(new Vector(200, 200));
        this.fallingTime = 0;
    }

    update (t, ...args) {
        super.update(t, ...args);

        if (this.falling) {
            this.fallingTime += t;

            if (this.fallingTime >= 1) {
                this.falling = false;
                this.moveTo(this.originPt);
            }
        }
    }
}

export class GravityBlockCollection extends BlockCollection {

    constructor (...args) {
        super(...args);
        this.childClass = GravityBlock;
    }
}