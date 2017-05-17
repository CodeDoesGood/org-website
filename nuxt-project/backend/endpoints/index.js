const Router = require('express').Router
const contact = require('./contact')

const router = Router()

router.use(contact)

module.exports = router
