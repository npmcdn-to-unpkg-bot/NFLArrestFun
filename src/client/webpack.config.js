
var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: path.join(__dirname, 'App.js'),
  output: { path: path.join(__dirname, '..', 'public', 'javascripts'), filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['stage-2', 'es2015', 'react']
        }
      }
    ]
  },
};
