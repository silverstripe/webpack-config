# webpack-config

[![Silverstripe supported module](https://img.shields.io/badge/silverstripe-supported-0071C4.svg)](https://www.silverstripe.org/software/addons/silverstripe-commercially-supported-module-list/)

This NPM package provides a shared common webpack configuration used across all Silverstripe modules,
 this aims to reduce thirdparty module developer fatigue by having a source of truth for configurations and settings used in SilverStripe's webpack.

## What this package gives you

### For JS

* **JavascriptWebpackConfig** This class provides the default webpack config most modules will use for transpiling javascript, along with methods for customisation. It automatically includes all of the configuration listed in Advanced below.

#### Advanced

* **externals.js**: Provides references to packages that are provided by silverstripe-admin or another core silverstripe module. This will tell your webpack to not include the package in your output file, that it is provided and accessible through a global variable to keep your transpiled bundle smaller.
* **modules.js**: The common list of loaders for javascript which webpack should use to get a standard output build, such as babel and modernizr.
* **plugins.js**: Plugins used by webpack, such as:
  * A global `Provide` call for `jQuery`
  * The environment variable `process.env.NODE_ENV` to exclude debug functions in production builds
  * [Webpack Bundle Analyzer plugin](https://www.npmjs.com/package/webpack-bundle-analyzer) to aid profiling
* **resolve.js**: Provides common ways to resolve a package in your src files, so that you reduce the number of relative path imports.

### For CSS

* **CssWebpackConfig** This class provides the default webpack config most modules will use for transpiling sass to css, along with methods for customisation. It automatically includes all of the configuration listed in Advanced below.

#### Advanced

* **modules.js**: The common list of loaders for stylesheets to convert `*.scss` files to a css output file, including exporting images and fonts.
* **plugins.js**: Plugin for webpack to extract the stylesheets into a proper css file.

## Usage

The following keys can be used in the PATHS object whenever one is required as a parameter. Note that the default values only apply when using the abstraction classes.

|Key|Description|Required|Default|
|---|---|---|---|
|ROOT|The root path, where your `webpack.config.js` file is located|yes|No default - error if missing|
|SRC|The absolute path to your source files|only for [advanced usage](#advanced-usage)|`` `${PATHS.ROOT}/client/src` ``|
|DIST|The absolute path to the directory you want to output files to|no|`` `${PATHS.ROOT}/client/dist` ``|
|MODULES|The path (relative to `ROOT`, or an absolute path) to your `node_modules` folder|only for [advanced usage](#advanced-usage)|`'node_modules'`|
|THIRDPARTY|The path (relative to `ROOT`, or an absolute path) to your thirdparty folder containing copies of packages which wouldn't be available on NPM|no|No default|

### Using the abstractions

This library includes `JavascriptWebpackConfig` and `CssWebpackConfig` classes to abstract some of the webpack configuration, so it's easier to standardise config across all of your Silverstripe modules.

#### Javascript

To use all of the default configuration for javascript transpilation, instantiate a new `JavascriptWebpackConfig` object.

This class's constructor takes a `name` string argument (used in the webpack console output and for debugging) and a `PATHS` object. It also has a third argument (`moduleName`) which is only needed for core and supported Silverstripe modules and should be set to the name of the module (e.g. `silverstripe/admin`).

You must set your entry points by passing a valid entry object to the `setEntry()` method. This uses [the normal syntax for webpack `entry`](https://webpack.js.org/concepts/entry-points/).

Finally, you get the actual webpack config by calling `getConfig()`.

#### Sass

The API for getting a webpack config to transpile sass to css is very similar to geting javascript webpack config. You start by instantiating a new `CssWebpackConfig` object.

`CssWebpackConfig` takes the same arguments as `JavascriptWebpackConfig` (except for `moduleName`) - but it also takes an optional `filename` argument. The `filename` ultimately gets passed to a [`MiniCssExtractPlugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/#filename). Its default value is `"styles/[name].css"`

#### Example

This is a minimal example of using this library to build your webpack configuration. It transpiles `client/src/js/main.js` to `client/dist/js/main.js` and `client/src/styles/main.scss` to `client/dist/styles/main.css`.

The css transpilation also includes outputting any referenced fonts to `client/dist/fonts/` and any referenced images larger than 10kb to `client/dist/images/`.

```js
const Path = require('path');
const { JavascriptWebpackConfig, CssWebpackConfig } = require('@silverstripe/webpack-config');

const PATHS = {
  ROOT: Path.resolve(),
};

module.exports = [
  new JavascriptWebpackConfig('js', PATHS)
    .setEntry({
      main: 'js/main.js'
    })
    .getConfig(),
  new CssWebpackConfig('css', PATHS)
    .setEntry({
      main: 'styles/main.scss'
    })
    .getConfig(),
];
```

### Customising abstracted configuration

`JavascriptWebpackConfig` and `CssWebpackConfig` are subclasses of `BaseWebpackConfig`, which provides a couple of methods for customising the resulting config.

#### splitVendor

`splitVendor()` uses the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks) to separate out vendor code into its own file. This method takes two arguments.

The first argument (`vendorChunk`) is the name of the chunk to be split out. This is used in the `name` portion for output filenames. For example, if the output filename is `[name].bundle.js` and `vendorChunk` is `vendor`, the name of the file will be `vendor.bundle.js`. The default value for `vendorChunk` is `vendor`. Note that this _can_ be the name of one of your entry points, in which case the vendor modules will be included in the same file as the transpiled javascript for that entrypoint.

The second argument (`test`) is the regular expression or function that determines which modules are included in this chunk. See [the webpack docs](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouptest) for more information. The default value for `test` is `/[\\/]node_modules[\\/]/`.

#### mergeConfig

`mergeConfig()` allows you to merge your own raw webpack configuration into the configuration created by the abstractions. This will also override any default configuration which uses the same keys.

It takes a single webpack configuration object as an argument.

#### Additional customisation

Most customisation will be achievable with one of the above two methods - but you might have a really specific use case where you want to dome something that can't be achieved with merging config (e.g. remove or replace one of the default plugins). In that case, you can manipulate the final configuration after calling `getConfig()` - since that method gives you the actual webpack configuration object the abstractions produced.

In that case however you may find you are better served by avoiding the abstractions, and building your configuration [the advanced way](#advanced-usage).

#### Example

This example includes several customisations (explained with comments in the example) of the abstracted configuration. It transpiles `js/src/main.js` to `js/dist/main.bundle.js` (with a separate vendor bundle in `js/dist/vendor.bundle.js`) and `css/src/main.scss` to `css/dist/main.css`. Fonts referenced in css are output to `fonts/` and images to `images/`.

Note that in this example we use `mergeConfig()` to merge an [output](https://webpack.js.org/concepts/output/#root) object to change the name of the transpiled javascript files, but for css we pass the name into the `CssWebpackConfig` constructor. This is because sass to css transpilation is using `MiniCssExtractPlugin`, which is in control of the output name of the css. If you try to change the name of css files using `output.filename`, you'll get errors (you can still any other `output` configuration via `mergeConfig()` though).

```js
const Path = require('path');
const webpack = require('webpack');
const { JavascriptWebpackConfig, CssWebpackConfig } = require('@silverstripe/webpack-config');

const PATHS = {
  ROOT: Path.resolve(),
  SRC: Path.resolve(),
};

const config = [
  // Use a different DIST directory for js than is used for css
  new JavascriptWebpackConfig('js', { ...PATHS, DIST: `${PATHS.ROOT}/js/dist` })
    .setEntry({
      main: 'js/src/main.js'
    })
    // Output the javascript with a different filename schema than the default
    .mergeConfig({
      output: {
        filename: '[name].bundle.js',
      },
    })
    // Split any vendor modules out into a separate `vendor.bundle.js` file
    .splitVendor()
    .getConfig(),
  // Use a different DIST directory for css than is used for js, and output the css with a
  // different filename schema than the default
  new CssWebpackConfig('css', { ...PATHS, DIST: `${PATHS.ROOT}/css/dist` }, '[name].bundle.css')
    .setEntry({
      main: 'css/src/main.scss'
    })
    // Copy some files at the same time as transpiling the css
    .mergeConfig({
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: `${PATHS.ROOT}/some-extra-files`,
              to: `${PATHS.ROOT}/extra-files-output`
            },
          ],
        }),
      ],
    })
    .getConfig(),
];

module.exports = config;
```

### Advanced usage

There may be situations where you want to make complex modifications to the default webpack configuration generated by the abstractions provided in this library - or where you want to have your configuration more explicitly declared in your `webpack.config.js` file. In those cases, you can bypass the abstractions completely.

#### Example

This is a minimal example of how to build a webpack configuration array for Silverstripe modules without using the abstraction classes. It produces the exact same configuration (and therefore the same output files) as the example [using the abstractions](#using-the-abstractions) above.

```js
const Path = require('path');
const {
  resolveJS,
  externalJS,
  moduleJS,
  pluginJS,
  moduleCSS,
  pluginCSS,
} = require('@silverstripe/webpack-config');

const ENV = process.env.NODE_ENV;

// All of the keys are required in your PATHS object except DIST and THIRDPARTY
// Be aware that there is no validation for this - you may not get errors if you are missing
// some of this config, but you will likely get unexpected output
const PATHS = {
  ROOT: Path.resolve(),
  SRC: Path.resolve('client/src'),
  DIST: Path.resolve('client/dist'),
  MODULES: 'node_modules',
  THIRDPARTY: 'thirdparty',
};

module.exports = [
  {
    name: 'js',
    entry: {
      main: 'js/main.js'
    },
    output: {
      path: PATHS.DIST,
      filename: 'js/[name].js',
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
      main: 'styles/main.scss'
    },
    // Just like with the abstractions, we don't include output.filename, because the filename
    // is handled by MiniCssExtractPlugin
    output: {
      path: PATHS.DIST,
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    module: moduleCSS(ENV, PATHS),
    // Pass the filename here, which will get passed down to MiniCssExtractPlugin
    plugins: pluginCSS(ENV, PATHS, 'css/[name].css'),
  },
];
```

#### Customising raw configuration

Because you're dealing with a raw webpack configuration object already, it can be easier to customise than the abstracted config.

For example to add another external module to the externals configuration, merge your externals configuration with `externalJS()` (you could also achieve this using `mergeConfig()` with the abstractions):

```js
module.exports = [
  {
    name: 'js',
    //...
    external: Object.assign({},
      externalJS(ENV, PATHS),
      {
        'components/MyCustomComponent': 'MyCustomComponent',
      }
    ),
  },
];
```

Or to modify the directory for images from `images/` to `assets/`, you can modify `rule.generator.filename` for the appropriate rule in `moduleCSS()` (which you cannot achieve using the abstractions without modifying the configuration object after calling `getConfig()`):

```js
const cssModules = moduleCSS(ENV, PATHS);
for (let rule of cssModules.rules) {
  if (rule.test === '/\.(png|gif|jpe?g|svg)$/') {
    rule.generator.filename = 'assets/[name][ext]';
  }
}

module.exports = [
  {
    name: 'css',
    //...
    module: cssModules,
  },
];
```
