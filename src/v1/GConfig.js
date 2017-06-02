/* eslint-disable */
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
  _bowerFolder: string;
  _buildsFolder: string;
  _docsFolder: string;
  _nodeFolder: string;
  _rootFolder: string;
  _sassStyle: string;
  _showDeleted: boolean;
  _sourceFolder: string;
  _subFolder: string;
  _debug: boolean;
  _DS: string;
  _environment: string;

  sourceFiles: Object;

  // noinspection JSUnusedGlobalSymbols
  /**
   * Creates a G$ object
   * @param {Object} [config={}] - Options to initialize the component with
   * @param {!string} [config.bowerFolder='./bower_components/'] - See {@link bowerFolder}
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

  loadConfig(config: Object = {}): G$ {
    this._bowerFolder = config.bowerFolder || this._bowerFolder || 'bower_components';
    this._buildsFolder = config.buildsFolder || this._buildsFolder || 'builds';
    this._docsFolder = config.docsFolder || this._docsFolder || 'docs';
    this._environment = config.environment || process.env.NODE_ENV || 'dev';
    this._DS = nPath.sep || '/';
    this._nodeFolder = config.nodeFolder || this._nodeFolder || 'node_modules';
    this._rootFolder = config.rootFolder || this._rootFolder || '.';
    this._sassStyle = config.sassStyle || this._sassStyle || 'compressed';
    this._sourceFolder = config.sourceFolder || this._sourceFolder || 'src';
    this._showDeleted = config.showDeleted || this._showDeleted || false;
    this._subFolder = config.subFolder || this._subFolder || process.env.GCONFIG_SRCSUB || '';
    this._debug = config.debug || this._debug || false;
    this.sourceFiles = this._objectReplace(config.sourceFiles, '/\/|\\/', this.DS);
    return this;
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
  _objectReplace(entity: Object, needle: string, replacement: string, affectsKeys: bool = false,
                 affectsValues: bool = true): Object {
    const regExp = new RegExp(needle, 'g');
    let newEntity = {};

    for (const property in entity) {
      if (!entity.hasOwnProperty(property)) {
        continue;
      }

      let value = entity[property];
      let newProperty = property;

      if (affectsKeys) {
        newProperty = property.replace(regExp, replacement);
      }

      if (affectsValues) {

        if (typeof value === "object") {

          if (Array.isArray(value)) {
            let newArr = [];

            value.forEach(function (element) {
              newArr.push(element.replace(regExp, replacement));
            });

            value = newArr;
          } else {
            value = this._objectReplace(value, needle, replacement, affectsKeys, affectsValues);
          }

        } else if (typeof value === "string") {
          value = value.replace(regExp, replacement);
        }

      }
      newEntity[newProperty] = value;
    }

    return newEntity;
  }


  _logDeleted(paths: Array<string>): void {
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

  buildInfo(): void {
    if (this._debug) {
      console.log(
        `Config ::
  -----------------------------------
    DS:: ${this.DS} 
    Bower Folder :: ${this._bowerFolder} 
    Builds Folder :: ${this._buildsFolder} 
    Docs Folder :: ${this._docsFolder} 
    Node Folder :: ${this._nodeFolder} 
    Root Folder :: ${this._rootFolder} 
    Source Folder :: ${this._sourceFolder} 
    Show Deleted :: ${this._showDeleted.toString()} 
    Sub Folder :: ${this._subFolder}`,
        `Paths :: -------------------------------------
        Bower :: ${this.bower}
        Build :: ${this.build}
        Docs  :: ${this.docs}
        Node :: ${this.node}
        Root :: ${this.root}
        Source :: ${this.source}
        Source Files :: ------------------------------
        ${JSON.stringify(this.sourceFiles, null, 4)}`
      );
    }
  }

  deleteFiles(files: Array<string> = []): void {
    this._logDeleted(del.sync(files));
  }

  get DS(): string {
    return this._DS;
  }

  get bower(): string {
    return this.root + this._bowerFolder + nPath.sep;
  }

  get build(): string {
    return this.root + this._buildsFolder + nPath.sep +
      (this.environment ? this.environment + nPath.sep : '') +
      (this.subFolder ? this.subFolder + nPath.sep : '');
  }

  get docs(): string {
    return this.root + this._docsFolder + nPath.sep;
  }

  get environment(): string {
    return this._environment;
  }

  set environment(value: string): void {
    if (value) {
      this._environment = value;
    }
  }

  get node(): string {
    return this.root + this._nodeFolder + nPath.sep;
  }

  get root(): string {
    return this._rootFolder + nPath.sep;
  }

  get sassStyle(): string {
    return (this._sassStyle === 'prod' || this._sassStyle === 'ppe' ? 'compressed' : 'expanded');
  }

  get showDeleted(): boolean {
    return this._showDeleted;
  }

  set showDeleted(value: boolean): void {
    if (value) {
      this._showDeleted = value;
    }
  }

  get source(): string {
    return this.root + this._sourceFolder + nPath.sep +
      (this.subFolder ? this.subFolder + nPath.sep : '');
  }

  get subFolder(): string {
    return this._subFolder;
  }
}

const g$ = new G$();

export default g$;
