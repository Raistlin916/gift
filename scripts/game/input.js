import Vector from 'victor';

class Input {
    constructor (host) {
        this.host = host;
        this.pt = null;
        host.addEventListener('mousemove', e => {
            this.pt = new Vector(e.offsetX, e.offsetY);
        });
        
        host.addEventListener('mouseout', () => {
            this.pt = null;
        });
    }
    
    getPt () {
        return this.pt;
    }
}

export default Input;