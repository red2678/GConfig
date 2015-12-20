"use strict"

// Node Modules
;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _del = require("del");

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// noinspection JSUnusedLocalSymbols

exports.default = (function () {
  var _bowerFolder, _builds, _docsFolder, _environment, _liveReload, _nodeFolder, _rootFolder, _sassStyle, _serverConfig, _showDeleted, _sourceFolder, _subFolder;

  /**
   * @name Gc
   * @author 'Anthony Trimble red2678@gmail.com'
   * @since '11/14/2015'
   *
   * @class Gc
   * @classdesc Creates a new GConfig.
   *
   * @exports Gc
   * @requires  module:npath
   * @requires  module:del
   *
   * @example const mainConfig = new GConfig({
   *     showDeleted : false,
   *     liveReload : true
   *   });
   */
  return new ((function () {

    /**
     * Creates a GConfig object
     * @param {Object} [config={}] - Options to initialize the component with
     * @param {!string} [config.bowerFolder="./bower_components/"] - See {@link bowerDir}
     * @param {!string} [config.buildFolder="./_BUILDS/dev/mainSite/"] - See {@link buildDir}
     * @param {!string} [config.docsFolder="./_DOCS/"] - See {@link docs}
     * @param {!string} [config.environment="dev"] - See {@link env}
     * @param {!boolean} [config.liveReload="true"] - See {@link liveReload}
     * @param {!string} [config.nodeModulesFolder="./node_modules/"] - See {@link nodeModulesFolder}
     * @param {!string} [config.rootFolder='./'] - See {@link rootDir}
     * @param {!object} [config.serverConfig="{}"] - See {@link serverConfig}
     * @param {!boolean} [config.showDeleted="false"] - See {@link showDeleted}
     * @param {!string} [config.site="mainSite"] - See {@link site}
     * @param {!object} [config.sources="{}"] - See {@link sources}
     * @param {!string} [config.sourceFolder="./_SRC/dev/"] - See {@link srcDir}
     * @param {!string} [config.subFolder="./_SRC/v1/"] - See {@link srcDir}
     */

    function Gc() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, Gc);

      _bowerFolder = config.bowerFolder || 'bower_components';
      _builds = config.buildFolder || 'builds';
      _docsFolder = config.docsFolder || 'docs';
      _environment = config.environment || process.env.NODE_ENV;
      _liveReload = config.liveReload || true;
      _nodeFolder = config.nodeModulesFolder || 'node_modules';
      _rootFolder = config.rootFolder || '.';
      _sassStyle = config.sassStyle;
      _sourceFolder = config.sourceFolder || 'src';
      _serverConfig = config.serverConfig || {
        root: this.builds + (this.environment ? this.environment + _path2.default.sep : ''),
        livereload: this.liveReload,
        port: 64033
      };
      _showDeleted = config.showDeleted || false;
      _subFolder = config.subFolder || process.env.GCONFIG_SRCSUB;

      this.sourceFiles = config.sourceFiles || {};
    }

    /**
     * Capitalizes the first letter of a passed in string
     * @param {string} str='' - The string to capitalize
     * @returns {string} - The string to with the first letter capitalized
     * @example const str = capitalize('my test string');
     * str === 'My test string';
     */

    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */

    _createClass(Gc, [{
      key: "capitalize",
      value: function capitalize() {
        var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      /**
       * Wraps node del.sync in {@link logDeleted}
       * @param {Array<string>} files=[] - The files to be delted, accepts GLOB patterns.
       * @returns {void}
       * @example const config = new GConfig();
       * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
       */

    }, {
      key: "deleteFiles",
      value: function deleteFiles() {
        var files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        this._logDeleted(_del2.default.sync(files));
      }

      /**
       *
       * @private
       * @param paths
       * @param location
       */

    }, {
      key: "_logDeleted",
      value: function _logDeleted(paths) {
        var location = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

        if (this.showDeleted) {
          console.log('\n******************************* *************\n' + (location ? this.capitalize(location) : '') + 'Deleted files/folders: [\n' + paths.join(',\n') + '\n]\n*******************************************');
        }
      }

      /**
       * Default value :: './bower_components/'<br>
       * The project bower directory
       * @type {string}
       * @example './bower_components/'
       */

    }, {
      key: "bower",
      get: function get() {
        return this.root + _bowerFolder + _path2.default.sep;
      },
      set: function set(value) {
        if (value) {
          _bowerFolder = value;
        }
      }

      /**
       * Default value :: './builds/dev/mainSite/'<br>
       * The project builds directory
       * @type {string}
       * @example './builds/dev/mainSite/'
       */

    }, {
      key: "builds",
      get: function get() {
        return this.root + _builds + _path2.default.sep + (this.environment ? this.environment + _path2.default.sep : '') + this.subFolder;
      },
      set: function set(value) {
        if (value) {
          _builds = value;
        }
      }

      /**
       * Default value :: './docs/'<br>
       * The project docs directory
       * @type {string}
       * @example './_DOCS/'
       */

    }, {
      key: "docs",
      get: function get() {
        return this.root + _docsFolder + _path2.default.sep;
      },
      set: function set(value) {
        if (value) {
          _docsFolder = value;
        }
      }

      /**
       * Default value :: 'dev'<br>
       * The project environment from the NODE_ENV environmental variable.
       * @type {string}
       * @example 'dev'
       */

    }, {
      key: "environment",
      get: function get() {
        return _environment;
      },
      set: function set(value) {
        if (value) {
          _environment = value;
        }
      }

      /**
       * Default value :: true<br>
       * Whether or not to use gulp live reload
       * @type {boolean}
       * @example true
       */

    }, {
      key: "liveReload",
      get: function get() {
        return _liveReload;
      },
      set: function set(value) {
        if (value) {
          _liveReload = value;
        }
      }

      /**
       * Default value :: './node_modules/'<br>
       * The project node modules directory
       * @type {string}
       * @example './node_modules/'
       */

    }, {
      key: "node",
      get: function get() {
        return this.root + _nodeFolder + _path2.default.sep;
      },
      set: function set(value) {
        if (value) {
          _nodeFolder = value;
        }
      }

      /**
       * Default value :: './'<br>
       * The project root directory
       * @type {object}
       * @example './'
       */

    }, {
      key: "root",
      get: function get() {
        return _rootFolder + _path2.default.sep;
      },
      set: function set(value) {
        if (value) {
          _rootFolder = value;
        }
      }

      /**
       * Get current SASS style based on environment ({@link env}). If "production" or "ppe" style is compressed, all
       * other cases style is expanded.
       * @returns {string} 'compressed' || 'expanded'
       * @example const config = new GConfig();
       * config.sassStyle === 'expanded'
       */

    }, {
      key: "sassStyle",
      get: function get() {
        return _sassStyle === 'production' || _sassStyle === 'ppe' ? 'compressed' : 'expanded';
      },
      set: function set(style) {
        if (style) {
          _sassStyle = style;
        }
      }

      /**
       * Default value :: see example. If overriding all fields are required.<br>
       * Container for gulp-connect server options
       * @type {object}
       * @example
       * {
         *    root :'./builds/v1/dev/',
         *    livereload : true,
         *    port : 64033
         * }
       */

    }, {
      key: "serverConfig",
      get: function get() {
        return _serverConfig;
      },
      set: function set(config) {
        if (config) {
          _serverConfig = config;
        }
      }

      /**
       * Default value :: false<br>
       * Whether or not to show deleted gulp files in the console
       * @type {boolean}
       * @example false
       */

    }, {
      key: "showDeleted",
      get: function get() {
        return _showDeleted;
      },
      set: function set(value) {
        if (value) {
          _showDeleted = value;
        }
      }

      /**
       * Default value :: './_SRC/'<br>
       *  The project source directory
       * @type {string}
       * @example './_SRC/'
       */

    }, {
      key: "source",
      get: function get() {
        return this.root + _sourceFolder + _path2.default.sep + this.subFolder;
      },
      set: function set(value) {
        if (value) {
          _rootFolder = value;
        }
      }

      /**
       * Default value :: '<none>'<br>
       * The project site from env.GCONFIG_SRCSUB
       * @type {string}
       * @example 'v1'
       */

    }, {
      key: "subFolder",
      get: function get() {
        return _subFolder + _path2.default.sep;
      },
      set: function set(value) {
        if (value) {
          _subFolder = value;
        }
      }
    }]);

    return Gc;
  })())();
})();

//# sourceMappingURL=Gc.js.map