# webpack-config
This NPM package provides a shared common webpack configuration used across all SilverStripe modules,
 this aims to reduce thirdparty module developer fatigue by having a source of truth for configurations and settings used in SilverStripe's webpack.

## What this package gives you:
For JS:
* **externals.js**: Provides references to packages that are provided by silverstripe-admin or another core silverstripe module. This will tell your webpack to not include the package in your output file, that it is provided and accessible through a global variable.
* **modules.js**: The common list of loaders for javascript which webpack should use to get a standard output build, such as babel and modernizr.
* **plugins.js**: Plugins used by webpack, such as:
  * A global `Provide` call for `jQuery`
  * The environment variable `process.env.NODE_ENV` to exclude debug functions in production builds
  * UglifyJS to remove comments in production builds
* **resolve.js**: Provides common ways to resolve a package in your src files, so that you reduce the number of relative path imports.

For CSS:
* **modules.js**: The common list of loaders for stylesheets to convert `*.scss` files to a css output file, handles some autoprefixing for browser specific rules.
* **plugins.js**: Plugin for webpack to extract the stylesheets into a proper css file.

## An example webpack.config.js
This package provides only partial config declarations. You still need to import these into your main `webpack.config.js` file
and add them accordingly.

This approach opens up the option to easily update or modify any of the configs without nesting.

**my-module/webpack.config.js**
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
const PATHS = {
  // the root path, where your webpack.config.js is located.
  ROOT: Path.resolve(),
  // your node_modules folder name, or full path
  MODULES: 'node_modules',
  // relative path from your css files to your other files, such as images and fonts
  FILES_PATH: '../',
  // thirdparty folder containing copies of packages which wouldn't be available on NPM
  THIRDPARTY: 'thirdparty',
  // the root path to your javascript source files
  SRC: Path.resolve('client/src'),
};

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
    plugins: pluginJS(ENV, PATHS),
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

module.exports = config;
```

## To customise
You can easily extend the configuration provided, for example to add another external to the list provided:
```js
const config = {
  external: externalJS(ENV, PATHS),
}
```
will become:
```js
const config = {
  external: Object.assign({},
    externalJS(ENV, PATHS),
    {
      'components/MyCustomComponent': 'MyCustomComponent',
    }
  ),
}
```

## Release process

This package will be automatically published to NPM when the following steps are taken:

1. The `version` key in `package.json` is updated on `master`
2. A new release is created in GitHub from `master`

Ensure you set the new version appropriately (considering Semver) and consistently between the `version` key and the release.

