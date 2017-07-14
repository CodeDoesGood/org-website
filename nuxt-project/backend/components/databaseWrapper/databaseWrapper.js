import knex from 'knex';
import Promise from 'bluebird';
import _ from 'lodash';

import logger from '../logger/logger';

let instance = null;

/**
 * preplanning code for a database wrapper for sqlite3.
 */
export default class DatbaseWrapper {
  /**
   * @param databasePath The path to the sqlite3 database
   */
  constructor(databasePath) {
    /**
     * Singleton setup, allows for just a since instance of the
     * class to be stored and used across the board after a single
     * creation is first made.
     */
    if (instance) {
      return instance;
    }
    this.path = databasePath;
    this.knex = null;
    this.online = true;

    this.connect();

    instance = this;
  }

  /**
   * Configure knex while also test the connection to the sqlite3 database.
   * @returns {Promise.<T>}
   */
  connect() {
    this.knex = knex({ client: 'sqlite3', connection: { filename: this.path }, useNullAsDefault: true });

    return this.knex.raw('SELECT 1+1 as answer')
      .then(() => logger.info(`Successfully connected to knex database=${this.path}`))
      .catch((error) => {
        this.online = false;
        logger.error(`Could not connect to knex database=${this.path}, error=${JSON.stringify((error))}`);
      });
  }

  /**
   * Gets the content from the content table by id, returns the content and the id.
   * @param id The id of the content to be grabbed.
   */
  getContentById(id) {
    return new Promise((resolve, reject) => {
      this.knex('content').select('id', 'content').where('id', id).first()
        .then(result => resolve({ id: result.id, text: result.content }))
        .catch(error => reject(error));
    });
  }

  /**
   *  Returns or rejects if the id exits or does not exist in the contents table.
   * @param id
   */
  doesIdExist(id) {
    return new Promise((resolve, reject) => {
      this.knex('content').select('id').where('id', id).first()
        .then((result) => {
          if (_.isNil(result.id)) { reject(0); } else { resolve(1); }
        })
        .catch(() => reject(0));
    });
  }

  /**
   * Updates the conten in the content table by id.
   * @param id The id of the content row.
   * @param text The text being inserted.
   * @param title The title being inserted.
   * @param alias The alias being inserted.
   * @param modifier The user updating the content.
   */
  updateContentById(id, content, title, alias, modifier) {
    return new Promise((resolve, reject) => {
      this.knex('content').where('id', id).update({
        content,
        title,
        alias,
        modified_by: modifier,
        modified_date: new Date(),
      })
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  /**
   * @returns {boolean} Online Status
   */
  getStatus() {
    return this.online;
  }
}
