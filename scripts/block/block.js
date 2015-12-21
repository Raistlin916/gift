import BaseObj from '../base/base_object';

export class Block extends BaseObj {
    constructor (option={}) {
        super(option);
        this.color = option.color;
    }
    
    update (t, input) {
        super.update(t, input);
        
        const mousePt = input.getPt();
        if (mousePt && this.isIn(mousePt)) {
            this.onMouseIn(this);
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