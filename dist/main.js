/* eslint-disable */
'use strict';

// Node Modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.g$ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  /**
   * @constructor
   * @description Creates a G$ object with default values
   */

  // Private variables
  function G$() {
    _classCallCheck(this, G$);

    function _ref(_id) {
      if (!(_id instanceof G$)) {
        throw new TypeError('Function return value violates contract.\n\nExpected:\nG$\n\nGot:\n' + _inspect(_id));
      }

      return _id;
    }

    this._buildsFolder = 'builds';

    if (!(typeof this._buildsFolder === 'string')) {
      throw new TypeError('Value of "this._buildsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._buildsFolder));
    }

    this._docsFolder = 'docs';

    if (!(typeof this._docsFolder === 'string')) {
      throw new TypeError('Value of "this._docsFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._docsFolder));
    }

    this._environment = 'dev';

    if (!(typeof this._environment === 'string')) {
      throw new TypeError('Value of "this._environment" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._environment));
    }

    this._DS = _path2.default.sep || '/';

    if (!(typeof this._DS === 'string')) {
      throw new TypeError('Value of "this._DS" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._DS));
    }

    this._nodeFolder = 'node_modules';

    if (!(typeof this._nodeFolder === 'string')) {
      throw new TypeError('Value of "this._nodeFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._nodeFolder));
    }

    this._rootFolder = '.';

    if (!(typeof this._rootFolder === 'string')) {
      throw new TypeError('Value of "this._rootFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._rootFolder));
    }

    this._sassStyle = 'compressed';

    if (!(typeof this._sassStyle === 'string')) {
      throw new TypeError('Value of "this._sassStyle" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sassStyle));
    }

    this._sourceFolder = 'src';

    if (!(typeof this._sourceFolder === 'string')) {
      throw new TypeError('Value of "this._sourceFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._sourceFolder));
    }

    this._showDeleted = false;
    this._subFolder = '';

    if (!(typeof this._subFolder === 'string')) {
      throw new TypeError('Value of "this._subFolder" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._subFolder));
    }

    this._debug = false;
    this.sourceFiles = {};
    return _ref(this);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Loads a gconfig into a G$ instance
   * @param {Object} [config={}] - Options to initialize the component with
   * @param {!string} [config.buildsFolder='./_BUILDS/dev/mainSite/']
   * @param {!string} [config.docsFolder='./_DOCS/'] - See {@link docs}
   * @param {!string} [config.environment='dev'] - See {@link env}
   * @param {!string} [config.nodeFolder='./node_modules/']
   * @param {!string} [config.rootFolder='./'] - See {@link rootFolder}
   * @param {!boolean} [config.showDeleted='false'] - See {@link showDeleted}
   * @param {!string} [config.site='mainSite'] - See {@link site}
   * @param {!object} [config.sources='{}'] - See {@link sources}
   * @param {!string} [config.sourceFolder='./_SRC/dev/'] - See {@link sourceFolder}
   * @param {!string} [config.subFolder='./_SRC/v1/'] - See {@link subFolder}
   */

  _createClass(G$, [{
    key: 'loadConfig',
    value: function loadConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      function _ref2(_id2) {
        if (!(_id2 instanceof G$)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nG$\n\nGot:\n' + _inspect(_id2));
        }

        return _id2;
      }

      if (!(config instanceof Object)) {
        throw new TypeError('Value of argument "config" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(config));
      }

      this._buildsFolder = config.buildsFolder || this._buildsFolder || 'builds';
      this._docsFolder = config.docsFolder || this._docsFolder || 'docs';
      this._environment = config.environment || process.env.NODE_ENV || 'dev';

      if (!(typeof this._environment === 'string')) {
        throw new TypeError('Value of "this._environment" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._environment));
      }

      this._DS = _path2.default.sep || '/';

      if (!(typeof this._DS === 'string')) {
        throw new TypeError('Value of "this._DS" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(this._DS));
      }

      this._nodeFolder = config.nodeFolder || this._nodeFolder || 'node_modules';
      this._rootFolder = config.rootFolder || this._rootFolder || '.';
      this._sassStyle = config.sassStyle || this._sassStyle || 'compressed';
      this._sourceFolder = config.sourceFolder || this._sourceFolder || 'src';
      this._showDeleted = config.showDeleted || this._showDeleted || false;
      this._subFolder = config.subFolder || this._subFolder || process.env.GCONFIG_SRCSUB || '';
      this._debug = config.debug || this._debug || false;
      this.sourceFiles = this._objectReplace(config.sourceFiles, '/\/|\\/', this.DS);

      if (!(this.sourceFiles instanceof Object)) {
        throw new TypeError('Value of "this.sourceFiles" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(this.sourceFiles));
      }

      return _ref2(this);
    }

    /**
     * Replaces all occurrences of needle (interpreted as a regular expression with replacement and returns the
     * new object.
     *
     * @param entity The object on which the replacements should be applied to
     * @param needle The search phrase (as a regular expression)
     * @param replacement Replacement value
     * @param affectsKeys[optional=true] Whether keys should be replaced
     * @param affectsValues[optional=true] Whether values should be replaced
     */

  }, {
    key: '_objectReplace',
    value: function _objectReplace(entity, needle, replacement) {
      var affectsKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var affectsValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (!(entity instanceof Object)) {
        throw new TypeError('Value of argument "entity" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(entity));
      }

      if (!(typeof needle === 'string')) {
        throw new TypeError('Value of argument "needle" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(needle));
      }

      if (!(typeof replacement === 'string')) {
        throw new TypeError('Value of argument "replacement" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(replacement));
      }

      if (!(typeof affectsKeys === 'boolean')) {
        throw new TypeError('Value of argument "affectsKeys" violates contract.\n\nExpected:\nboolean\n\nGot:\n' + _inspect(affectsKeys));
      }

      if (!(typeof affectsValues === 'boolean')) {
        throw new TypeError('Value of argument "affectsValues" violates contract.\n\nExpected:\nboolean\n\nGot:\n' + _inspect(affectsValues));
      }

      var regExp = new RegExp(needle, 'g');
      var newEntity = {};

      for (var property in entity) {
        if (!entity.hasOwnProperty(property)) {
          continue;
        }

        var value = entity[property];
        var newProperty = property;

        if (affectsKeys) {
          newProperty = property.replace(regExp, replacement);
        }

        if (affectsValues) {

          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'string':
              value = value.replace(regExp, replacement);
              break;

            case 'object':
              if (Array.isArray(value)) {
                (function () {
                  var newArr = [];

                  value.forEach(function (element) {
                    newArr.push(element.replace(regExp, replacement));
                  });

                  value = newArr;
                })();
              } else {
                value = this._objectReplace(value, needle, replacement, affectsKeys, affectsValues);
              }

              break;
          }
        }

        newEntity[newProperty] = value;
      }

      return newEntity;
    }
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
  }, {
    key: 'buildInfo',
    value: function buildInfo() {
      if (this._debug) {
        console.log('Config ::\n  -----------------------------------\n    DS:: ' + this.DS + '\n    Environment: ' + this._environment + '\n    Debug: ' + this._debug.toString() + '  \n    Builds Folder :: ' + this._buildsFolder + ' \n    Docs Folder :: ' + this._docsFolder + ' \n    Node Folder :: ' + this._nodeFolder + ' \n    Root Folder :: ' + this._rootFolder + ' \n    Source Folder :: ' + this._sourceFolder + ' \n    Show Deleted :: ' + this._showDeleted.toString() + ' \n    Sub Folder :: ' + this._subFolder + '\n        Paths :: -------------------------------------\n        Build :: ' + this.build + '\n        Docs  :: ' + this.docs + '\n        Node :: ' + this.node + '\n        Root :: ' + this.root + '\n        Source :: ' + this.source + '\n        Source Files :: ------------------------------\n        ' + JSON.stringify(this.sourceFiles, null, 4));
      }
    }
  }, {
    key: 'deleteFiles',
    value: function deleteFiles() {
      var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

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
      return this._DS;
    }
  }, {
    key: 'build',
    get: function get() {
      function _ref8(_id8) {
        if (!(typeof _id8 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id8));
        }

        return _id8;
      }

      return _ref8(this.root + this._buildsFolder + _path2.default.sep + (this.environment ? this.environment + _path2.default.sep : '') + (this.subFolder ? this.subFolder + _path2.default.sep : ''));
    }
  }, {
    key: 'docs',
    get: function get() {
      function _ref9(_id9) {
        if (!(typeof _id9 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id9));
        }

        return _id9;
      }

      return _ref9(this.root + this._docsFolder + _path2.default.sep);
    }
  }, {
    key: 'environment',
    get: function get() {
      return this._environment;
    },
    set: function set(value) {
      if (!(typeof value === 'string')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(value));
      }

      if (value) {
        this._environment = value;
      }
    }
  }, {
    key: 'node',
    get: function get() {
      function _ref12(_id12) {
        if (!(typeof _id12 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id12));
        }

        return _id12;
      }

      return _ref12(this.root + this._nodeFolder + _path2.default.sep);
    }
  }, {
    key: 'root',
    get: function get() {
      function _ref13(_id13) {
        if (!(typeof _id13 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id13));
        }

        return _id13;
      }

      return _ref13(this._rootFolder + _path2.default.sep);
    }
  }, {
    key: 'sassStyle',
    get: function get() {
      function _ref14(_id14) {
        if (!(typeof _id14 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id14));
        }

        return _id14;
      }

      return _ref14(this._sassStyle === 'prod' || this._sassStyle === 'ppe' ? 'compressed' : 'expanded');
    }
  }, {
    key: 'showDeleted',
    get: function get() {
      return this._showDeleted;
    },
    set: function set(value) {
      if (!(typeof value === 'boolean')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nboolean\n\nGot:\n' + _inspect(value));
      }

      if (value) {
        this._showDeleted = value;
      }
    }
  }, {
    key: 'source',
    get: function get() {
      function _ref17(_id17) {
        if (!(typeof _id17 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id17));
        }

        return _id17;
      }

      return _ref17(this.root + this._sourceFolder + _path2.default.sep + (this.subFolder ? this.subFolder + _path2.default.sep : ''));
    }
  }, {
    key: 'subFolder',
    get: function get() {
      return this._subFolder;
    }
  }]);

  return G$;
}();

var g$ = exports.g$ = new G$();

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
      if (depth > maxDepth) return '[...]';

      var first = _inspect(input[0], depth);

      if (input.every(function (item) {
        return _inspect(item, depth) === first;
      })) {
        return first.trim() + '[]';
      } else {
        return '[' + input.slice(0, maxKeys).map(function (item) {
          return _inspect(item, depth);
        }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
      }
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