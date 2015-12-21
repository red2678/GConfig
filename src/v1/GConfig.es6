/* @flow */
"use strict";

// Node Modules
import nPath from "path";
import del from "del";

function G$() {

  // Private variables
  var _bowerFolder:string,
    _buildsFolder:string,
    _docsFolder:string,
    _environment:string,
    _liveReload:boolean,
    _nodeFolder:string,
    _rootFolder:string,
    _sassStyle:string,
    _serverConfig:Object,
    _showDeleted:boolean,
    _sourceFolder:string,
    _subFolder:string;
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
  return new class {

    debug:boolean;

    /**
     * Default value :: {}<br>
     * Container for source paths
     * @type {object}
     * @example '{}'
     */
    sourceFiles:Object;

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
    constructor(config:object = {}):G$ {

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
          root: this.build + ((this.environment) ? this.environment + nPath.sep : ''),
          livereload: this.liveReload,
          port: 64033
        };
      _showDeleted = config.showDeleted || false;
      _subFolder = config.subFolder || process.env.GCONFIG_SRCSUB;

      this.debug = config.debug || false;
      this.sourceFiles = config.sourceFiles || {};

    }

    /**
     *
     * @private
     * @param paths
     */
    _logDeleted(paths:Array<string>):void {
      if (this.showDeleted) {
        console.log(
          '\n********************************************\n' +
          ('Deleted files/folders: [\n' +
          paths.join(',\n') +
          '\n]\n*******************************************'));
      }
    }

    /**
     *
     * @public
     * @returns {void}
     */
    buildInfo():void {
      if (this.debug) {
        console.log(
          'Config :: -----------------------------------\n' +
          'DS:: ' + this.DS + ' \n' +
          'Bower Folder :: ' + _bowerFolder + ' \n' +
          'Builds Folder :: ' + _buildsFolder + ' \n' +
          'Docs Folder :: ' + _docsFolder + ' \n' +
          'Live Reload :: ' + _liveReload + ' \n' +
          'Node Folder :: ' + _nodeFolder + ' \n' +
          'Root Folder :: ' + _rootFolder + ' \n' +
          'Source Folder :: ' + _sourceFolder + ' \n' +
          'Show Deleted :: ' + _showDeleted + ' \n' +
          'Sub Folder :: ' + _subFolder + ' \n',
          'Paths :: -------------------------------------\n' +
          'Bower :: ' + this.bower + '\n' +
          'Build :: ' + this.build + '\n' +
          'Docs  :: ' + this.docs + '\n' +
          'Node :: ' + this.node + '\n' +
          'Root :: ' + this.root + '\n' +
          'Source :: ' + this.source + '\n' +
          'Source Files :: ------------------------------\n' +
          JSON.stringify(this.sourceFiles, null, 4)
        );
      }
    }

    /**
     * Wraps node del.sync in {@link _logDeleted}
     * @param {Array<string>} files=[] - The files to be deleted, accepts GLOB patterns.
     * @returns {void}
     * @example const config = new GConfig();
     * config.deleteFiles(['folder/file.html', 'folder/file.css', 'folder/folder-two/*.js']) //synchronous action
     */
    deleteFiles(files:Array<string> = []):void {
      this._logDeleted(del.sync(files));
    }

    get DS():string {
      return nPath.sep || '/';
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

    // noinspection JSMethodCanBeStatic
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
    get build():string {
      return this.root + _buildsFolder + nPath.sep +
        (this.environment ? this.environment + nPath.sep : '') +
        (this.subFolder ? this.subFolder + nPath.sep : '');
    }

    set build(value:string):void {
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
      return ( _sassStyle === 'prod' || _sassStyle === 'ppe' ? 'compressed' : 'expanded');
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
    get showDeleted():boolean {
      return _showDeleted;
    }

    set showDeleted(value:boolean):void {
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
    get source():string {
      return this.root + _sourceFolder + nPath.sep +
        (this.subFolder ? this.subFolder + nPath.sep : '');
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
      return _subFolder;
    }

    set subFolder(value:string):void {
      if (value) {
        _subFolder = value;
      }
    }
  }
}

const g$ = new G$();

export default g$;
