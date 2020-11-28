const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.jsx',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Todo App',
        template: 'public/index.html'
    }),
  ],
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      include: path.join(__dirname, 'src'),
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
  },
};