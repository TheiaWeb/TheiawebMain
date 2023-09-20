const path = require('path');

module.exports = {
  mode: 'production', // Set the build mode to 'production'
  entry: './TheiaWeb/js/script.js', // Entry point of your JavaScript
  output: {
    filename: 'bundle.js', // Name of the output JavaScript bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
};