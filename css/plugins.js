const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Exports the settings for plugins in webpack.config
 */
module.exports = () => ([
  new MiniCssExtractPlugin({
    filename: 'styles/[name].css'
  }),
]);
