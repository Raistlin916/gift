var path = require('path');


module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.join(__dirname, 'out/'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader!jsx-loader?harmony'
        }]
    },
}