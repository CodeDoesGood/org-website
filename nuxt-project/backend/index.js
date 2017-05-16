const logger = require('./components/logger/logger')

const Nuxt = require('nuxt')
const app = require('express')()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const nuxtConfiguration = require('../nuxt.config.js')
nuxtConfiguration.dev = !(process.env.NODE_ENV === 'production')

// Pass the configuration to setup Nuxt
const nuxt = new Nuxt(nuxtConfiguration)
app.use(nuxt.render)

// Build the nuxt if the configuration is in dev mode
if (nuxtConfiguration.dev) {
  nuxt.build()
  .catch((error) => {
    logger.error(`Error occured building nuxt=${error}`)
    process.exit(1)
  })
}

app.listen(port, () => { logger.info(`Server listening on port ${host}:${port}`) })
