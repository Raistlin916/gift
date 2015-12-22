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
        let l = this.pts.length;
        let segs = [];
        this.pts.forEach((item, i, arr) => {
            if (!arr[i+1]) {
                return;
            }
            segs.push(arr[i+1].clone().subtract(item));
        });
        let avg = segs.length > 1 ? segs.reduce(function (t, i) {
                return t.clone().add(i);
            }, new Vector(0, 0))
            .divide(new Vector(l, l))
            .normalize() : null;
        this.avg = avg;
    }
}

export default Input;