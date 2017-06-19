var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    "socviewmap": './src/socviewmap.js',
    "socviewmap.min": './src/socviewmap.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      comments: false
    })
  ]
};