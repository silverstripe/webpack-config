const BaseWebpackConfig = require('./baseWebpackConfig');
const externalJS = require('../js/externals');
const moduleJS = require('../js/modules');
const pluginJS = require('../js/plugins');
const resolveJS = require('../js/resolve');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Dynamically generates webpack config for transpiling javascript using Silverstripe default settings
 */
module.exports = class JavascriptWebpackConfig extends BaseWebpackConfig {
  constructor(name, PATHS, moduleName) {
    super();
    moduleName = moduleName ? `${moduleName}/${name}` : null;
    const ENV = process.env.NODE_ENV;
    this.validatePaths(PATHS);
    this.setConfig({
      name,
      output: {
        path: PATHS.DIST,
        filename: 'js/[name].js',
      },
      devtool: (ENV !== 'production') ? 'source-map' : false,
      resolve: resolveJS(ENV, PATHS),
      module: moduleJS(ENV, PATHS),
      externals: externalJS(ENV, PATHS, moduleName),
      plugins: pluginJS(ENV),
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              format: {
                comments: false,
              },
            },
          }),
        ],
      },
    });
  }
}
