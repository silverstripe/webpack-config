/**
 * Exports the settings for javascript modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production
 * @param {string} MODULES The modules folder
 * @param {string} THIRDPARTY A thirdparty folder, self-hosted modules.
 * @returns {{rules: Array.<*>}}
 */
module.exports = (ENV, { MODULES, THIRDPARTY }) => {
  return {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
      },
      {
        // .js and .jsx and .mjs files are caught
        test: /\.m?jsx?$/,
        exclude: new RegExp(`(${MODULES}|${THIRDPARTY})`),
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
          ],
          plugins: [

          ],
          comments: false,
          cacheDirectory: (ENV !== 'production'),
        },
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        exclude: /fonts[\/\\]([\w_-]+)\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: '/i18n.js/',
        use: 'script-loader',
      },
      {
        test: /\.modernizrrc$/,
        use: [
          'modernizr-loader',
          'json-loader',
        ],
      },
    ],
  };
};
