const logger = require('./components/logger/logger')

const app = require('express')()
const bodyParser = require('body-parser')
const Nuxt = require('nuxt')
const endpoints = require('./endpoints')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const nuxtConfiguration = require('../nuxt.config.js')
nuxtConfiguration.dev = !(process.env.NODE_ENV === 'production')

// Pass the configuration to setup Nuxt
const nuxt = new Nuxt(nuxtConfiguration)
app.use(bodyParser.urlencoded({ extended: false }))

// Build the nuxt if the configuration is in dev mode
if (nuxtConfiguration.dev) {
  nuxt.build()
  .catch((error) => {
    logger.error(`Error occured building nuxt=${error}`)
    process.exit(1)
  })
}

app.use('/api', endpoints)
app.use(nuxt.render)

app.listen(port, () => { logger.info(`Server listening on port ${host}:${port}`) })
