/* @flow */
"use strict";

// Node Modules
import nPath from "path";
import del from "del";

// noinspection JSUnusedLocalSymbols
export default (function() {

  // Private variables
  var _bowerFolder:string,
    _builds:string,
    _docsFolder:string,
    _environment:string,
    _liveReload:Boolean,
    _nodeFolder:string,
    _rootFolder:string,
    _sassStyle:string,
    _serverConfig:Object,
    _showDeleted:Boolean,
    _sourceFolder:string,
    _subFolder:string;

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
  return new class Gc {


    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */
    sourceFiles:Object;

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
    constructor(config:object = {}):GConfig {

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
          root: this.builds + ((this.environment) ? this.environment + nPath.sep : ''),
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
    capitalize(str:string = ''):string {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Wraps node del.sync in {@link logDeleted}
     * @param {Array<string>} files=[] - The files to be delted, accepts GLOB patterns.
     * @returns {void}
     * @example const config = new GConfig();
     * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
     */
    deleteFiles(files:Array<string> = []):void {
      this._logDeleted(del.sync(files));
    }

    /**
     *
     * @private
     * @param paths
     * @param location
     */
    _logDeleted(paths:Array<string>, location:string = ''):void {
      if (this.showDeleted) {
        console.log(
          '\n******************************* *************\n' +
          (location ? this.capitalize(location) : '') + 'Deleted files/folders: [\n' +
          paths.join(',\n') +
          '\n]\n*******************************************');
      }
    }

    /**
     * Default value :: './bower_components/'<br>
     * The project bower directory
     * @type {string}
     * @example './bower_components/'
     */
    get bower():string {
      return this.root + _bowerFolder + nPath.sep;
    }

    set bower(value:string):void {
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
    get builds():string {
      return this.root + _builds + nPath.sep + ((this.environment) ? this.environment + nPath.sep : '') + this.subFolder;
    }

    set builds(value:string):void {
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
    get docs():string {
      return this.root + _docsFolder + nPath.sep;
    }

    set docs(value:string):void {
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
    get environment():string {
      return _environment;
    }

    set environment(value:string):void {
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
    get liveReload():Boolean {
      return _liveReload;
    }

    set liveReload(value:Boolean):void {
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
    get node():string {
      return this.root + _nodeFolder + nPath.sep;
    }

    set node(value:string):void {
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
    get root():string {
      return _rootFolder + nPath.sep;
    }

    set root(value:string):void {
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
    get sassStyle():string {
      return ( _sassStyle === 'production' || _sassStyle === 'ppe' ? 'compressed' : 'expanded');
    }

    set sassStyle(style:string):void {
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
    get serverConfig():Object {
      return _serverConfig;
    }

    set serverConfig(config:Object):void {
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
    get showDeleted():Boolean {
      return _showDeleted;
    }

    set showDeleted(value:Boolean):void {
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
    get source():string {
      return this.root + _sourceFolder + nPath.sep + this.subFolder;
    }

    set source(value:string):void {
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
    get subFolder():string {
      return _subFolder + nPath.sep;
    }

    set subFolder(value:string):void {
      if (value) {
        _subFolder = value;
      }
    }
  }
})()
