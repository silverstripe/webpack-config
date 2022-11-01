const BaseWebpackConfig = require('./baseWebpackConfig');
const externalJS = require('../js/externals');
const moduleJS = require('../js/modules');
const pluginJS = require('../js/plugins');
const resolveJS = require('../js/resolve');

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
      devtool: (ENV !== 'production') ? 'source-map' : '',
      resolve: resolveJS(ENV, PATHS),
      module: moduleJS(ENV, PATHS),
      externals: externalJS(ENV, PATHS, moduleName),
      plugins: pluginJS(ENV),
    });
  }
}
