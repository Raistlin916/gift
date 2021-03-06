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
            mapData: null
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
                <MapContent columns={this.state.columns} rows={this.state.rows} 
                    onSelectItem={this.onSelectItem.bind(this)}
                    checkList={this.state.checkList}
                    mapData={this.state.mapData} />
                <MapReader export={this.onMapReaderExport.bind(this)}/>
                <div>
                    <input type="text" ref="LOAD_INPUT"/>
                    <button onClick={this.loadFromInput.bind(this)}>load</button>
                </div>
                <div>
                    <button onClick={this.clean.bind(this)}>clean</button>
                </div>
                <div>{result}</div>
            </div>
        )
    }

    onMapReaderExport (data) {
        this.loadData(data);
    }

    onSelectItem (index, x, y) {
        let checkList = this.state.checkList;
        checkList[checkList.has(index) ? 'delete' : 'add'](index);
        this.setState(checkList, () => this.persistence());
    }
    
    loadFromInput () {
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
            mapData: data.mapData
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
            mapData: null
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
            mapData: this.state.mapData
        };
        if (data.mapData == undefined) {
            delete data.mapData;
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