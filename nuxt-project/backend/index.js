import express from 'express';
import bodyParser from 'body-parser';
import Nuxt from 'nuxt';

import logger from './components/logger/logger';
import nuxtConfiguration from '../nuxt.config';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

nuxtConfiguration.dev = !(process.env.NODE_ENV === 'production');

// Pass the configuration to setup Nuxt
const nuxt = new Nuxt(nuxtConfiguration);

// Build the nuxt if the configuration is in dev mode
if (nuxtConfiguration.dev) {
  nuxt.build()
  .catch((error) => {
    logger.error(`Error occured building nuxt=${error}`);
    process.exit(1);
  });
}

/**
 * Binds all routes to /api before nuxt does, this allows us to preserve our requests routes.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(nuxt.render);

app.listen(port, () => { logger.info(`Server listening on port: ${port}`); });
