import React, {Component} from 'react';
import MapContent from './map_content';
import MapReader from './map_reader';


export default class MapGenerator extends Component {
    
    constructor () {
        super();
        
        this.state = {
            columns: 10,
            rows: 10,
            checkList: new Set(),
            data: null
        }
    }
    
    componentDidMount () {
        let data = localStorage.getItem('map_generator_data');
        
        if (data) {
            data = JSON.parse(data);
            this.loadData(data);
        }
    }
    
    render () {
        let result = this.transToExportData();
        return (
            <div style={styles.generatorWrap}>
                <div style={styles.head}>
                    <div>columns: <input type="text" onChange={this.changeSize.bind(this)} data-type="columns" value={this.state.columns} /></div>
                    <div>rows: <input type="text" onChange={this.changeSize.bind(this)} data-type="rows" value={this.state.rows} /></div>
                </div>
                <div onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                    <MapContent columns={this.state.columns} rows={this.state.rows} 
                    onMoveSelectItem={this.onMoveSelectItem.bind(this)}
                    onClickSelectItem={this.onClickSelectItem.bind(this)}
                    checkList={this.state.checkList}
                    data={this.state.data} />
                </div>
                <MapReader export={this.onMapReaderExport.bind(this)}/>
                <div>
                    <input type="text" ref="LOAD_INPUT"/>
                    <button onClick={this.load.bind(this)}>load</button>
                </div>
                <div>
                    <button onClick={this.clean.bind(this)}>clean</button>
                </div>
                <div>{result}</div>
            </div>
        )
    }

    onMouseUp () {
        this.start = false;
    }

    onMouseDown () {
        this.start = true;
    }

    onMapReaderExport (data) {
        this.loadData(data);
    }

    onMoveSelectItem (...args) {
        if (!this.start) {
            return;
        }
        this.onClickSelectItem(...args);
    }

    onClickSelectItem (index, x, y) {
        let checkList = this.state.checkList;
        checkList[checkList.has(index) ? 'delete' : 'add'](index);
        this.setState(checkList, () => this.persistence());
    }
    
    load () {
        let loadString = this.refs.LOAD_INPUT.value;
        this.refs.LOAD_INPUT.value = '';
        let data = JSON.parse(loadString);
        this.loadData(data);
    }
    
    loadData (data) {
        data = JSON.parse(JSON.stringify(data));
        this.setState({
            columns: data.w,
            rows: data.h,
            checkList: new Set(data.list),
            data: data.data
        }, () => {
            this.persistence();
        });
    }
    
    persistence () {
        localStorage.setItem('map_generator_data', this.transToExportData());
    }
    
    clean () {
        this.setState({
            checkList: new Set(),
            data: []
        }, () => {
            this.persistence();
        });
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
            list: list,
            data: this.state.data
        };
        if (data.data == undefined) {
            delete data.data;
        }
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