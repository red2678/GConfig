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

  var _bowerFolder, _builds, _docsFolder, _environment, _liveReload, _nodeFolder, _rootFolder, _sassStyle, _serverConfig, _showDeleted, _sourceFolder, _sourceFiles, _subFolder;

  /**
   * @name GConfig
   * @author 'Anthony Trimble red2678@gmail.com'
   * @since '11/14/2015'
   *
   * @class GConfig
   * @classdesc Creates a new GConfig.
   *
   * @exports GConfig
   * @requires  module:npath
   * @requires  module:del
   *
   * @example const mainConfig = new GConfig({
   *     showDeleted : false,
   *     liveReload : true
   *   });
   */
  return (function () {

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

    function GConfig() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, GConfig);

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
      _sourceFiles = config.sourceFiles || {};
      _subFolder = config.subFolder || process.env.GCONFIG_SRCSUB;
    }

    /**
     * Capitalizes the first letter of a passed in string
     * @param {string} str='' - The string to capitalize
     * @returns {string} - The string to with the first letter capitalized
     * @example const str = capitalize('my test string');
     * str === 'My test string';
     */

    _createClass(GConfig, [{
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
       * Default value :: {}<br>
       * Container for source paths
       * @type {object}
       * @example '{}'
       */

    }, {
      key: "sourceFiles",
      get: function get() {
        return _sourceFiles;
      },
      set: function set(config) {
        if (config) {
          _sourceFiles = config;
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

    return GConfig;
  })();
})();
//# sourceMappingURL=data:application/json;base64,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RUFBTztBQUMvQixZQUFJLEtBQUssRUFBRTtBQUNULG9CQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO09BQ0Y7OztXQW5TVSxPQUFPO09Bb1NuQjtDQUNGLENBQUEsRUFBRyIsImZpbGUiOiJHQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblwidXNlIHN0cmljdFwiO1xuXG4vLyBOb2RlIE1vZHVsZXNcbmltcG9ydCBuUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGRlbCBmcm9tIFwiZGVsXCI7XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2Jvd2VyRm9sZGVyOnN0cmluZyxcbiAgICBfYnVpbGRzOnN0cmluZyxcbiAgICBfZG9jc0ZvbGRlcjpzdHJpbmcsXG4gICAgX2Vudmlyb25tZW50OnN0cmluZyxcbiAgICBfbGl2ZVJlbG9hZDpCb29sZWFuLFxuICAgIF9ub2RlRm9sZGVyOnN0cmluZyxcbiAgICBfcm9vdEZvbGRlcjpzdHJpbmcsXG4gICAgX3Nhc3NTdHlsZTpzdHJpbmcsXG4gICAgX3NlcnZlckNvbmZpZzpPYmplY3QsXG4gICAgX3Nob3dEZWxldGVkOkJvb2xlYW4sXG4gICAgX3NvdXJjZUZvbGRlcjpzdHJpbmcsXG4gICAgX3NvdXJjZUZpbGVzOk9iamVjdCxcbiAgICBfc3ViRm9sZGVyOnN0cmluZztcblxuICAvKipcbiAgICogQG5hbWUgR0NvbmZpZ1xuICAgKiBAYXV0aG9yICdBbnRob255IFRyaW1ibGUgcmVkMjY3OEBnbWFpbC5jb20nXG4gICAqIEBzaW5jZSAnMTEvMTQvMjAxNSdcbiAgICpcbiAgICogQGNsYXNzIEdDb25maWdcbiAgICogQGNsYXNzZGVzYyBDcmVhdGVzIGEgbmV3IEdDb25maWcuXG4gICAqXG4gICAqIEBleHBvcnRzIEdDb25maWdcbiAgICogQHJlcXVpcmVzICBtb2R1bGU6bnBhdGhcbiAgICogQHJlcXVpcmVzICBtb2R1bGU6ZGVsXG4gICAqXG4gICAqIEBleGFtcGxlIGNvbnN0IG1haW5Db25maWcgPSBuZXcgR0NvbmZpZyh7XG4gICAqICAgICBzaG93RGVsZXRlZCA6IGZhbHNlLFxuICAgKiAgICAgbGl2ZVJlbG9hZCA6IHRydWVcbiAgICogICB9KTtcbiAgICovXG4gIHJldHVybiBjbGFzcyBHQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHQ29uZmlnIG9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnPXt9XSAtIE9wdGlvbnMgdG8gaW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50IHdpdGhcbiAgICAgKiBAcGFyYW0geyFzdHJpbmd9IFtjb25maWcuYm93ZXJGb2xkZXI9XCIuL2Jvd2VyX2NvbXBvbmVudHMvXCJdIC0gU2VlIHtAbGluayBib3dlckRpcn1cbiAgICAgKiBAcGFyYW0geyFzdHJpbmd9IFtjb25maWcuYnVpbGRGb2xkZXI9XCIuL19CVUlMRFMvZGV2L21haW5TaXRlL1wiXSAtIFNlZSB7QGxpbmsgYnVpbGREaXJ9XG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBbY29uZmlnLmRvY3NGb2xkZXI9XCIuL19ET0NTL1wiXSAtIFNlZSB7QGxpbmsgZG9jc31cbiAgICAgKiBAcGFyYW0geyFzdHJpbmd9IFtjb25maWcuZW52aXJvbm1lbnQ9XCJkZXZcIl0gLSBTZWUge0BsaW5rIGVudn1cbiAgICAgKiBAcGFyYW0geyFib29sZWFufSBbY29uZmlnLmxpdmVSZWxvYWQ9XCJ0cnVlXCJdIC0gU2VlIHtAbGluayBsaXZlUmVsb2FkfVxuICAgICAqIEBwYXJhbSB7IXN0cmluZ30gW2NvbmZpZy5ub2RlTW9kdWxlc0ZvbGRlcj1cIi4vbm9kZV9tb2R1bGVzL1wiXSAtIFNlZSB7QGxpbmsgbm9kZU1vZHVsZXNGb2xkZXJ9XG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBbY29uZmlnLnJvb3RGb2xkZXI9Jy4vJ10gLSBTZWUge0BsaW5rIHJvb3REaXJ9XG4gICAgICogQHBhcmFtIHshb2JqZWN0fSBbY29uZmlnLnNlcnZlckNvbmZpZz1cInt9XCJdIC0gU2VlIHtAbGluayBzZXJ2ZXJDb25maWd9XG4gICAgICogQHBhcmFtIHshYm9vbGVhbn0gW2NvbmZpZy5zaG93RGVsZXRlZD1cImZhbHNlXCJdIC0gU2VlIHtAbGluayBzaG93RGVsZXRlZH1cbiAgICAgKiBAcGFyYW0geyFzdHJpbmd9IFtjb25maWcuc2l0ZT1cIm1haW5TaXRlXCJdIC0gU2VlIHtAbGluayBzaXRlfVxuICAgICAqIEBwYXJhbSB7IW9iamVjdH0gW2NvbmZpZy5zb3VyY2VzPVwie31cIl0gLSBTZWUge0BsaW5rIHNvdXJjZXN9XG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBbY29uZmlnLnNvdXJjZUZvbGRlcj1cIi4vX1NSQy9kZXYvXCJdIC0gU2VlIHtAbGluayBzcmNEaXJ9XG4gICAgICogQHBhcmFtIHshc3RyaW5nfSBbY29uZmlnLnN1YkZvbGRlcj1cIi4vX1NSQy92MS9cIl0gLSBTZWUge0BsaW5rIHNyY0Rpcn1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6b2JqZWN0ID0ge30pOkdDb25maWcge1xuXG4gICAgICBfYm93ZXJGb2xkZXIgPSBjb25maWcuYm93ZXJGb2xkZXIgfHwgJ2Jvd2VyX2NvbXBvbmVudHMnO1xuICAgICAgX2J1aWxkcyA9IGNvbmZpZy5idWlsZEZvbGRlciB8fCAnYnVpbGRzJztcbiAgICAgIF9kb2NzRm9sZGVyID0gY29uZmlnLmRvY3NGb2xkZXIgfHwgJ2RvY3MnO1xuICAgICAgX2Vudmlyb25tZW50ID0gY29uZmlnLmVudmlyb25tZW50IHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WO1xuICAgICAgX2xpdmVSZWxvYWQgPSBjb25maWcubGl2ZVJlbG9hZCB8fCB0cnVlO1xuICAgICAgX25vZGVGb2xkZXIgPSBjb25maWcubm9kZU1vZHVsZXNGb2xkZXIgfHwgJ25vZGVfbW9kdWxlcyc7XG4gICAgICBfcm9vdEZvbGRlciA9IGNvbmZpZy5yb290Rm9sZGVyIHx8ICcuJztcbiAgICAgIF9zYXNzU3R5bGUgPSBjb25maWcuc2Fzc1N0eWxlO1xuICAgICAgX3NvdXJjZUZvbGRlciA9IGNvbmZpZy5zb3VyY2VGb2xkZXIgfHwgJ3NyYyc7XG4gICAgICBfc2VydmVyQ29uZmlnID0gY29uZmlnLnNlcnZlckNvbmZpZyB8fCB7XG4gICAgICAgICAgcm9vdDogdGhpcy5idWlsZHMgKyAoKHRoaXMuZW52aXJvbm1lbnQpID8gdGhpcy5lbnZpcm9ubWVudCArIG5QYXRoLnNlcCA6ICcnKSxcbiAgICAgICAgICBsaXZlcmVsb2FkOiB0aGlzLmxpdmVSZWxvYWQsXG4gICAgICAgICAgcG9ydDogNjQwMzNcbiAgICAgICAgfTtcbiAgICAgIF9zaG93RGVsZXRlZCA9IGNvbmZpZy5zaG93RGVsZXRlZCB8fCBmYWxzZTtcbiAgICAgIF9zb3VyY2VGaWxlcyA9IGNvbmZpZy5zb3VyY2VGaWxlcyB8fCB7fTtcbiAgICAgIF9zdWJGb2xkZXIgPSBjb25maWcuc3ViRm9sZGVyIHx8IHByb2Nlc3MuZW52LkdDT05GSUdfU1JDU1VCO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGxldHRlciBvZiBhIHBhc3NlZCBpbiBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyPScnIC0gVGhlIHN0cmluZyB0byBjYXBpdGFsaXplXG4gICAgICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgc3RyaW5nIHRvIHdpdGggdGhlIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICAgICAqIEBleGFtcGxlIGNvbnN0IHN0ciA9IGNhcGl0YWxpemUoJ215IHRlc3Qgc3RyaW5nJyk7XG4gICAgICogc3RyID09PSAnTXkgdGVzdCBzdHJpbmcnO1xuICAgICAqL1xuICAgIGNhcGl0YWxpemUoc3RyOnN0cmluZyA9ICcnKTpzdHJpbmcge1xuICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyYXBzIG5vZGUgZGVsLnN5bmMgaW4ge0BsaW5rIGxvZ0RlbGV0ZWR9XG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmaWxlcz1bXSAtIFRoZSBmaWxlcyB0byBiZSBkZWx0ZWQsIGFjY2VwdHMgR0xPQiBwYXR0ZXJucy5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKiBAZXhhbXBsZSBjb25zdCBjb25maWcgPSBuZXcgR0NvbmZpZygpO1xuICAgICAqIGNvbmZpZy5kZWxldGVGaWxlcyhbJ2ZvbGRlci9maWxlLmh0bWwnLCAnZm9sZGVyL2ZpbGUuY3NzJywgJ2ZvbGRlci9mb2xkZXItdHdvLyouanMnXSkgLy9zeW5jaHJvbm91cyBhY3Rpb25cbiAgICAgKi9cbiAgICBkZWxldGVGaWxlcyhmaWxlczpBcnJheTxzdHJpbmc+ID0gW10pOnZvaWQge1xuICAgICAgdGhpcy5fbG9nRGVsZXRlZChkZWwuc3luYyhmaWxlcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gcGF0aHNcbiAgICAgKiBAcGFyYW0gbG9jYXRpb25cbiAgICAgKi9cbiAgICBfbG9nRGVsZXRlZChwYXRoczpBcnJheTxzdHJpbmc+LCBsb2NhdGlvbjpzdHJpbmcgPSAnJyk6dm9pZCB7XG4gICAgICBpZiAodGhpcy5zaG93RGVsZXRlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAnXFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKioqKioqKioqKioqXFxuJyArXG4gICAgICAgICAgKGxvY2F0aW9uID8gdGhpcy5jYXBpdGFsaXplKGxvY2F0aW9uKSA6ICcnKSArICdEZWxldGVkIGZpbGVzL2ZvbGRlcnM6IFtcXG4nICtcbiAgICAgICAgICBwYXRocy5qb2luKCcsXFxuJykgK1xuICAgICAgICAgICdcXG5dXFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgOjogJy4vYm93ZXJfY29tcG9uZW50cy8nPGJyPlxuICAgICAqIFRoZSBwcm9qZWN0IGJvd2VyIGRpcmVjdG9yeVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgJy4vYm93ZXJfY29tcG9uZW50cy8nXG4gICAgICovXG4gICAgZ2V0IGJvd2VyKCk6c3RyaW5nIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgKyBfYm93ZXJGb2xkZXIgKyBuUGF0aC5zZXA7XG4gICAgfVxuXG4gICAgc2V0IGJvd2VyKHZhbHVlOnN0cmluZyk6dm9pZCB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgX2Jvd2VyRm9sZGVyID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSA6OiAnLi9idWlsZHMvZGV2L21haW5TaXRlLyc8YnI+XG4gICAgICogVGhlIHByb2plY3QgYnVpbGRzIGRpcmVjdG9yeVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgJy4vYnVpbGRzL2Rldi9tYWluU2l0ZS8nXG4gICAgICovXG4gICAgZ2V0IGJ1aWxkcygpOnN0cmluZyB7XG4gICAgICByZXR1cm4gdGhpcy5yb290ICsgX2J1aWxkcyArIG5QYXRoLnNlcCArICgodGhpcy5lbnZpcm9ubWVudCkgPyB0aGlzLmVudmlyb25tZW50ICsgblBhdGguc2VwIDogJycpICsgdGhpcy5zdWJGb2xkZXI7XG4gICAgfVxuXG4gICAgc2V0IGJ1aWxkcyh2YWx1ZTpzdHJpbmcpOnZvaWQge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIF9idWlsZHMgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHZhbHVlIDo6ICcuL2RvY3MvJzxicj5cbiAgICAgKiBUaGUgcHJvamVjdCBkb2NzIGRpcmVjdG9yeVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgJy4vX0RPQ1MvJ1xuICAgICAqL1xuICAgIGdldCBkb2NzKCk6c3RyaW5nIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgKyBfZG9jc0ZvbGRlciArIG5QYXRoLnNlcDtcbiAgICB9XG5cbiAgICBzZXQgZG9jcyh2YWx1ZTpzdHJpbmcpOnZvaWQge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIF9kb2NzRm9sZGVyID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSA6OiAnZGV2Jzxicj5cbiAgICAgKiBUaGUgcHJvamVjdCBlbnZpcm9ubWVudCBmcm9tIHRoZSBOT0RFX0VOViBlbnZpcm9ubWVudGFsIHZhcmlhYmxlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgJ2RldidcbiAgICAgKi9cbiAgICBnZXQgZW52aXJvbm1lbnQoKTpzdHJpbmcge1xuICAgICAgcmV0dXJuIF9lbnZpcm9ubWVudDtcbiAgICB9XG5cbiAgICBzZXQgZW52aXJvbm1lbnQodmFsdWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBfZW52aXJvbm1lbnQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHZhbHVlIDo6IHRydWU8YnI+XG4gICAgICogV2hldGhlciBvciBub3QgdG8gdXNlIGd1bHAgbGl2ZSByZWxvYWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZSB0cnVlXG4gICAgICovXG4gICAgZ2V0IGxpdmVSZWxvYWQoKTpCb29sZWFuIHtcbiAgICAgIHJldHVybiBfbGl2ZVJlbG9hZDtcbiAgICB9XG5cbiAgICBzZXQgbGl2ZVJlbG9hZCh2YWx1ZTpCb29sZWFuKTp2b2lkIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBfbGl2ZVJlbG9hZCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgOjogJy4vbm9kZV9tb2R1bGVzLyc8YnI+XG4gICAgICogVGhlIHByb2plY3Qgbm9kZSBtb2R1bGVzIGRpcmVjdG9yeVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQGV4YW1wbGUgJy4vbm9kZV9tb2R1bGVzLydcbiAgICAgKi9cbiAgICBnZXQgbm9kZSgpOnN0cmluZyB7XG4gICAgICByZXR1cm4gdGhpcy5yb290ICsgX25vZGVGb2xkZXIgKyBuUGF0aC5zZXA7XG4gICAgfVxuXG4gICAgc2V0IG5vZGUodmFsdWU6c3RyaW5nKTp2b2lkIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBfbm9kZUZvbGRlciA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgOjogJy4vJzxicj5cbiAgICAgKiBUaGUgcHJvamVjdCByb290IGRpcmVjdG9yeVxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGUgJy4vJ1xuICAgICAqL1xuICAgIGdldCByb290KCk6c3RyaW5nIHtcbiAgICAgIHJldHVybiBfcm9vdEZvbGRlciArIG5QYXRoLnNlcDtcbiAgICB9XG5cbiAgICBzZXQgcm9vdCh2YWx1ZTpzdHJpbmcpOnZvaWQge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIF9yb290Rm9sZGVyID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgU0FTUyBzdHlsZSBiYXNlZCBvbiBlbnZpcm9ubWVudCAoe0BsaW5rIGVudn0pLiBJZiBcInByb2R1Y3Rpb25cIiBvciBcInBwZVwiIHN0eWxlIGlzIGNvbXByZXNzZWQsIGFsbFxuICAgICAqIG90aGVyIGNhc2VzIHN0eWxlIGlzIGV4cGFuZGVkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9ICdjb21wcmVzc2VkJyB8fCAnZXhwYW5kZWQnXG4gICAgICogQGV4YW1wbGUgY29uc3QgY29uZmlnID0gbmV3IEdDb25maWcoKTtcbiAgICAgKiBjb25maWcuc2Fzc1N0eWxlID09PSAnZXhwYW5kZWQnXG4gICAgICovXG4gICAgZ2V0IHNhc3NTdHlsZSgpOnN0cmluZyB7XG4gICAgICByZXR1cm4gKCBfc2Fzc1N0eWxlID09PSAncHJvZHVjdGlvbicgfHwgX3Nhc3NTdHlsZSA9PT0gJ3BwZScgPyAnY29tcHJlc3NlZCcgOiAnZXhwYW5kZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2Fzc1N0eWxlKHN0eWxlOnN0cmluZyk6dm9pZCB7XG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgX3Nhc3NTdHlsZSA9IHN0eWxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgOjogc2VlIGV4YW1wbGUuIElmIG92ZXJyaWRpbmcgYWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQuPGJyPlxuICAgICAqIENvbnRhaW5lciBmb3IgZ3VscC1jb25uZWN0IHNlcnZlciBvcHRpb25zXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHtcbiAgICAgICAqICAgIHJvb3QgOicuL2J1aWxkcy92MS9kZXYvJyxcbiAgICAgICAqICAgIGxpdmVyZWxvYWQgOiB0cnVlLFxuICAgICAgICogICAgcG9ydCA6IDY0MDMzXG4gICAgICAgKiB9XG4gICAgICovXG4gICAgZ2V0IHNlcnZlckNvbmZpZygpOk9iamVjdCB7XG4gICAgICByZXR1cm4gX3NlcnZlckNvbmZpZztcbiAgICB9XG5cbiAgICBzZXQgc2VydmVyQ29uZmlnKGNvbmZpZzpPYmplY3QpOnZvaWQge1xuICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICBfc2VydmVyQ29uZmlnID0gY29uZmlnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsdWUgOjogZmFsc2U8YnI+XG4gICAgICogV2hldGhlciBvciBub3QgdG8gc2hvdyBkZWxldGVkIGd1bHAgZmlsZXMgaW4gdGhlIGNvbnNvbGVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgICAqL1xuICAgIGdldCBzaG93RGVsZXRlZCgpOkJvb2xlYW4ge1xuICAgICAgcmV0dXJuIF9zaG93RGVsZXRlZDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0RlbGV0ZWQodmFsdWU6Qm9vbGVhbik6dm9pZCB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgX3Nob3dEZWxldGVkID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSA6OiAnLi9fU1JDLyc8YnI+XG4gICAgICogIFRoZSBwcm9qZWN0IHNvdXJjZSBkaXJlY3RvcnlcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBleGFtcGxlICcuL19TUkMvJ1xuICAgICAqL1xuICAgIGdldCBzb3VyY2UoKTpzdHJpbmcge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdCArIF9zb3VyY2VGb2xkZXIgKyBuUGF0aC5zZXAgKyB0aGlzLnN1YkZvbGRlcjtcbiAgICB9XG5cbiAgICBzZXQgc291cmNlKHZhbHVlOnN0cmluZyk6dm9pZCB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgX3Jvb3RGb2xkZXIgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHZhbHVlIDo6IHt9PGJyPlxuICAgICAqIENvbnRhaW5lciBmb3Igc291cmNlIHBhdGhzXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAZXhhbXBsZSAne30nXG4gICAgICovXG4gICAgZ2V0IHNvdXJjZUZpbGVzKCk6T2JqZWN0IHtcbiAgICAgIHJldHVybiBfc291cmNlRmlsZXM7XG4gICAgfVxuXG4gICAgc2V0IHNvdXJjZUZpbGVzKGNvbmZpZzpPYmplY3QpOnZvaWQge1xuICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICBfc291cmNlRmlsZXMgPSBjb25maWc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCB2YWx1ZSA6OiAnPG5vbmU+Jzxicj5cbiAgICAgKiBUaGUgcHJvamVjdCBzaXRlIGZyb20gZW52LkdDT05GSUdfU1JDU1VCXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAZXhhbXBsZSAndjEnXG4gICAgICovXG4gICAgZ2V0IHN1YkZvbGRlcigpOnN0cmluZyB7XG4gICAgICByZXR1cm4gX3N1YkZvbGRlciArIG5QYXRoLnNlcDtcbiAgICB9XG5cbiAgICBzZXQgc3ViRm9sZGVyKHZhbHVlOnN0cmluZyk6dm9pZCB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgX3N1YkZvbGRlciA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
