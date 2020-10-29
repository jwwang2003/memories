const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CompressionPlugin({
      test: /\.js$|\.jsx$|\.css$|\.html$/,
      minRatio: 0.8
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  }
}