var path = require('path');

module.exports = {
  entry: './src/socviewmap.js',
  output: {
    filename: 'socviewmap.js',
    path: path.resolve(__dirname, 'dist')
  }
};
