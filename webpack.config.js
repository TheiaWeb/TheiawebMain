const path = require('path');

module.exports = {
  entry: './public/index.js', // Replace './public/index.js' with the path to your project's entry point file
  output: {
    path: path.resolve(__dirname, 'public/dist'), // Replace 'public/dist' with the desired output directory
    filename: 'bundle.js', // Replace 'bundle.js' with the desired output file name
  },
  module: {
    rules: [
      // Define rules for processing different types of files (e.g., JavaScript, CSS, etc.)
      // For example, you can use babel-loader to transpile JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Specify the file extensions that webpack should resolve
  },
};
