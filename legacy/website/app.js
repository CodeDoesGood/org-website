/**
 * CDG Org Website App
 * @module website/App
 */

/**
 * Dependencies
 */
const _            = require('lodash');
const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const errorHandler = require('errorhandler');
const path         = require('path');
const swig         = require('swig');
// const argv         = require('optimist');


/**
 * Express App instance
 */
const app = express();

/**
 * Module dependencies are all injected under `app.locals.modules`
 * so it's safe to bootstrap the app
 */
const initApp = (modules) => {
  /**
   * Morgan - HTTP request logger
   */
  app.use(logger('dev'));

  /**
   * Template Engine - Swig
   */
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.set('view cache', true);

  /**
   * Template Engine - Swig
   */
  app.use(express.static(path.join(__dirname, 'public')));

  /**
   * Body Parser + Multer
   * body parsing (multer for multipart form)
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /**
   * Routes
   * App routes are defined in the `/routes` folder
   * by requiring `routes/index` we'll enable routes in the app
   */
  require('./routes')(app);

  /**
   * Error Handler
   * NOTE: should be loaded after loading the routes
   */
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }
};

/**
 * Expose Website Express App
 */
module.exports = (modules) => {
  _.assign(app.locals, modules);

  initApp();

  return app;
};
