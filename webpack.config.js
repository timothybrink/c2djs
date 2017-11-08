const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'c2d.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{from: path.resolve(__dirname, 'test')}])
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  }
};