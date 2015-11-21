import React, {Component} from 'react';
import MapContent from './map_content';


export default class MapGenerator extends Component {
    
    constructor () {
        super();
        this.state = {
            columns: 10,
            rows: 10,
            checkList: new Set()
        }
    }
    
    render () {
        let result = this.transToExportData();
        return (
            <div style={styles.generatorWrap}>
                <div style={styles.head}>
                    columns: <input type="text" onChange={this.changeSize.bind(this)} data-type="columns" value={this.state.columns} />
                    rows: <input type="text" onChange={this.changeSize.bind(this)} data-type="rows" value={this.state.rows} />
                </div>
                <MapContent columns={this.state.columns} rows={this.state.rows} 
                    onClickItem={this.onClickItem.bind(this)} checkList={this.state.checkList} />
                <div>{result}</div>
            </div>
        )
    }
    
    onClickItem (index, x, y) {
        let checkList = this.state.checkList;
        checkList[checkList.has(index) ? 'delete' : 'add'](index);
        this.setState(checkList);
    }
    
    changeSize (e) {
        let type = e.target.dataset.type;
        this.setState({
           [type]: e.target.value 
        });
    }
    
    transToExportData () {
        let list =  Array.from(this.state.checkList).sort((a, b) => a - b);
        let data = {
            w: this.state.columns,
            h: this.state.rows,
            list: list
        };
        data = JSON.stringify(data);
        return data;
    }
}

const styles = {
    generatorWrap: {
        
    },
    head: {
        
    }
}