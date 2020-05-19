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
          query: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "current"
                  },
                  "useBuiltIns": "usage",
                  "corejs": 3
                }
              ],
              "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};