/**
 * Dependencies
 */
const express = require('express');

/**
 * Server App instance
 */
const app = express();
app.set('port', process.env.PORT || 3000);

/**
* Website App Instance
*/
const websiteApp = require('./website/app')({});

/**
* Mount Website App on the Server instance
*/
app.use(websiteApp);

/**
* lift up HTTP Server listening on `app.get('port')`
*/
//TODO: make it HTTPS
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
