const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'app': ['./src/ts/index.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].dist.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.pug', '.styl']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/index.pug',
      chunks: ['app']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        // 対象となるファイルの拡張子
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  }
};