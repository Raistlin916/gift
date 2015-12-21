import {Block, BlockCollection} from './block';
import {rand} from '../base/utils';
import Vector from 'victor';

export class MysteryBlock extends Block {
    constructor (option={}) {
        super(option);
    }
    
    moveTo (pt) {
        let target = Vector.fromObject(pt);
        let dist = this.pt.distance(target);
        this.velocity = target.clone().subtract(this.pt).norm().multiply(new Vector(dist*4, dist*4));
        
        this.moveToTarget = target;
        this.moveToSide = this.pt.cross(target) > 0;
        this.moveToSideLen = this.pt.length() > target.length();
    }
    
    isMove () {
        return !!this.moveToTarget;    
    }
    
    update (t, ...args) {
        super.update(t, ...args);
        
        let whenAcross = () => {
            this.pt = this.moveToTarget;
            this.moveToTarget = null;
            this.moveToSide = null;
            this.moveToSideLen = null;
            this.velocity = new Vector(0, 0);
        };
        
        if (this.isMove()) {
            let cross = this.pt.cross(this.moveToTarget);
            if (cross == 0) {
                let moveToSideLen = this.pt.length() > this.moveToTarget.length();
                if (moveToSideLen != this.moveToSideLen) {
                    whenAcross();
                    return;
                }
            } else {
                if (cross > 0 != this.moveToSide) {
                    whenAcross();
                    return;
                }
            }
        }
    }
}


export class MysteryBlockCollection extends BlockCollection {

    constructor (...args) {
        super(...args);
        this.childClass = MysteryBlock;
    }

    add (item) {
        item = super.add(item);
        item.onMouseIn = this.onItemMouseIn.bind(this);
    }

    onItemMouseIn (item) {
        let correspondingIndex = rand(0, this.items.length);
        let correspondingItem = this.items[correspondingIndex];
        if (correspondingItem == item) {
            return;
        }
        if (item.isMove() || correspondingItem.isMove()) {
            return;
        }
        item.moveTo(correspondingItem.pt);
        correspondingItem.moveTo(item.pt);
    }
}