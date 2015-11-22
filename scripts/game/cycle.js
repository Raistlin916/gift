
class Cycle {
    
    constructor (canvas, input) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.input = input;
        this.objs = new Set();
    }
    
    start () {
        let last = new Date;
        let round = () => {
            const now = new Date;
            
            let elapse = (now - last)/1000;
            last = now;
            this.update(elapse, this.input);
            this.draw();
            window.requestAnimationFrame(round);
        };
        round(); 
    }
    
    draw () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objs.forEach(item => item.draw(this.ctx));
    }
    
    update (...args) {
        this.objs.forEach(item => item.update(...args));
        this.recycle();
    }
    
    recycle () {
        this.objs.forEach( item => {
            if(item.isDead){
                this.objs.delete(item);
            }
        });
    }
    
    getObjs () {
        return this.objs;
    }
}

export default Cycle;

