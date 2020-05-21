const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/smartemr.jsx',
  output: {
    path: path.resolve(__dirname, 'frontend', 'static', 'frontend'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};