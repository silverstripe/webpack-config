const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * Exports the settings for plugins in webpack.config
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {object} PATHS Various important paths - reserved in case they're needed in the future
 */
module.exports = (ENV, PATHS) => {
  return [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // Builds React in production mode, avoiding console warnings
        NODE_ENV: JSON.stringify(ENV || 'development'),
      },
    }),
    process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin({analyzerPort: 'auto'}),
  ].filter(plugin => plugin);
};
