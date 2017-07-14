const knex = require('knex');

const logger = require('../logger/logger');

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
      .catch(error => logger.error(`Could not connect to knex database=${this.path}, error=${JSON.stringify((error))}`));
  }
}
