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
 * @name gConfig
 * @author 'Anthony Trimble red2678@gmail.com'
 * @since '11/14/2015'
 *
 * @class gConfig
 * @classdesc Creates a new gConfig.
 *
 * @exports gConfig
 * @requires  module:npath
 * @requires  module:del
 *
 * @example const mainConfig = new gConfig({
 *     showDeleted : false,
 *     liveReload : true
 *   });
 */
class gConfig {

  /**
   * Creates a gConfig object
   * @param {Object} [config={}] - Options to initialize the component with
   * @param {!string} [config.bowerFolder="./bower_components/"] - See {@link bowerDir}
   * @param {!string} [config.buildDir="./_BUILDS/dev/mainSite/"] - See {@link buildDir}
   * @param {!string} [config.docs="./_DOCS/"] - See {@link docs}
   * @param {!string} [config.DS="/"] - See {@link DS}
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
     * Default value :: './bower_components/'<br>
     * The project bower directory
     * @type {string}
     * @example './bower_components/'
     */
    this.bowerDir = this.rootDir + (config.bowerDir || 'bower_components') + this.DS;
    /**
     * Default value :: './_BUILDS/dev/mainSite/'<br>
     * The project builds directory
     * @type {string}
     * @example './_BUILDS/dev/mainSite/'
     */
    this.buildDir = this.rootDir + (config.buildDir || '_BUILDS') + this.DS + this.env + this.DS + this.site + this.DS;
    /**
     * Default value :: './_DOCS/'<br>
     * The project docs directory
     * @type {string}
     * @example './_DOCS/'
     */
    this.docsDir = this.rootDir + (config.docsDir || '_DOCS') + this.DS;
    /**
     * Default value :: '/'<br>
     * The OS directory separator, obtained via nPath or set manually when passed in.
     * @type {string}
     * @example '/'
     */
    this.DS = _path2.default.sep || '/';
    /**
     * Default value :: 'dev'<br>
     * The project environment from the NODE_ENV environmental variable.
     * @type {string}
     * @example 'dev'
     */
    this.env = (config.env || process.env.NODE_ENV || 'dev').toLowerCase();
    /**
     * Default value :: './_LATEST/'<br>
     * The project latest directory, the location of the latest releases
     * @type {string}
     * @example './_LATEST/'
     */
    this.latestDir = this.rootDir + (config.latestDir || '_LATEST') + this.DS + this.env + this.DS + this.site + this.DS;
    /**
     * Default value :: true<br>
     * Whether or not to use gulp live reload
     * @type {boolean}
     * @example true
     */
    this.liveReload = config.liveReload || true;
    /**
     * Default value :: './node_modules/'<br>
     * The project node modules directory
     * @type {string}
     * @example './node_modules/'
     */
    this.nodeModulesFolder = this.rootDir + (config.nodeModulesFolder || 'node_modules') + this.DS;
    /**
     * Default value :: false<br>
     * Whether or not to use produce build artifacts
     * @type {boolean}
     * @example false
     */
    this.produceArtifacts = config.produceArtifacts || false;
    /**
     * Default value :: './'<br>
     * The project root directory
     * @type {object}
     * @example './'
     */
    this.rootDir = (config.rootDir || '.') + this.DS;
    /**
     * Default value :: see example<br>
     * Container for gulp-connect server options
     * @type {object}
     * @example
     * {
    *    root : this.buildUrl_(),
    *    livereload : true,
    *    port : 64033
    * }
     */
    this.serverOptionsConfig = config.serverOptionsConfig || {};
    /**
     * Default value :: false<br>
     * Whether or not to show deleted gulp files in the console
     * @type {boolean}
     * @example false
     */
    this.showDeleted = config.showDeleted || false;
    /**
     * Default value :: 'mainSite'<br>
     * The project site from env.TAGGLISH_SITE
     * @type {string}
     * @example 'mainSite'
     */
    this.site = config.site || process.env.GCONFIG_SITE ? config.site || (process.env.GCONFIG_SITE || 'mainSite').toLowerCase() : '';
    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */
    this.sources = config.sources || {};
    /**
     * Default value :: './_SRC/'<br>
     *  The project source directory
     * @type {string}
     * @example './_SRC/'
     */
    this.srcDir = this.rootDir + (config.srcDir || '_SRC') + this.DS + this.site + this.DS;
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
   * @example const config = new gConfig();
   * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
   */
  deleteFiles() {
    let files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    this.logDeleted(_del2.default.sync(files));
  }

  /**
   * Basic getter
   * @param {string} property - the property to get
   * @returns {*} - found property or undefined
   * @example const config = new gConfig();
   * const style = config.get('someProperty');
   */
  get() {
    let property = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this[property];
  }

  /**
   * Returns a path comprised of the base path to the Bower directory and the passed in supplemental path.
   * @param {string} dir='' - The supplemental path
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const jqueryPath = config.getBowerDir('jquery/dist/jquery.min.js');
   * jqueryPath === './bower_folder/jquery/dist/jquery.min.js';
   */
  getBowerDir() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this.bowerDir + dir;
  }

  /**
   * Returns a path comprised of the current {@link buildDir} and the passed in supplemental path.
   * @param {string} dir=''- The supplemental path
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const allBuildCssFiles = config.getBuildDir('css/*.css');
   * allBuildCssFiles = './_BUILDS/dev/mainSite/css/*.css';
   */
  getBuildDir() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this.buildDir + this.env + this.DS + this.site + this.DS + dir;
  }

  /**
   * Returns the path to the {@link latest} directory and all files contained therin.
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const latestBuildDir = config.getLatestBuild();
   * latestBuildDir === './_LATEST/';
   */
  getLatestBuild() {
    return this.latestDir + this.env + '/**';
  }

  /**
   * Returns a path comprised of {@link nodeModulesFolder} and the passed in supplemental path.
   * @param {string} dir='' - The supplemental path
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const esdocPath = config.getNodeDir('esdoc-es7-plugin/out/src/Plugin.js');
   * esdocPath === './node_modules/esdoc-es7-plugin/out/src/Plugin.js';
   */
  getNodeDir() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this.nodeModulesFolder + dir;
  }

  /**
   * Returns a path comprised of the {@link rootDir} and the passed in supplemental path.
   * @param {string} dir=''- The supplemental path
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const file = config.getRootDir('someFolder/file.js');
   * file === './someFolder/file.js';
   */
  getRootDir() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this.rootDir + dir;
  }

  /**
   * Returns the current configuration object for gulp-connect
   * @returns {{root: string, livereload: boolean, port: number}}
   * @example const config = new gConfig();
   * const serverConfig = config.getServerOptions();
   * serverConfig = {
  *  root : './_BUILDS/dev/mainSite/',
  *  livereload : true,
  *  port : 64033
  * }
   */
  getServerOptions() {
    const self = this;
    return {
      root: self.buildDir + self.DS + self.site + self.DS + self.env + self.DS,
      livereload: self.liveReload,
      port: 64033
    };
  }

  /**
   * Returns a path comprised of the {@link srcDir} and the passed in supplemental path.
   * @param {string} dir=''- The supplemental path
   * @returns {string} - The generated path
   * @example const config = new gConfig();
   * const allSourceJadeFiles  = config.getSrcDir('templates/*.jade');
   * allSourceJadeFiles === './_SRC/mainSite/templates/*.jade'
   */
  getSrcDir() {
    let dir = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return this.srcDir + dir;
  }

  /**
   *
   * @param message
   * @returns {string}
   */
  log(message) {
    return '\n********************************************\n' + 'LOG :: ' + message + '\n********************************************';
  }

  /**
   *
   * @param paths
   * @param location
   */
  logDeleted(paths) {
    let location = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    if (this.showDeleted) {
      console.log('\n******************************* *************\n' + (location ? this.capitalize(location) : '') + 'Deleted files/folders: [\n' + paths.join(',\n') + '\n]\n*******************************************');
    }
  }

  /**
   * Get current SASS style based on environment ({@link env}). If "production" or "ppe" style is compressed, all
   * other cases style is expanded.
   * @returns {string} 'compressed' || 'expanded'
   * @example const config = new gConfig();
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
   * @returns {gConfig} - Returns the object instance
   * @example const config = new gConfig();
   * const value = config.set('someProperty', true).get('someProperty');
   * value === true;
   */
  set(property, value) {
    this[property] = value;
    return this;
  }
}
exports.default = gConfig;

//# sourceMappingURL=GConfig.js.map