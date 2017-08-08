const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    new ExtractTextWebpackPlugin('styles.css'), //call the ExtractTextWebpackPlugin constructor and name our css file
    new webpack.optimize.UglifyJsPlugin() //call the uglify plugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), //A directory or URL to serve HTML content from
    historyApiFallback: true, //fallback to /index.html for Single Page Applications
    inline: true, //inline mode (set to false to disable including client scripts (like livereload))
    open: true, //open default browser while launching
  },
  devtool: 'eval-source-map' //enable devtool for better debugging experience
}

module.exports = config;
