import BaseObj from './base_object';
import Vector from 'victor';

export class Block extends BaseObj {
    constructor (option={}) {
        super(option);
        this.color = option.color;
    }
    
    update (t, input) {
        super.update(t, input);
        
        const mousePt = input.getPt();
        if (mousePt && this.isIn(mousePt)) {
            this.onMouseIn();
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
    
    onMouseIn () {}
}

export class MysteryBlock extends Block {
    constructor (option={}) {
        super(option);
    }
    
    moveTo (pt) {
        let target = Vector.fromObject(pt);
        let dist = this.pt.distance(target);
        this.velocity = target.clone().subtract(this.pt).norm().multiply(new Vector(dist, dist));
        
        this.moveToTarget = target;
        this.moveToSide = this.pt.cross(target) > 0;
        this.moveToSideLen = this.pt.length() > target.length();
    }
    
    update (t, ...args) {
        super.update(t, ...args);
        
        let whenAcross = () => {
            this.moveToTarget = null;
            this.moveToSide = null;
            this.moveToSideLen = null;
            this.velocity = new Vector(0, 0);
        };
        
        if (this.moveToTarget) {
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
    
    onMouseIn () {
        if (this.moveToTarget) return;
        this.moveTo(this.pt.clone().add(new Vector(100, 100)));
    }
}
