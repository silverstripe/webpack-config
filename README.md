# webpack-config
Value statement aimed at thirdparty module developers

## What this package gives you:
* **externals.js**: Info about what this does here and why you need it
* **modules.js**: Info about what this does here and why you need it
* **plugins.js**: Info about what this does here and why you need it
* **resolve.js**: Info about what this does here and why you need it

## An example webpack.config.js
This package provides only partial config declarations. You still need to import these into your main `webpack.config.js` file
and add them accordingly.

__my-module/webpack.config.js__
```js
const Path = require('path');
const webpack = require('webpack');
// Import the core config
const webpackConfig = require('@silverstripe/webpack-config');
const {
  resolveJS,
  externalJS,
  moduleJS,
  pluginJS,
  moduleCSS,
  pluginCSS,
} = webpackConfig;

const ENV = process.env.NODE_ENV;

const config = [
  {
    name: 'js',
    entry: {
      main: 'js/src/main.js'
    },
    output: {
      path: 'js/dist',
      filename: '[name].bundle.js',
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    resolve: resolveJS(ENV, PATHS),
    externals: externalJS(ENV, PATHS),
    module: moduleJS(ENV, PATHS),
    plugins: [
      ...pluginJS(ENV, PATHS),
      // Your additional plugins here
    ],
  },
  {
    name: 'css',
    entry: {
      main: 'css/src/main.scss'
    },
    output: {
      path: 'css/dist',
      filename: '[name].css'
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    module: moduleCSS(ENV, PATHS),
    plugins: pluginCSS(ENV, PATHS),
  },
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = (process.env.WEBPACK_CHILD)
  ? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
  : module.exports = config;
```
