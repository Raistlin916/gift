import React, {Component} from 'react';


class Block extends Component {
    render () {
        let blockStyle = {};
        let blockData = this.props.blockData;
        if (blockData) {
            blockStyle = {
                backgroundColor: `rgb(${blockData[0]},${blockData[1]},${blockData[2]})`
            };
        }
        blockStyle = Object.assign({}, styles.block, 
            this.props.isChecked && styles.fullBlock,
            blockStyle);
        return (
            <div style={blockStyle} onClick={this.props.onClickItem}
                onMouseEnter={this.props.onEnterItem}
            ></div>
        )
    }
}

export default class MapContent extends Component {
    render () {
        let blocks = this.props.mapData ? this.renderBlocksByData() : this.renderBlocksByCheckList();
        return (
            <div style={styles.blocksWrap} onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}>
                {blocks}
            </div>
        )
    }

    onMouseDown () {
        this.start = true;
    }

    onMouseUp () {
        this.start = false;
    }


    onClickItem (...args) {
        this.props.onSelectItem(...args);
    }

    onEnterItem (...args) {
        if (!this.start) {
            return;
        }
        this.props.onSelectItem(...args);
    }

    renderBlocksByCheckList () {
        let blocks = [];
        for (let i=0; i<this.props.rows; i++) {
            let row = [];
            for (let j=0; j<this.props.columns; j++) {
                let index = i*this.props.columns+j;

                row.push(
                    <Block key={index}
                        onEnterItem={ ()=> this.onEnterItem(index, j, i) }
                        onClickItem={ ()=> this.onClickItem(index, j, i) }
                        isChecked={this.props.checkList.has(index)}/>
                );
            }
            blocks.push(
                <div key={'row' + i}>{row}</div>
            );
        }
        return blocks;
    }

    renderBlocksByData () {
        let mapData = this.props.mapData;
        let blocks = [];
        for (let i=0; i<this.props.rows; i++) {
            let row = [];
            for (let j=0; j<this.props.columns; j++) {
                let index = i*this.props.columns+j;
                let blockData = mapData[index];
                row.push(
                    <Block key={index}
                        onSelectItem={ ()=> this.onSelectItem(index, j, i) } 
                        blockData={blockData}/>
                );
            }
            blocks.push(
                <div key={'row' + i}>{row}</div>
            );
        }
        return blocks;
    }
}

const styles = {
    blocksWrap: {
        fontSize: 0,
        margin: '20px'
    },
    block: {
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