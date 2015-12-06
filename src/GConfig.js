"use strict"

// Node Modules
;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _del = require("del");

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedLocalSymbols
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
class GConfig {

  /**
   * Creates a GConfig object
   * @param {Object} [config={}] - Options to initialize the component with
   * @param {!string} [config.bowerFolder="./bower_components/"] - See {@link bowerDir}
   * @param {!string} [config.buildDir="./_BUILDS/dev/mainSite/"] - See {@link buildDir}
   * @param {!string} [config.docs="./_DOCS/"] - See {@link docs}
   * @param {!string} [config.env="dev"] - See {@link env}
   * @param {!string} [config.latestDir="./_LATEST/"] - See {@link latestDir}
   * @param {!boolean} [config.liveReload="true"] - See {@link liveReload}
   * @param {!string} [config.nodeModulesFolder="./node_modules/"] - See {@link nodeModulesFolder}
   * @param {!boolean} [config.produceArtifacts="false"] - See {@link produceArtifacts}
   * @param {!string} [config.rootDir='./'] - See {@link rootDir}
   * @param {!object} [config.serverOptionsConfig="{}"] - See {@link serverOptionsConfig}
   * @param {!boolean} [config.showDeleted="false"] - See {@link showDeleted}
   * @param {!string} [config.site="mainSite"] - See {@link site}
   * @param {!object} [config.sources="{}"] - See {@link sources}
   * @param {!string} [config.srcDir="./_SRC/dev/"] - See {@link srcDir}
   */
  constructor() {
    let config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    /**
     * Default value :: './'<br>
     * The project root directory
     * @type {object}
     * @example './'
     */
    this.root = (config.root || '.') + _path2.default.sep;

    /**
     * Default value :: 'dev'<br>
     * The project environment from the NODE_ENV environmental variable.
     * @type {string}
     * @example 'dev'
     */
    this.env = config.env || process.env.NODE_ENV ? (config.env || process.env.NODE_ENV || 'dev').toLowerCase() : '';

    /**
     * Default value :: 'mainSite'<br>
     * The project site from env.TAGGLISH_SITE
     * @type {string}
     * @example 'mainSite'
     */
    this.srcSubFolder = config.srcSubFolder || process.env.GCONFIG_SRCSUB ? config.srcSubFolder || process.env.GCONFIG_SRCSUB.toLowerCase() + _path2.default.sep : '';

    /**
     * Default value :: './builds/dev/mainSite/'<br>
     * The project builds directory
     * @type {string}
     * @example './builds/dev/mainSite/'
     */
    this.builds = this.root + (config.builds || 'builds') + _path2.default.sep + (this.env ? this.env + _path2.default.sep : '') + this.srcSubFolder;

    /**
     * Default value :: './_SRC/'<br>
     *  The project source directory
     * @type {string}
     * @example './_SRC/'
     */
    this.src = this.root + (config.src || 'src') + _path2.default.sep + this.srcSubFolder;

    /**
     * Default value :: './docs/'<br>
     * The project docs directory
     * @type {string}
     * @example './_DOCS/'
     */
    this.docs = this.root + (config.docs || 'docs') + _path2.default.sep;

    /**
     * Default value :: './bower_components/'<br>
     * The project bower directory
     * @type {string}
     * @example './bower_components/'
     */
    this.bower = this.root + (config.bower || 'bower_components') + _path2.default.sep;

    /**
     * Default value :: './node_modules/'<br>
     * The project node modules directory
     * @type {string}
     * @example './node_modules/'
     */
    this.nodeModules = this.root + (config.nodeModules || 'node_modules') + _path2.default.sep;

    /**
     * Default value :: true<br>
     * Whether or not to use gulp live reload
     * @type {boolean}
     * @example true
     */
    this.liveReload = config.liveReload || true;

    /**
     * Default value :: false<br>
     * Whether or not to use produce build artifacts
     * @type {boolean}
     * @example false
     */
    this.produceArtifacts = config.produceArtifacts || false;

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
    this.serverOptions = config.serverOptions || {
      root: this.builds + this.srcSubFolder + (this.env ? this.env + _path2.default.sep : ''),
      livereload: this.liveReload,
      port: 64033
    };

    /**
     * Default value :: false<br>
     * Whether or not to show deleted gulp files in the console
     * @type {boolean}
     * @example false
     */
    this.showDeleted = config.showDeleted || false;

    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */
    this.sources = config.sources || {};
  }

  /**
   * Capitalizes the first letter of a passed in string
   * @param {string} str='' - The string to capitalize
   * @returns {string} - The string to with the first letter capitalized
   * @example const str = capitalize('my test string');
   * str === 'My test string';
   */
  capitalize() {
    let str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Wraps node del.sync in {@link logDeleted}
   * @param {Array<string>} files=[] - The files to be delted, accepts GLOB patterns.
   * @returns {void}
   * @example const config = new GConfig();
   * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
   */
  deleteFiles() {
    let files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    this.logDeleted_(_del2.default.sync(files));
  }

  /**
   * Basic getter
   * @param {string} property - the property to get
   * @returns {*} - found property or undefined
   * @example const config = new GConfig();
   * const style = config.get('someProperty');
   */
  get() {
    let property = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this[property];
  }

  /**
   *
   * @param paths
   * @param location
   */
  logDeleted_(paths) {
    let location = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    if (this.showDeleted) {
      console.log('\n******************************* *************\n' + (location ? this.capitalize(location) : '') + 'Deleted files/folders: [\n' + paths.join(',\n') + '\n]\n*******************************************');
    }
  }

  /**
   * Returns a path comprised of the base path to the Bower directory and the passed in supplemental path.
   * @param {string} dir='' - The supplemental path
   * @param supplementalPath
   * @returns {string} - The generated path
   * @example const config = new GConfig();
   * const jqueryPath = config.getBowerDir('jquery/dist/jquery.min.js');
   * jqueryPath === './bower_folder/jquery/dist/jquery.min.js';
   */
  path() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '.' : arguments[0];
    let supplementalPath = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    return this[dir] + supplementalPath;
  }

  /**
   * Get current SASS style based on environment ({@link env}). If "production" or "ppe" style is compressed, all
   * other cases style is expanded.
   * @returns {string} 'compressed' || 'expanded'
   * @example const config = new GConfig();
   * const sassStyle = config.sassStyle();
   * sassStyle === 'expanded'
   */
  sassStyle() {
    return this.env === 'production' || this.env === 'ppe' ? 'compressed' : 'expanded';
  }

  /**
   * Class setter, returns instance to allow chaining
   * @param {string} property - The proeprty to set
   * @param {*} value - The value to assign to the property
   * @returns {GConfig} - Returns the object instance
   * @example const config = new GConfig();
   * const value = config.set('someProperty', true).get('someProperty');
   * value === true;
   */
  set(property, value) {
    this[property] = value;
    return this;
  }
}
exports.default = GConfig;

//# sourceMappingURL=GConfig.js.map