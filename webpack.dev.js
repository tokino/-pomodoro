const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "development",
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: false
  },
  plugins: [
    new webpack.DefinePlugin({
      DEFAULT_SEC: 5,
      DEFAULT_BREAK_SEC: 1,
    })
  ]
});