const lodash = require('lodash');

/**
 * A base class for dynamically generating webpack config using Silverstripe default settings
 */
module.exports = class BaseWebpackConfig {
  #vendorChunk = null;
  #config = {};

  /**
   * Validate the paths and provide defaults for missing entries
   * @param {object} PATHS
   */
  validatePaths(PATHS) {
    if (!PATHS.ROOT) {
      throw new Error('PATHS must contain a ROOT key');
    }
    const defaults = {
      MODULES: 'node_modules',
      SRC: `${PATHS.ROOT}/client/src`,
      DIST: `${PATHS.ROOT}/client/dist`,
    };
    lodash.defaults(PATHS, defaults);
  }

  /**
   * Get the webpack config
   */
  getConfig() {
    if (!this.#config.entry || lodash.isEmpty(this.#config.entry)) {
      throw new Error('At least one valid entry is required');
    }
    return this.#config;
  }

  /**
   * Completely override the webpack config
   * @param {object} config
   */
  setConfig(config) {
    this.#config = config;
  }

  /**
   * Split vendor modules out as their own file
   * @param {string} vendorChunk - name of the vendor file (without extension)
   * @param {string|function} test - how to match modules against to include them in the vendor file (see https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouptest)
   */
  splitVendor(vendorChunk = 'vendor', test = /[\\/]node_modules[\\/]/) {
    if (this.#vendorChunk) {
      throw new Error('Vendor can only be split once. For additional cacheGroups use merge().');
    }

    this.#vendorChunk = vendorChunk;

    this.mergeConfig({
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: vendorChunk,
              test: test,
              reuseExistingChunk: true,
              enforce: true,
              chunks: 'all',
            }
          }
        }
      }
    });

    // ensure entries are configured to "depend on" the vendor entry if necessary
    this.#splitVendorFromEntries();
    return this;
  }

  /**
   * The entry object for what needs to be transpiled
   * @see https://webpack.js.org/concepts/entry-points/
   * @param {object} entry
   */
  setEntry(entry) {
    if (!entry || lodash.isEmpty(entry)) {
      throw new Error('entry object must contain at least one valid entry');
    }
    this.#config.entry = entry;
    this.#splitVendorFromEntries();
    return this;
  }

  /**
   * If we are splitting a vendor bundle, make sure all entries "depend on" it as appopriate.
   */
  #splitVendorFromEntries() {
    const entryConfig = this.#config.entry;

    // No action if there's no vendor chunk or no entry for the vendor chunk.
    if (!this.#vendorChunk || !entryConfig || !entryConfig.hasOwnProperty(this.#vendorChunk)) {
      return;
    }

    for (let name in entryConfig) {
      if (name !== this.#vendorChunk) {
        const entry = entryConfig[name];
        // Convert string entry to object so we can add dependOn
        if (typeof entry === 'string') {
          entryConfig[name] = {
            import: entry,
          }
        }
        // The entry must "dependOn" vendor so we can reuse the bundle
        entryConfig[name].dependOn = this.#vendorChunk;
      }
    }
  }

  /**
   * Merge in custom webpack config.
   * @param {object} config
   */
  mergeConfig(config) {
    this.#config = lodash.merge(this.#config, config);
    return this;
  }
}
