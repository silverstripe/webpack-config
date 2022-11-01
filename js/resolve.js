/**
 * Exports the settings for resolve in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production - reserved in case it's needed in the future
 * @param {string} ROOT The root folder containing package.json
 * @param {string} SRC Path to source files
 * @param {string} MODULES The modules folder
 */
module.exports = (ENV, { ROOT, MODULES, SRC }) => ({
  modules: [ROOT, SRC, MODULES],
  extensions: ['.json', '.mjs', '.js', '.jsx'],
  alias: {
    modernizr$: `${SRC}/.modernizrrc`,
  },
  fullySpecified: false,
});
