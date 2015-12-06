/* @flow */
"use strict";

// Node Modules
import nPath from "path";
import del from "del";

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
export default class GConfig {

  env:string;
  site:string;

  root:string;
  srcDir:string;
  buildDir:string;
  latestDir:string;
  bowerDir:string;
  nodeModulesFolder:string;
  docsDir:string;

  showDeleted:boolean;
  liveReload:boolean;
  produceArtifacts:boolean;

  sources:object;
  serverOptionsConfig:object;

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
  constructor(config:object = {}):GConfig {

    /**
     * Default value :: './'<br>
     * The project root directory
     * @type {object}
     * @example './'
     */
    this.root = (config.root || '.') + nPath.sep;

    /**
     * Default value :: 'dev'<br>
     * The project environment from the NODE_ENV environmental variable.
     * @type {string}
     * @example 'dev'
     */
    this.env = (config.env || process.env.NODE_ENV) ? (config.env || (process.env.NODE_ENV || 'dev')).toLowerCase() : '';

    /**
     * Default value :: 'mainSite'<br>
     * The project site from env.TAGGLISH_SITE
     * @type {string}
     * @example 'mainSite'
     */
    this.srcSubFolder = (config.srcSubFolder || process.env.GCONFIG_SRCSUB) ? config.srcSubFolder || (process.env.GCONFIG_SRCSUB).toLowerCase() + nPath.sep : '';

    /**
     * Default value :: './builds/dev/mainSite/'<br>
     * The project builds directory
     * @type {string}
     * @example './builds/dev/mainSite/'
     */
    this.builds = this.root  + (config.builds || 'builds') + nPath.sep +
      ((this.env) ? this.env + nPath.sep : '') + this.srcSubFolder;

    /**
     * Default value :: './_SRC/'<br>
     *  The project source directory
     * @type {string}
     * @example './_SRC/'
     */
    this.src = this.root + (config.src || 'src') + nPath.sep + this.srcSubFolder;

    /**
     * Default value :: './docs/'<br>
     * The project docs directory
     * @type {string}
     * @example './_DOCS/'
     */
    this.docs = this.root + (config.docs || 'docs') + nPath.sep;

    /**
     * Default value :: './bower_components/'<br>
     * The project bower directory
     * @type {string}
     * @example './bower_components/'
     */
    this.bower = this.root + (config.bower || 'bower_components') + nPath.sep;

    /**
     * Default value :: './node_modules/'<br>
     * The project node modules directory
     * @type {string}
     * @example './node_modules/'
     */
    this.nodeModules = this.root + (config.nodeModules || 'node_modules') + nPath.sep;

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
        root: this.builds + this.srcSubFolder + ((this.env) ? this.env + nPath.sep : ''),
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
    this.logDeleted_(del.sync(files));
  }

  /**
   * Basic getter
   * @param {string} property - the property to get
   * @returns {*} - found property or undefined
   * @example const config = new GConfig();
   * const style = config.get('someProperty');
   */
  get(property:string = ''):any {
    return this[property];
  }

  /**
   *
   * @param paths
   * @param location
   */
  logDeleted_(paths:Array<string>, location:string = ''):void {
    if (this.showDeleted) {
      console.log(
        '\n******************************* *************\n' +
        (location ? this.capitalize(location) : '') + 'Deleted files/folders: [\n' +
        paths.join(',\n') +
        '\n]\n*******************************************');
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
  path(dir:string = '.', supplementalPath:string = ''):string {
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
  sassStyle():string {
    return ( this.env === 'production' || this.env === 'ppe' ? 'compressed' : 'expanded');
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
  set(property:string, value:any):GConfig {
    this[property] = value;
    return this;
  }
}
