var path = require('path');

module.exports = {
  entry: './src/threatmap.js',
  output: {
    filename: 'threatmap.js',
    path: path.resolve(__dirname, 'dist')
  }
};
