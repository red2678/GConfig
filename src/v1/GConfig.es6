/* @flow */
'use strict';

// Node Modules
import nPath from 'path';
import del from 'del';

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
class G$ {
  // Private variables
  _bowerFolder:string;
  _buildsFolder:string;
  _docsFolder:string;
  _nodeFolder:string;
  _rootFolder:string;
  _sassStyle:string;
  _showDeleted:boolean;
  _sourceFolder:string;
  _subFolder:string;
  _debug:boolean;

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
  constructor(config:Object = {}):G$ {
    this._bowerFolder = config.bowerFolder || 'bower_components';
    this._buildsFolder = config.buildsFolder || 'builds';
    this._docsFolder = config.docsFolder || 'docs';
    this._nodeFolder = config.nodeFolder || 'node_modules';
    this._rootFolder = config.rootFolder || '.';
    this._sassStyle = config.sassStyle || 'compressed';
    this._sourceFolder = config.sourceFolder || 'src';
    this._showDeleted = config.showDeleted || false;
    this._subFolder = config.subFolder || process.env.GCONFIG_SRCSUB || '';
    this._debug = config.debug || false;

    this.sourceFiles = config.sourceFiles || {};
    this.environment = config.environment || process.env.NODE_ENV || 'dev';
  }

  // noinspection JSUnusedGlobalSymbols
  loadConfig(config: Object) {
    this._bowerFolder = config.bowerFolder || 'bower_components';
    this._buildsFolder = config.buildsFolder || 'builds';
    this._docsFolder = config.docsFolder || 'docs';
    this.environment = config.environment || process.env.NODE_ENV || 'dev';
    this._nodeFolder = config.nodeFolder || 'node_modules';
    this._rootFolder = config.rootFolder || '.';
    this._sassStyle = config.sassStyle || 'compressed';
    this._sourceFolder = config.sourceFolder || 'src';
    this._showDeleted = config.showDeleted || false;
    this._subFolder = config.subFolder || process.env.GCONFIG_SRCSUB || '';
    this._debug = config.debug || false;
    this.sourceFiles = config.sourceFiles || {};
    return this;
  }

  /**
   *
   * @private
   * @param paths
   */
  _logDeleted(paths:Array<string>):void {
    if (this.showDeleted) {
      console.log(`
        ********************************************
        Deleted files/folders:
        [
          ${paths.join(',\n')}
        ]
        *******************************************`);
    }
  }

  /**
   *
   * @public
   * @returns {void}
   */
  buildInfo():void {
    if (this._debug) {
      console.log(
        'Config :: -----------------------------------\n' +
        'DS:: ' + this.DS + ' \n' +
        'Bower Folder :: ' + this._bowerFolder + ' \n' +
        'Builds Folder :: ' + this._buildsFolder + ' \n' +
        'Docs Folder :: ' + this._docsFolder + ' \n' +
        'Node Folder :: ' + this._nodeFolder + ' \n' +
        'Root Folder :: ' + this._rootFolder + ' \n' +
        'Source Folder :: ' + this._sourceFolder + ' \n' +
        'Show Deleted :: ' + this._showDeleted + ' \n' +
        'Sub Folder :: ' + this._subFolder + ' \n',
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
    return this.root + this._bowerFolder + nPath.sep;
  }

  /**
   * Default value :: './builds/dev/mainSite/'<br>
   * The project builds directory
   * @type {string}
   * @example './builds/dev/mainSite/'
   */
  get build():string {
    return this.root + this._buildsFolder + nPath.sep +
      (this.environment ? this.environment + nPath.sep : '') +
      (this.subFolder ? this.subFolder + nPath.sep : '');
  }

  /**
   * Default value :: './docs/'<br>
   * The project docs directory
   * @type {string}
   * @example './_DOCS/'
   */
  get docs():string {
    return this.root + this._docsFolder + nPath.sep;
  }

  /**
   * Default value :: 'dev'<br>
   * The project environment from the NODE_ENV environmental variable.
   * @type {string}
   * @example 'dev'
   */
  get environment():string {
    return this._environment;
  }

  set environment(value:string):void {
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
  get node():string {
    return this.root + this._nodeFolder + nPath.sep;
  }

  /**
   * Default value :: './'<br>
   * The project root directory
   * @type {object}
   * @example './'
   */
  get root():string {
    return this._rootFolder + nPath.sep;
  }

  /**
   * Get current SASS style based on environment ({@link env}). If 'production' or 'ppe' style is compressed, all
   * other cases style is expanded.
   * @returns {string} 'compressed' || 'expanded'
   * @example const config = new GConfig();
   * config.sassStyle === 'expanded'
   */
  get sassStyle():string {
    return (this._sassStyle === 'prod' || this._sassStyle === 'ppe' ? 'compressed' : 'expanded');
  }

  /**
   * Default value :: false<br>
   * Whether or not to show deleted gulp files in the console
   * @type {boolean}
   * @example false
   */
  get showDeleted():boolean {
    return this._showDeleted;
  }

  set showDeleted(value:boolean):void {
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
  get source():string {
    return this.root + this._sourceFolder + nPath.sep +
      (this.subFolder ? this.subFolder + nPath.sep : '');
  }

  /**
   * Default value :: '<none>'<br>
   * The project site from env.GCONFIG_SRCSUB
   * @type {string}
   * @example 'v1'
   */
  get subFolder():string {
    return this._subFolder;
  }
}

const g$ = new G$();
module.exports = g$;
