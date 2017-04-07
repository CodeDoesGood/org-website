
/**
 * Website Routes
 * @module website/routes/Website
 */

const _ = require('lodash');


module.exports = (app) => {
  const layoutContext = {
    meta: {
      description: "We are a volunteer run group of (mostly) developers who are committed to using our technical skills to help others through our mission: To harness the cognitive surplus of the tech community towards building solutions to real problems in the world."
    }
  };

  /**
   * Home Page
   */
  app.get('/', (req, res) => {
    const routeContext = {};

    res.render('home', _.assign(layoutContext, routeContext));
  });

  /**
   * Portfolio
   */
  app.get('/portfolio', (req, res) => {
    const routeContext = {};

    res.render('portfolio', _.assign(layoutContext, routeContext));
  });

  /**
   * About Us
   */
  app.get('/about-us', (req, res) => {
    const routeContext = {
      people: ['Abbey', 'Shahin', 'Massimo', 'Renato']
    };

    res.render('about-us', _.assign(layoutContext, routeContext));
  });

  /**
   * Team
   */
  app.get('/team', (req, res) => {
    const routeContext = {};

    res.render('team', _.assign(layoutContext, routeContext));
  });

  /**
   * Contact Us
   */
  app.get('/contact-us', (req, res) => {
    const routeContext = {};

    res.render('contact-us', _.assign(layoutContext, routeContext));
  });
  // app.post('/contact-us', (req, res) => {
  //   // do cool stuff with the form data...
  // });


}
