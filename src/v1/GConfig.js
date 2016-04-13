
'use strict';

// Node Modules

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name G$
 * @author 'Anthony Trimble red2678@gmail.com'
 * @since '11/14/2015'
 *
 * @class G$
 * @classdesc Creates a new G$.
 *
 * @exports G$
 * @requires 'path'
 * @requires 'del'
 *
 * @example
 * g$.bowerFolder = 'bower_components';
 * g$.buildsFolder = 'builds';
 * g$.docsFolder = 'docs';
 * g$.nodeFolder = 'node_modules';
 * g$.rootFolder = '.';
 * g$.sourceFolder = 'src';
 * g$.sourceFiles = {
   * js: [
   *  g$.source + '*.js'
   * ]};
 * g$.showDeleted = false;
 * g$.subFolder = 'v1';
 */

var G$ = function () {

  // noinspection JSUnusedGlobalSymbols
  /**
   * Creates a G$ object
   * @param {Object} [config={}] - Options to initialize the component with
   * @param {!string} [config.bowerFolder='./bower_components/'] - See {@link bowerFolder}
   * @param {!string} [config.buildsFolder='./_BUILDS/dev/mainSite/'] - See {@link buildFolder}
   * @param {!string} [config.docsFolder='./_DOCS/'] - See {@link docs}
   * @param {!string} [config.environment='dev'] - See {@link env}
   * @param {!boolean} [config.liveReload='true'] - See {@link liveReload}
   * @param {!string} [config.nodeFolder='./node_modules/'] - See {@link nodeModulesFolder}
   * @param {!string} [config.rootFolder='./'] - See {@link rootFolder}
   * @param {!object} [config.serverConfig='{}'] - See {@link serverConfig}
   * @param {!boolean} [config.showDeleted='false'] - See {@link showDeleted}
   * @param {!string} [config.site='mainSite'] - See {@link site}
   * @param {!object} [config.sources='{}'] - See {@link sources}
   * @param {!string} [config.sourceFolder='./_SRC/dev/'] - See {@link sourceFolder}
   * @param {!string} [config.subFolder='./_SRC/v1/'] - See {@link subFolder}
   */

  function G$() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, G$);

    if (!(config instanceof Object)) {
      throw new TypeError('Value of argument "config" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(config));
    }

    this._bowerFolder = config.bowerFolder || 'bower_components';

    if (!(typeof this._bowerFolder === 'string')) {
      throw new TypeError('Value of "this._bowerFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._bowerFolder));
    }

    this._buildsFolder = config.buildsFolder || 'builds';

    if (!(typeof this._buildsFolder === 'string')) {
      throw new TypeError('Value of "this._buildsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._buildsFolder));
    }

    this._docsFolder = config.docsFolder || 'docs';

    if (!(typeof this._docsFolder === 'string')) {
      throw new TypeError('Value of "this._docsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._docsFolder));
    }

    this._nodeFolder = config.nodeFolder || 'node_modules';

    if (!(typeof this._nodeFolder === 'string')) {
      throw new TypeError('Value of "this._nodeFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._nodeFolder));
    }

    this._rootFolder = config.rootFolder || '.';

    if (!(typeof this._rootFolder === 'string')) {
      throw new TypeError('Value of "this._rootFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._rootFolder));
    }

    this._sassStyle = config.sassStyle || 'compressed';

    if (!(typeof this._sassStyle === 'string')) {
      throw new TypeError('Value of "this._sassStyle" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sassStyle));
    }

    this._sourceFolder = config.sourceFolder || 'src';

    if (!(typeof this._sourceFolder === 'string')) {
      throw new TypeError('Value of "this._sourceFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sourceFolder));
    }

    this._showDeleted = config.showDeleted || false;
    this._subFolder = config.subFolder || process.env.GCONFIG_SRCSUB || '';

    if (!(typeof this._subFolder === 'string')) {
      throw new TypeError('Value of "this._subFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._subFolder));
    }

    this._debug = config.debug || false;

    this.sourceFiles = config.sourceFiles || {};

    if (!(this.sourceFiles instanceof Object)) {
      throw new TypeError('Value of "this.sourceFiles" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(this.sourceFiles));
    }

    this.environment = config.environment || process.env.NODE_ENV || 'dev';

    if (!(typeof this.environment === 'string')) {
      throw new TypeError('Value of "this.environment" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this.environment));
    }
  }

  // noinspection JSUnusedGlobalSymbols


  /**
   * Default value :: {}<br>
   * Container for source paths
   * @type {object}
   * @example '{}'
   */

  // Private variables


  _createClass(G$, [{
    key: 'loadConfig',
    value: function loadConfig(config) {
      if (!(config instanceof Object)) {
        throw new TypeError('Value of argument "config" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(config));
      }

      this._bowerFolder = config.bowerFolder || 'bower_components';

      if (!(typeof this._bowerFolder === 'string')) {
        throw new TypeError('Value of "this._bowerFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._bowerFolder));
      }

      this._buildsFolder = config.buildsFolder || 'builds';

      if (!(typeof this._buildsFolder === 'string')) {
        throw new TypeError('Value of "this._buildsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._buildsFolder));
      }

      this._docsFolder = config.docsFolder || 'docs';

      if (!(typeof this._docsFolder === 'string')) {
        throw new TypeError('Value of "this._docsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._docsFolder));
      }

      this.environment = config.environment || process.env.NODE_ENV || 'dev';

      if (!(typeof this.environment === 'string')) {
        throw new TypeError('Value of "this.environment" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this.environment));
      }

      this._nodeFolder = config.nodeFolder || 'node_modules';

      if (!(typeof this._nodeFolder === 'string')) {
        throw new TypeError('Value of "this._nodeFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._nodeFolder));
      }

      this._rootFolder = config.rootFolder || '.';

      if (!(typeof this._rootFolder === 'string')) {
        throw new TypeError('Value of "this._rootFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._rootFolder));
      }

      this._sassStyle = config.sassStyle || 'compressed';

      if (!(typeof this._sassStyle === 'string')) {
        throw new TypeError('Value of "this._sassStyle" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sassStyle));
      }

      this._sourceFolder = config.sourceFolder || 'src';

      if (!(typeof this._sourceFolder === 'string')) {
        throw new TypeError('Value of "this._sourceFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sourceFolder));
      }

      this._showDeleted = config.showDeleted || false;
      this._subFolder = config.subFolder || process.env.GCONFIG_SRCSUB || '';

      if (!(typeof this._subFolder === 'string')) {
        throw new TypeError('Value of "this._subFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._subFolder));
      }

      this._debug = config.debug || false;
      this.sourceFiles = config.sourceFiles || {};

      if (!(this.sourceFiles instanceof Object)) {
        throw new TypeError('Value of "this.sourceFiles" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(this.sourceFiles));
      }

      return this;
    }

    /**
     *
     * @private
     * @param paths
     */

  }, {
    key: '_logDeleted',
    value: function _logDeleted(paths) {
      if (!(Array.isArray(paths) && paths.every(function (item) {
        return typeof item === 'string';
      }))) {
        throw new TypeError('Value of argument "paths" violates contract.\n\nExpected:\nArray<string>\n\nGot:\n' + _inspect(paths));
      }

      if (this.showDeleted) {
        console.log('\n        ********************************************\n        Deleted files/folders:\n        [\n          ' + paths.join(',\n') + '\n        ]\n        *******************************************');
      }
    }

    /**
     *
     * @public
     * @returns {void}
     */

  }, {
    key: 'buildInfo',
    value: function buildInfo() {
      if (this._debug) {
        console.log('Config :: -----------------------------------\n' + 'DS:: ' + this.DS + ' \n' + 'Bower Folder :: ' + this._bowerFolder + ' \n' + 'Builds Folder :: ' + this._buildsFolder + ' \n' + 'Docs Folder :: ' + this._docsFolder + ' \n' + 'Node Folder :: ' + this._nodeFolder + ' \n' + 'Root Folder :: ' + this._rootFolder + ' \n' + 'Source Folder :: ' + this._sourceFolder + ' \n' + 'Show Deleted :: ' + this._showDeleted + ' \n' + 'Sub Folder :: ' + this._subFolder + ' \n', 'Paths :: -------------------------------------\n' + 'Bower :: ' + this.bower + '\n' + 'Build :: ' + this.build + '\n' + 'Docs  :: ' + this.docs + '\n' + 'Node :: ' + this.node + '\n' + 'Root :: ' + this.root + '\n' + 'Source :: ' + this.source + '\n' + 'Source Files :: ------------------------------\n' + JSON.stringify(this.sourceFiles, null, 4));
      }
    }

    /**
     * Wraps node del.sync in {@link _logDeleted}
     * @param {Array<string>} files=[] - The files to be deleted, accepts GLOB patterns.
     * @returns {void}
     * @example const config = new GConfig();
     * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
     */

  }, {
    key: 'deleteFiles',
    value: function deleteFiles() {
      var files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      if (!(Array.isArray(files) && files.every(function (item) {
        return typeof item === 'string';
      }))) {
        throw new TypeError('Value of argument "files" violates contract.\n\nExpected:\nArray<string>\n\nGot:\n' + _inspect(files));
      }

      this._logDeleted(_del2.default.sync(files));
    }
  }, {
    key: 'DS',
    get: function get() {
      function _ref5(_id5) {
        if (!(typeof _id5 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id5));
        }

        return _id5;
      }

      return _ref5(_path2.default.sep || '/');
    }

    /**
     * Default value :: './bower_components/'<br>
     * The project bower directory
     * @type {string}
     * @example './bower_components/'
     */

  }, {
    key: 'bower',
    get: function get() {
      function _ref6(_id6) {
        if (!(typeof _id6 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id6));
        }

        return _id6;
      }

      return _ref6(this.root + this._bowerFolder + _path2.default.sep);
    }

    /**
     * Default value :: './builds/dev/mainSite/'<br>
     * The project builds directory
     * @type {string}
     * @example './builds/dev/mainSite/'
     */

  }, {
    key: 'build',
    get: function get() {
      function _ref7(_id7) {
        if (!(typeof _id7 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id7));
        }

        return _id7;
      }

      return _ref7(this.root + this._buildsFolder + _path2.default.sep + (this.environment ? this.environment + _path2.default.sep : '') + (this.subFolder ? this.subFolder + _path2.default.sep : ''));
    }

    /**
     * Default value :: './docs/'<br>
     * The project docs directory
     * @type {string}
     * @example './_DOCS/'
     */

  }, {
    key: 'docs',
    get: function get() {
      function _ref8(_id8) {
        if (!(typeof _id8 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id8));
        }

        return _id8;
      }

      return _ref8(this.root + this._docsFolder + _path2.default.sep);
    }

    /**
     * Default value :: 'dev'<br>
     * The project environment from the NODE_ENV environmental variable.
     * @type {string}
     * @example 'dev'
     */

  }, {
    key: 'environment',
    get: function get() {
      function _ref9(_id9) {
        if (!(typeof _id9 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id9));
        }

        return _id9;
      }

      return _ref9(this._environment);
    },
    set: function set(value) {
      if (!(typeof value === 'string')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(value));
      }

      if (value) {
        this._environment = value;
      }
    }

    /**
     * Default value :: './node_modules/'<br>
     * The project node modules directory
     * @type {string}
     * @example './node_modules/'
     */

  }, {
    key: 'node',
    get: function get() {
      function _ref11(_id11) {
        if (!(typeof _id11 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id11));
        }

        return _id11;
      }

      return _ref11(this.root + this._nodeFolder + _path2.default.sep);
    }

    /**
     * Default value :: './'<br>
     * The project root directory
     * @type {object}
     * @example './'
     */

  }, {
    key: 'root',
    get: function get() {
      function _ref12(_id12) {
        if (!(typeof _id12 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id12));
        }

        return _id12;
      }

      return _ref12(this._rootFolder + _path2.default.sep);
    }

    /**
     * Get current SASS style based on environment ({@link env}). If 'production' or 'ppe' style is compressed, all
     * other cases style is expanded.
     * @returns {string} 'compressed' || 'expanded'
     * @example const config = new GConfig();
     * config.sassStyle === 'expanded'
     */

  }, {
    key: 'sassStyle',
    get: function get() {
      function _ref13(_id13) {
        if (!(typeof _id13 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id13));
        }

        return _id13;
      }

      return _ref13(this._sassStyle === 'prod' || this._sassStyle === 'ppe' ? 'compressed' : 'expanded');
    }

    /**
     * Default value :: false<br>
     * Whether or not to show deleted gulp files in the console
     * @type {boolean}
     * @example false
     */

  }, {
    key: 'showDeleted',
    get: function get() {
      return this._showDeleted;
    },
    set: function set(value) {
      if (!(typeof value === 'boolean')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nbool\n\nGot:\n' + _inspect(value));
      }

      if (value) {
        this._showDeleted = value;
      }
    }

    /**
     * Default value :: './_SRC/'<br>
     *  The project source directory test
     * @type {string}
     * @example './_SRC/'
     */

  }, {
    key: 'source',
    get: function get() {
      function _ref16(_id16) {
        if (!(typeof _id16 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id16));
        }

        return _id16;
      }

      return _ref16(this.root + this._sourceFolder + _path2.default.sep + (this.subFolder ? this.subFolder + _path2.default.sep : ''));
    }

    /**
     * Default value :: '<none>'<br>
     * The project site from env.GCONFIG_SRCSUB
     * @type {string}
     * @example 'v1'
     */

  }, {
    key: 'subFolder',
    get: function get() {
      return this._subFolder;
    }
  }]);

  return G$;
}();

var g$ = new G$();
module.exports = g$;

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      var _ret = function () {
        if (depth > maxDepth) return {
            v: '[...]'
          };

        var first = _inspect(input[0], depth);

        if (input.every(function (item) {
          return _inspect(item, depth) === first;
        })) {
          return {
            v: first.trim() + '[]'
          };
        } else {
          return {
            v: '[' + input.slice(0, maxKeys).map(function (item) {
              return _inspect(item, depth);
            }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
          };
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}

//# sourceMappingURL=GConfig.js.map