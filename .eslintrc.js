// turn these back on progressively
const todo = {
  'react/no-unused-prop-types': [
    // turn to error after this cleanup story is done
    'warn'
  ],
  'react/jsx-filename-extension': [
    // most disruptive with the file renames
    'off'
  ],
  'react/require-default-props': [
    // very useful for future development and generating test/storybook mocks
    'off'
  ],
  'react/prop-types': [
    // useful for getting a clear indication of a component's signature
    'off',
    {
      // shouldn't need to define children, also ineffective to use `PropTypes.node` as it still fails for stateless components
      ignore: ['children']
    }
  ],
  'comma-dangle': [
    'off'
  ],
  'arrow-parens': [
    'off'
  ],
  'indent': [
    'off'
  ],
  'react/no-find-dom-node': [
    // can use refs instead
    'off',
  ],
};

module.exports = {
  'extends': 'airbnb',
  'env': {
    'jasmine': true
  },
  'rules': Object.assign({},
    todo,
    {
      // turned off because the PHP side returns dangling properties which trigger this...
      // could revise later and add exceptions for PHP data
      'no-underscore-dangle': [
        'off',
        {
          'allow': [
            '_t'
          ],
          'allowAfterThis': true
        }
      ],
      'no-unused-vars': [
        'error',
        {
          'vars': 'local'
        }
      ],
      // increased to error because it's strongly discouraged
      'react/no-danger': [
        'error'
      ],
      'no-plusplus': [
        'error',
        {
          'allowForLoopAfterthoughts': true
        }
      ],
      // May revise this when as we get more cleanup done
      'react/forbid-prop-types': [
        'off'
      ],
      'import/prefer-default-export': [
        'off'
      ],
      'import/first': [
        'off'
      ],
      'class-methods-use-this': [
        'off'
      ],
      // this one makes no sense in some regex contexts
      'no-useless-escape': [
        'off'
      ],
      'jsx-a11y/href-no-hash': [
        'off'
      ],
      'jsx-a11y/iframe-has-title': [
        'off'
      ],
      'jsx-a11y/anchor-has-content': [
        'off'
      ],
    }),
  'settings': {
    'import/extensions': [
      '.js',
      '.jsx'
    ],
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx'
        ],
        'moduleDirectory': [
          '.',
          'client/src',
          '../silverstripe-admin/client/src',
          '../silverstripe-admin/node_modules',
          'silverstripe-admin/client/src',
          'silverstripe-admin/node_modules',
          'node_modules'
        ]
      }
    }
  }
};
