import Vector from 'victor';

class BaseObj {
    
    constructor (option={}) {
        this.pt = new Vector(option.x, option.y);
        this.size = Object.assign({}, {w: option.w, h: option.h});
        this.velocity = new Vector(option.vx || 0, option.vy || 0);
        this.acc = new Vector(option.ax || 0, option.ay || 0);
    }
    
    update (t) {
        this.velocity.add(this.acc.clone().multiply(new Vector(t, t)));
        this.previousPt = this.pt.clone();
        this.pt.add(this.velocity.clone().multiply(new Vector(t, t)));
    }
    
    draw (ctx) {
        
    }
    
    destroy () {
        this.isDead = true;
    }
}

export default BaseObj;