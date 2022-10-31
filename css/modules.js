const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const Path = require('path');

// Used for autoprefixing css properties (same as Bootstrap Aplha.2 defaults)
const SUPPORTED_BROWSERS = [
  'Chrome >= 35',
  'Firefox >= 31',
  'Edge >= 12',
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
 * @returns {{rules: [*,*,*,*]}}
 */
module.exports = (ENV, { FILES_PATH, SRC, ROOT }) => {
  const cssLoaders = [
    {
        loader: 'style-loader',
    },
    {
      loader: MiniCssExtractPlugin.loader,
      // options: {
      //   publicPath: FILES_PATH,
      // },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        // url: false,
        // minimize: true,
        // discardComments: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            customProperties,
          ],
        }
      },
    },
  ].filter(loader => loader);
  const scssLoaders = [
    ...cssLoaders,
    {
      loader: 'resolve-url-loader',
      options: {
        sourceMap: true,
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [
            Path.resolve(SRC, 'styles'),
            Path.resolve(SRC, 'images'),
            Path.resolve(ROOT, 'vendor/silverstripe/admin/client/src/styles'),
            Path.resolve(ROOT, '../admin/client/src/images'),
            Path.resolve(ROOT, '../../silverstripe/admin/client/src/styles'),
          ]
        },
        implementation: require('sass'),
        sourceMap: true,
      },
    },
  ];

  return {
    rules: [
      {
        test: /\.scss$/,
        use: scssLoaders
      },
      {
        test: /\.css$/,
        use: cssLoaders
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
          name: 'fonts/[name].[ext]?h=[contenthash]',
        },
      },
    ],
  };
};
