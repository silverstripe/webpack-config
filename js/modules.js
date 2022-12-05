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
        // .js, .mjs, and .jsx files are caught
        test: /\.m?jsx?$/,
        exclude: new RegExp(`(${MODULES}|${THIRDPARTY})`),
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3', modules: 'commonjs' }],
            '@babel/preset-react',
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
        /*
          Allows importing raw content from a file.
          Usage: import content from 'some-file.txt?raw'

          Also used to execute a script in the global context (replaces script-loader):
          import('someScript?raw').then(rawModule => eval.call(null, rawModule.default));
        */
        resourceQuery: /raw/,
        type: 'asset/source',
        generator: {
          emit: false,
        },
      },
      {
        test: /\.modernizrrc.js$/,
        use: [ '@sect/modernizr-loader' ]
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: [
          '@sect/modernizr-loader',
          'json-loader'
        ]
      },
    ],
  };
};
