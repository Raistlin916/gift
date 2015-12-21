import Vector from 'victor';
import BaseObj from '../base/base_object';
import {PRECISION} from '../base/utils';


export class Block extends BaseObj {
    constructor (option={}) {
        super(option);
        this.color = option.color;
        this.originPt = this.pt.clone();
    }
    
    update (t, input) {
        super.update(t, input);
        
        const mousePt = input.pt;
        if (mousePt && this.isIn(mousePt)) {
            this.onMouseIn(this);
        }

        if (this.targetMoving) {
            let a = this.previousPt.distance(this.target);
            let b = this.pt.distance(this.target);
            let c = this.pt.distance(this.previousPt);

            if ( Math.abs(a+b-c) < PRECISION ) {
                this.acc = new Vector(0, 0);
                this.velocity = new Vector(0, 0);
                this.pt = this.target.clone();
                this.targetMoving = false;
                this.target = null;
                this.onTargetMovingEnd();
            }
        }
    }
    
    draw (ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pt.x, this.pt.y, this.size.w, this.size.h);
        ctx.restore();
    }
    
    isIn (targetPt) {
        return this.pt.x <= targetPt.x
            && this.pt.x + this.size.w >= targetPt.x
            && this.pt.y <= targetPt.y
            && this.pt.y + this.size.h >= targetPt.y;
    }

    moveTo (pt) {
        pt = pt.clone();
        if (this.targetMoving) {
            return;
        }
        this.targetMoving = true;
        this.target = pt;
        let target = Vector.fromObject(pt);
        let dist = this.pt.distance(target);
        this.acc = target.clone().subtract(this.pt).norm().multiply(new Vector(100, 100));
    }
    
    onMouseIn () {}
    onTargetMovingEnd () {}
}

export class BlockCollection {
    constructor (childClass) {
        this.childClass = childClass;
        this.items = [];
    }
    
    add (item) {
        item = new this.childClass(item);
        this.items.push(item);
        return item;
    }
    
    update (...args) {
        this.items.forEach( i => i.update(...args) );
    }
    
    draw (...args) {
        this.items.forEach( i => i.draw(...args) );
    }

    reset () {
        this.items.length = 0;
    }

    onItemMouseIn () {}
}