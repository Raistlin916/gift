import {Block, BlockCollection} from './block';
import {rand} from '../base/utils';
import Vector from 'victor';

class MysteryBlock extends Block {
    onTargetMovingEnd () {
        this.pt = this.originPt.clone();
    }
}


export class MysteryBlockCollection extends BlockCollection {

    constructor (...args) {
        super(...args);
        this.childClass = MysteryBlock;
    }

    add (item) {
        item = super.add(item);
        item.onMouseIn = this.onItemMouseIn.bind(this);
    }

    onItemMouseIn (item) {
        let correspondingIndex = rand(0, this.items.length);
        let correspondingItem = this.items[correspondingIndex];
        if (correspondingItem == item) {
            return;
        }
        if (item.targetMoving || correspondingItem.targetMoving) {
            return;
        }
        item.moveTo(correspondingItem.pt);
        correspondingItem.moveTo(item.pt);
    }
}