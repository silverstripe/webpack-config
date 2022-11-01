const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Exports the settings for css modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {string} SRC The path to the source scss files
 * @param {string} ROOT The path to the root of the project, this is so we can scope for
 * importing silverstripe-admin sass from other modules
 * @returns {{rules: [*,*,*,*]}}
 */
module.exports = (ENV, { SRC, ROOT }) => {
  const useSourceMap = ENV !== 'production';

  const cssLoaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: useSourceMap,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: useSourceMap,
        postcssOptions: {
          plugins: [
            'autoprefixer',
            'postcss-custom-properties',
          ],
        },
      },
    },
  ];

  const scssLoaders = [
    ...cssLoaders,
    {
      loader: 'resolve-url-loader',
      options: {
        sourceMap: useSourceMap,
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [
            Path.resolve(SRC, 'styles'),
            Path.resolve(ROOT, 'vendor/silverstripe/admin/client/src/styles'),
            Path.resolve(ROOT, '../admin/client/src/styles'),
            Path.resolve(ROOT, '../../silverstripe/admin/client/src/styles'),
          ],
        },
        sourceMap: true, // required for resolve-url-loader to be happy
      },
    },
  ];

  return {
    rules: [
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        exclude: /fonts[\/\\]([\w_-]+)\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        // Any .woff, woff2, eot, ttf, or otf file - or svgs specifically in a fonts folder.
        test: /(\.(woff2?|eot|ttf|otf)|fonts[\/\\]([\w_-]+)\.svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]?h=[contenthash]',
        },
      },
    ],
  };
};
