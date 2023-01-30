/**
 * Exports a list of modules provided by SilverStripe
 * @param {string} ENV Environment to build for, expects 'production' for production and
 * anything else for non-production - reserved in case it's needed in the future
 * @param {object} PATHS Various important paths - reserved in case they're needed in the future
 * @param {string} module Name of the module and config which is being transpiled.
 * This is only necessary for core module bundles, to avoid including "exports" config for the same
 * bundle that's exposing the given groups of modules.
 */
module.exports = (ENV, PATHS, module) => {
  const exports = {
    'silverstripe/admin/js': {
      // bundles/bundle.js
      'components/Accordion/Accordion': 'Accordion',
      'components/Accordion/AccordionBlock': 'AccordionBlock',
      'components/Badge/Badge': 'Badge',
      'components/Breadcrumb/Breadcrumb': 'Breadcrumb',
      'components/Button/Button': 'Button',
      'components/Button/BackButton': 'BackButton',
      'components/CheckboxSetField/CheckboxSetField': 'CheckboxSetField',
      'components/FieldHolder/FieldHolder': 'FieldHolder',
      'components/Focusedzone/Focusedzone': 'Focusedzone',
      'components/Form/Form': 'Form',
      'components/Form/FormConstants': 'FormConstants',
      'components/FormAction/FormAction': 'FormAction',
      'components/FormAlert/FormAlert': 'FormAlert',
      'components/FormBuilder/FormBuilder': 'FormBuilder',
      'components/FormBuilderModal/FormBuilderModal': 'FormBuilderModal',
      'components/FileStatusIcon/FileStatusIcon': 'FileStatusIcon',
      'components/GridField/GridField': 'GridField',
      'components/GridField/GridFieldCell': 'GridFieldCell',
      'components/GridField/GridFieldHeader': 'GridFieldHeader',
      'components/GridField/GridFieldHeaderCell': 'GridFieldHeaderCell',
      'components/GridField/GridFieldRow': 'GridFieldRow',
      'components/GridField/GridFieldTable': 'GridFieldTable',
      'components/HiddenField/HiddenField': 'HiddenField',
      'components/ListGroup/ListGroup': 'ListGroup',
      'components/ListGroup/ListGroupItem': 'ListGroupItem',
      'components/LiteralField/LiteralField': 'LiteralField',
      'components/Loading/CircularLoading': 'CircularLoading',
      'components/Loading/Loading': 'Loading',
      'components/PopoverField/PopoverField': 'PopoverField',
      'components/Preview/Preview': 'Preview',
      'components/ResizeAware/ResizeAware': 'ResizeAware',
      'components/Search/Search': 'Search',
      'components/Search/SearchToggle': 'SearchToggle',
      'components/Tag/CompactTagList': 'CompactTagList',
      'components/Tag/Tag': 'Tag',
      'components/Tag/TagList': 'TagList',
      'components/TextField/TextField': 'TextField',
      'components/Tip/Tip': 'Tip',
      'components/Toolbar/Toolbar': 'Toolbar',
      'components/TreeDropdownField/TreeDropdownField': 'TreeDropdownField',
      'components/TreeDropdownField/TreeDropdownFieldMenu': 'TreeDropdownFieldMenu',
      'components/TreeDropdownField/TreeDropdownFieldNode': 'TreeDropdownFieldNode',
      'components/VersionedBadge/VersionedBadge': 'VersionedBadge',
      'components/ViewModeToggle/ViewModeToggle': 'ViewModeToggle',
      'containers/EmotionCssCacheProvider/EmotionCssCacheProvider': 'EmotionCssCacheProvider',
      'containers/FormBuilderLoader/FormBuilderLoader': 'FormBuilderLoader',
      'containers/InsertLinkModal/InsertLinkModal': 'InsertLinkModal',
      'containers/InsertLinkModal/fileSchemaModalHandler': 'FileSchemaModalHandler',
      'containers/SudoMode/SudoMode': 'SudoMode',
      'lib/Backend': 'Backend',
      'lib/Config': 'Config',
      'lib/DataFormat': 'DataFormat',
      'lib/formatWrittenNumber': 'formatWrittenNumber',
      'lib/getFormState': 'getFormState',
      'lib/Injector': 'Injector',
      'lib/ReactRouteRegister': 'ReactRouteRegister',
      'lib/reduxFieldReducer': 'reduxFieldReducer',
      'lib/Router': 'Router',
      'lib/schemaFieldValues': 'schemaFieldValues',
      'lib/ShortcodeSerialiser': 'ShortcodeSerialiser',
      'lib/SilverStripeComponent': 'SilverStripeComponent',
      'lib/TinyMCEActionRegistrar': 'TinyMCEActionRegistrar',
      'lib/urls': 'ssUrlLib',
      'lib/withDragDropContext': 'withDragDropContext',
      'lib/withRouter': 'withRouter',
      'state/breadcrumbs/BreadcrumbsActions': 'BreadcrumbsActions',
      'state/records/RecordsActions': 'RecordsActions',
      'state/records/RecordsActionTypes': 'RecordsActionTypes',
      'state/schema/SchemaActions': 'SchemaActions',
      'state/tabs/TabsActions': 'TabsActions',
      'state/toasts/ToastsActions': 'ToastsActions',
      'state/unsavedForms/UnsavedFormsActions': 'UnsavedFormsActions',
      'state/viewMode/ViewModeActions': 'ViewModeActions',
      'state/viewMode/ViewModeStates': 'ViewModeStates',
      // bundles/bundle.js aliases
      config: 'Config', // alias for lib/Config
      // bundles/vendor.js
      '@apollo/client': 'ApolloClient',
      '@apollo/client/react/hoc': 'ApolloClientReactHoc',
      classnames: 'classnames',
      'deep-freeze-strict': 'DeepFreezeStrict',
      'graphql-fragments': 'GraphQLFragments',
      'graphql-tag': 'GraphQLTag',
      'isomorphic-fetch': 'IsomorphicFetch',
      jquery: 'jQuery',
      merge: 'merge',
      modernizr: 'modernizr',
      moment: 'moment',
      'page.js': 'Page',
      'prop-types': 'PropTypes',
      qs: 'qs',
      react: 'React',
      'react-dnd': 'ReactDND',
      'react-dnd-html5-backend': 'ReactDNDHtml5Backend',
      'react-dom': 'ReactDom',
      'react-dom/client': 'ReactDomClient',
      'react-redux': 'ReactRedux',
      'react-router-dom': 'ReactRouterDom',
      'react-select': 'ReactSelect',
      'react-select/async': 'ReactSelectAsync',
      'react-select/async-creatable': 'ReactSelectAsyncCreatable',
      'react-select/creatable': 'ReactSelectCreatable',
      reactstrap: 'Reactstrap',
      redux: 'Redux',
      'redux-form': 'ReduxForm',
      'redux-thunk': 'ReduxThunk',
      url: 'NodeUrl',
      validator: 'validator',
    },
    'silverstripe/asset-admin/js': {
      // bundles/bundle.js
      'containers/InsertEmbedModal/InsertEmbedModal': 'InsertEmbedModal',
      'containers/InsertMediaModal/InsertMediaModal': 'InsertMediaModal',
    },
    // Provided by silverstripe/admin's i18n.js, but doesn't use expose-loader
    i18n: 'i18n',
  };

  // Don't include the exports provided by the current module
  if (module && exports[module] !== undefined) {
    delete exports[module];
  }

  // Flatten exports object down to a single level object
  let retVal = {};
  for (const [key, val] of Object.entries(exports)) {
    if (typeof val === 'object') {
      retVal = Object.assign(retVal, val);
    } else {
      retVal[key] = val;
    }
  }

  return retVal;
};
