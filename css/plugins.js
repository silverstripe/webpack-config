const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

/**
 * Exports the settings for plugins in webpack.config
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production - reserved in case it's needed in the future
 * @param {object} PATHS Various important paths - reserved in case they're needed in the future
 * @param {string} filename determines the name of each output CSS file.
 * See https://webpack.js.org/plugins/mini-css-extract-plugin/#filename
 */
module.exports = (ENV, PATHS, filename) => ([
  new MiniCssExtractPlugin({
    filename,
  }),
  new IgnoreEmitPlugin(/\.js$/),
]);
