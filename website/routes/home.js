
/**
 * Home Route
 * @module website/routes/Home
 */

module.exports = function (app) {
  var route = '/';

  /**
   * Home Page
   */
  app.get(route,
    function renderHome(req, res) {
      res.send('Hello CDG World!');
    });
}
