
class Cycle {
    
    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.objs = [];
    }
    
    start () {
        let last = new Date;
        let round = () => {
            const now = new Date;
            
            let elapse = (now - last)/1000;
            last = now;
            this.update(elapse);
            this.draw();
            window.requestAnimationFrame(round);
        };
        round(); 
    }
    
    draw () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objs.forEach(item => item.draw(this.ctx));
    }
    
    update (elapse) {
        this.objs.forEach(item => item.update(elapse));
        this.recycle();
    }
    
    recycle () {
        this.objs.forEach( item => {
            if(item.isDead){
                this.objs.splice(this.objs.indexOf(item), 1);
            }
        });
    }
    
    getObjs () {
        return this.objs;
    }
}

export default Cycle;

