import Vector from 'victor';

class BaseObj {
    
    constructor (option={}) {
        this.pt = new Vector(option.x, option.y);
        this.size = Object.assign({}, {w: option.w, h: option.h});
        this.velocity = new Vector(option.vx, option.vy);
    }
    
    update (t) {
        this.pt.add(this.velocity.clone().multiply(new Vector(t, t)));
    }
    
    draw (ctx) {
        
    }
    
    destroy () {
        this.isDead = true;
    }
}

export default BaseObj;