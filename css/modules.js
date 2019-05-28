const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const Path = require('path');

// Used for autoprefixing css properties (same as Bootstrap Aplha.2 defaults)
const SUPPORTED_BROWSERS = [
  'Chrome >= 35',
  'Firefox >= 31',
  'Edge >= 12',
  'Explorer >= 11',
  'iOS >= 8',
  'Safari >= 8',
  'Android 2.3',
  'Android >= 4',
  'Opera >= 12',
];

/**
 * Exports the settings for css modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {string} FILES_PATH The relative path from dist-css file to dist-images/dist-fonts
 * @param {string} SRC The path to the source scss files
 * @param {string} ROOT The path to the root of the project, this is so we can scope for
 * silverstripe-admin variables.scss
 * @param {boolean} useStyle Determines whether to use the style loader or extract text plugin
 * @returns {{rules: [*,*,*,*]}}
 */
module.exports = (ENV, { FILES_PATH, SRC, ROOT }, { useStyle } = {}) => {
  const cssLoaders = [
    (useStyle)
      ? ({
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      })
      : null,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        minimize: true,
        discardComments: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: [
          autoprefixer({ browsers: SUPPORTED_BROWSERS }),
          customProperties,
        ],
      },
    },
  ].filter(loader => loader);
  const scssLoaders = [
    ...cssLoaders,
    {
      loader: 'resolve-url-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [
          Path.resolve(SRC, 'styles'),
          Path.resolve(ROOT, 'vendor/silverstripe/admin/client/src/styles'),
          Path.resolve(ROOT, '../admin/client/src/styles'),
          Path.resolve(ROOT, '../../silverstripe/admin/client/src/styles'),
        ],
        sourceMap: true,
      },
    },
  ];

  return {
    rules: [
      {
        test: /\.scss$/,
        loader: useStyle
          ? undefined
          : (
            ExtractTextPlugin.extract({
              publicPath: FILES_PATH,
              use: scssLoaders,
            })
          ),
        use: useStyle
          ? scssLoaders
          : undefined,
      },
      {
        test: /\.css$/,
        loader: useStyle
          ? undefined
          : (
            ExtractTextPlugin.extract({
              publicPath: FILES_PATH,
              use: cssLoaders,
            })
          ),
        use: useStyle
          ? cssLoaders
          : undefined,
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        exclude: /fonts[\/\\]([\w_-]+)\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /fonts[\/\\]([\w_-]+)\.(woff2?|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  };
};
