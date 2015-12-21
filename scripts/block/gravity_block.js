import {Block, BlockCollection} from './block';

export class GravityBlock extends Block {

    constructor (...args) {
        super(...args);
    }

    onMouseIn () {
        
    }
}

export class GravityBlockCollection extends BlockCollection {

    constructor (...args) {
        super(...args);
        this.childClass = GravityBlock;
    }
}