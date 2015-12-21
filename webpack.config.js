var path = require('path');


module.exports = {
    entry: {
      block: './scripts/block/main.js',
      heart: './scripts/heart/main.js',
      map_generator: './scripts/map_generator/main.jsx'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'out/'),
        publicPath: "/out/",
        filename: '[name].bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
}