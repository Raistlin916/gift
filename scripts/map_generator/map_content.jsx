import React, {Component} from 'react';


class Block extends Component {
    render () {
        let blockStyle = Object.assign({}, styles.emptyBlock, this.props.isChecked && styles.fullBlock);
        return (
            <div style={blockStyle} onClick={this.props.onSelectItem}></div>
        )
    }
}

export default class MapContent extends Component {
    render () {
        let blocks = [];
        for (let i=0; i<this.props.rows; i++) {
            let row = [];
            for (let j=0; j<this.props.columns; j++) {
                let index = i*this.props.columns+j;
                row.push(
                    <Block key={index} onSelectItem={ ()=> this.props.onSelectItem(index, j, i) } 
                        isChecked={this.props.checkList.has(index)}/>
                );
            }
            blocks.push(
                <div key={'row' + i}>{row}</div>
            );
        }
        return (
            <div style={styles.blocksWrap}>
                {blocks}
            </div>
        )
    }
}

const styles = {
    blocksWrap: {
        fontSize: 0,
        margin: '20px'
    },
    emptyBlock: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        backgroundColor: 'rgba(0,0,0,.1)',
        margin: '2px',
        userSelect: 'none',
        WebkitUserSelect: 'none'
    },
    fullBlock: {
        backgroundColor: 'rgba(0,0,0,.5)'
    }
}