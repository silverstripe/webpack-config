module.exports = {
  moduleCSS: require('./css/modules'),
  pluginCSS: require('./css/plugins'),

  externalJS: require('./js/externals'),
  moduleJS: require('./js/modules'),
  pluginJS: require('./js/plugins'),
  resolveJS: require('./js/resolve'),

  JavascriptWebpackConfig: require('./configMeta/javascriptWebpackConfig'),
  CssWebpackConfig: require('./configMeta/cssWebpackConfig'),
};
