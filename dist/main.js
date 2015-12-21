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

function G$() {

  // Private variables
  var _bowerFolder, _buildsFolder, _docsFolder, _environment, _liveReload, _nodeFolder, _rootFolder, _sassStyle, _serverConfig, _showDeleted, _sourceFolder, _subFolder;
  /**
   * @name G$
   * @author 'Anthony Trimble red2678@gmail.com'
   * @since '11/14/2015'
   *
   * @class G$
   * @classdesc Creates a new G$.
   *
   * @exports G$
   * @requires  path
   * @requires  del
   *
   * @example
   * g$.bowerFolder = 'bower_components';
   * g$.buildsFolder = 'builds';
   * g$.docsFolder = 'docs';
   * g$.liveReload = false;
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
  return new ((function () {

    // noinspection JSUnusedGlobalSymbols
    /**
     * Creates a G$ object
     * @param {Object} [config={}] - Options to initialize the component with
     * @param {!string} [config.bowerFolder="./bower_components/"] - See {@link bowerFolder}
     * @param {!string} [config.buildsFolder="./_BUILDS/dev/mainSite/"] - See {@link buildFolder}
     * @param {!string} [config.docsFolder="./_DOCS/"] - See {@link docs}
     * @param {!string} [config.environment="dev"] - See {@link env}
     * @param {!boolean} [config.liveReload="true"] - See {@link liveReload}
     * @param {!string} [config.nodeFolder="./node_modules/"] - See {@link nodeModulesFolder}
     * @param {!string} [config.rootFolder='./'] - See {@link rootFolder}
     * @param {!object} [config.serverConfig="{}"] - See {@link serverConfig}
     * @param {!boolean} [config.showDeleted="false"] - See {@link showDeleted}
     * @param {!string} [config.site="mainSite"] - See {@link site}
     * @param {!object} [config.sources="{}"] - See {@link sources}
     * @param {!string} [config.sourceFolder="./_SRC/dev/"] - See {@link sourceFolder}
     * @param {!string} [config.subFolder="./_SRC/v1/"] - See {@link subFolder}
     */

    function _class2() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, _class2);

      _bowerFolder = config.bowerFolder || 'bower_components';
      _buildsFolder = config.buildsFolder || 'builds';
      _docsFolder = config.docsFolder || 'docs';
      _environment = config.environment || process.env.NODE_ENV;
      _liveReload = config.liveReload || true;
      _nodeFolder = config.nodeFolder || 'node_modules';
      _rootFolder = config.rootFolder || '.';
      _sassStyle = config.sassStyle;
      _sourceFolder = config.sourceFolder || 'src';
      _serverConfig = config.serverConfig || {
        root: this.build + (this.environment ? this.environment + _path2.default.sep : ''),
        livereload: this.liveReload,
        port: 64033
      };
      _showDeleted = config.showDeleted || false;
      _subFolder = config.subFolder || process.env.GCONFIG_SRCSUB;

      this.debug = config.debug || false;
      this.sourceFiles = config.sourceFiles || {};
    }

    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */

    _createClass(_class2, [{
      key: "loadConfig",
      value: function loadConfig() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _bowerFolder = config.bowerFolder || 'bower_components';
        _buildsFolder = config.buildsFolder || 'builds';
        _docsFolder = config.docsFolder || 'docs';
        _environment = config.environment || process.env.NODE_ENV;
        _liveReload = config.liveReload || true;
        _nodeFolder = config.nodeFolder || 'node_modules';
        _rootFolder = config.rootFolder || '.';
        _sassStyle = config.sassStyle;
        _sourceFolder = config.sourceFolder || 'src';
        _serverConfig = config.serverConfig || {
          root: this.build + (this.environment ? this.environment + _path2.default.sep : ''),
          livereload: this.liveReload,
          port: 64033
        };
        _showDeleted = config.showDeleted || false;
        _subFolder = config.subFolder || process.env.GCONFIG_SRCSUB;

        this.debug = config.debug || false;
        this.sourceFiles = config.sourceFiles || {};

        return this;
      }

      /**
       *
       * @private
       * @param paths
       */

    }, {
      key: "_logDeleted",
      value: function _logDeleted(paths) {
        if (this.showDeleted) {
          console.log('\n********************************************\n' + ('Deleted files/folders: [\n' + paths.join(',\n') + '\n]\n*******************************************'));
        }
      }

      /**
       *
       * @public
       * @returns {void}
       */

    }, {
      key: "buildInfo",
      value: function buildInfo() {
        if (this.debug) {
          console.log('Config :: -----------------------------------\n' + 'DS:: ' + this.DS + ' \n' + 'Bower Folder :: ' + _bowerFolder + ' \n' + 'Builds Folder :: ' + _buildsFolder + ' \n' + 'Docs Folder :: ' + _docsFolder + ' \n' + 'Live Reload :: ' + _liveReload + ' \n' + 'Node Folder :: ' + _nodeFolder + ' \n' + 'Root Folder :: ' + _rootFolder + ' \n' + 'Source Folder :: ' + _sourceFolder + ' \n' + 'Show Deleted :: ' + _showDeleted + ' \n' + 'Sub Folder :: ' + _subFolder + ' \n', 'Paths :: -------------------------------------\n' + 'Bower :: ' + this.bower + '\n' + 'Build :: ' + this.build + '\n' + 'Docs  :: ' + this.docs + '\n' + 'Node :: ' + this.node + '\n' + 'Root :: ' + this.root + '\n' + 'Source :: ' + this.source + '\n' + 'Source Files :: ------------------------------\n' + JSON.stringify(this.sourceFiles, null, 4));
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
      key: "deleteFiles",
      value: function deleteFiles() {
        var files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        this._logDeleted(_del2.default.sync(files));
      }
    }, {
      key: "DS",
      get: function get() {
        return _path2.default.sep || '/';
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
      }

      // noinspection JSMethodCanBeStatic
      ,
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
      key: "build",
      get: function get() {
        return this.root + _buildsFolder + _path2.default.sep + (this.environment ? this.environment + _path2.default.sep : '') + (this.subFolder ? this.subFolder + _path2.default.sep : '');
      },
      set: function set(value) {
        if (value) {
          _buildsFolder = value;
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
        return _sassStyle === 'prod' || _sassStyle === 'ppe' ? 'compressed' : 'expanded';
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
       *  The project source directory test
       * @type {string}
       * @example './_SRC/'
       */

    }, {
      key: "source",
      get: function get() {
        return this.root + _sourceFolder + _path2.default.sep + (this.subFolder ? this.subFolder + _path2.default.sep : '');
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
        return _subFolder;
      },
      set: function set(value) {
        if (value) {
          _subFolder = value;
        }
      }
    }]);

    return _class2;
  })())();
}

var g$ = new G$();

exports.default = g$;

//# sourceMappingURL=GConfig.js.map