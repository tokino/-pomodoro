const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      DEFAULT_SEC: 60 * 25,
      DEFAULT_BREAK_SEC: 60 * 5,
    })

  ],
});