var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /client/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      //<--key to reduce React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

// new webpack.optimize.UglifyJsPlugin(),
// new webpack.optimize.AggressiveMergingPlugin(),
// new CompressionPlugin({
//   asset: '[path].gz[query]',
//   algorithm: 'gzip',
//   test: /\.js$|\.css$|\.html$/,
//   threshold: 10240,
//   minRatio: 0.8
// })
