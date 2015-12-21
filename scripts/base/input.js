import Vector from 'victor';

class Input {
    constructor (host) {
        this.host = host;
        this.pt = null;
        this.pts = [];

        host.addEventListener('mousemove', e => {
            this.pt = new Vector(e.offsetX, e.offsetY);
            this.pushPt(this.pt);
            this.calcuState();
        });
        
        host.addEventListener('mouseout', () => {
            this.pt = null;
            this.pts = [];
            this.calcuState();
        });
    }

    pushPt (pt) {
        this.pts.push(pt);
        if (this.pts.length > 4) {
            this.pts.shift();
        }
    }

    calcuState () {
        
    }
}

export default Input;