
/**
 * Website Routes
 * @module website/routes/Website
 */

module.exports = function (app) {
  /**
   * Home Page
   */
  app.get('/',
    function renderHome(req, res) {
      res.render('home', { name: 'John Doe' });
    });

  /**
   * About Us
   */
  app.get('/about-us',
    function renderAboutUs(req, res) {
      res.render('about-us', { people: ['Abbey', 'Shahin', 'Massimo', 'Renato'] });
    });
}
