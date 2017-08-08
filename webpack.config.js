const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'), //output path
    filename: 'output.js' //output name
  },
  module: {
    rules: [
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, //excludes node_modules directory
        loader: "babel-loader" //use this babel-core loader
      },
      {
        test: /\.scss$/, //files ending in .scss
        use: ExtractTextWebpackPlugin.extract({ //call our plugin with extract method
          use: ['css-loader', 'sass-loader'], //use these loaders
          fallback: 'style-loader' //fallback for any CSS not extracted
        }) //end extract
      }
    ] //end rules
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css') //call the ExtractTextWebpackPlugin constructor and name our css file
  ]
}

module.exports = config;
