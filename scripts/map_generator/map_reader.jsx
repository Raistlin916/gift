import React, {Component} from 'react';

export default class MapReader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imageData: null,
            size: 20
        }
    }
    render () {
        if (this.state.imageData) {
            this.serializeImage(this.state.imageData);
        }
        return (
            <div style={styles.mapReaderWrap}>
                <div style={styles.mapReader} onDrop={this.onDrop.bind(this)} 
                    onDragOver={this.onDragOver.bind(this)}>
                    <img src={this.state.imageData}/>
                </div>
                <div>
                    <label>reader size</label>
                    <input type="text" value={this.state.size} onChange={this.onSizeChange.bind(this)}/>
                </div>
            </div>
        );
    }

    onDrop (e) {
        e.stopPropagation();
        e.preventDefault();

        let dt = e.dataTransfer;
        let files = dt.files;

        this.handleFiles(files);
    }

    onDragOver (e) {
        e.stopPropagation();
        e.preventDefault();
    }

    handleFiles (files) {
        var file = files[0];
        var imageType = /^image\//;
        
        if (!imageType.test(file.type)) {
            return;
        }
        
        var reader = new FileReader();
        reader.onload = (e) => {
            let data = e.target.result;
            this.setState({
                imageData: data
            });
        }
        reader.readAsDataURL(file);
    }

    serializeImage (data) {
        let canvas = document.createElement('canvas');
        let img = document.createElement('img');
        img.src = data;
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            this.props.export(this.rasterize(ctx));
        }
    }

    onSizeChange (e) {
        this.setState({size: e.target.value});
    }

    rasterize (ctx) {
        let rowNum = this.state.size;
        let columnNum = this.state.size;
        let w = ctx.canvas.height/columnNum;
        let h = ctx.canvas.height/rowNum;
        let averageImageData = {
            data: [],
            w: rowNum,
            h: columnNum
        };

        for (let i=0;i<rowNum;i++) {
            for (let j=0;j<columnNum;j++) {
                let data = ctx.getImageData(j*w, i*h, w, h);
                averageImageData.data.push(this.getAverageImageData(data));
            }
        }

        return averageImageData;
    }

    getAverageImageData (imageData) {
        let w = imageData.width;
        let h = imageData.height;
        let length = imageData.data.length;
        let sum = [0,0,0];
        for (let i=0; i<3; i++) {
            for (let j=i; j<length; j+=4) {
                sum[i] += imageData.data[j];
            }
        }
        return sum.map( i => ~~(i/length*4) );
    }
}


const styles = {
    mapReader: {
        display: 'inline-block',
        minWidth: '200px',
        minHeight: '200px',
        border: '1px solid #e5e5e5',
        margin: '10px'
    },
    mapReaderWrap: {
        margin: '20px'
    }
}