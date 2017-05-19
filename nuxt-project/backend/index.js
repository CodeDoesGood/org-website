const logger = require('./components/logger/logger');
const nuxtConfiguration = require('../nuxt.config.js');

const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const Nuxt = require('nuxt');

const port = process.env.PORT || 3000;

nuxtConfiguration.dev = !(process.env.NODE_ENV === 'production');

// Pass the configuration to setup Nuxt
const nuxt = new Nuxt(nuxtConfiguration);
app.use(bodyParser.urlencoded({ extended: false }));

// Build the nuxt if the configuration is in dev mode
if (nuxtConfiguration.dev) {
  nuxt.build()
  .catch((error) => {
    logger.error(`Error occured building nuxt=${error}`);
    process.exit(1);
  });
}

app.use('/api', routes);
app.use(nuxt.render);

app.listen(port, () => { logger.info(`Server listening on port: ${port}`); });
