const path = require('node:path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]'
        },
      },
    ],
  },
};
