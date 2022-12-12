const BaseWebpackConfig = require('./baseWebpackConfig');
const moduleCSS = require('../css/modules');
const pluginCSS = require('../css/plugins');

/**
 * Dynamically generates webpack config for transpiling sass to css using Silverstripe default settings.
 *
 * IMPORTANT: Instead of setting the output name in the output key, add it as the filename in this constructor.
 * Otherwise you will get errors because webpack wants to create a js file for each css file. The js files
 * aren't emitted thanks to the IgnoreEmitPlugin, but this happens after chunk validation.
 */
module.exports = class CssWebpackConfig extends BaseWebpackConfig {
  constructor(name, PATHS, filename = 'styles/[name].css') {
    super();
    const ENV = process.env.NODE_ENV;
    this.validatePaths(PATHS);
    this.setConfig({
      name,
      output: {
        path: PATHS.DIST,
      },
      devtool: (ENV !== 'production') ? 'source-map' : false,
      module: moduleCSS(ENV, PATHS),
      plugins: pluginCSS(ENV, PATHS, filename),
    });
  }
}
