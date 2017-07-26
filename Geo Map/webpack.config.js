var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    "drawGeoMap": './src/index.js',
    "drawGeoMap.min": './src/index.js'
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
  ],
  // module: {
  //   rules: [{
  //     test: /\.js$/, 
  //     exclude: /node_modules/, 
  //     loader: "babel-loader",
  //     query: {
  //       presets: ["es2015"]
  //     }
  //   }]
  // },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
};