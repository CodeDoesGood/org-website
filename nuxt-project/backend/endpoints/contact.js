const Configuration = require('../components/configuration/configuration')
const Email = require('../components/email/email')
const logger = require('../components/logger/logger')

const _ = require('lodash')
const Router = require('express').Router

const router = Router()
const config = new Configuration('CodeDoesGood', 'CodeDoesGoodWebsite.json')
const email = new Email(config.getKey('email'))

/*******************************************************************************
 *                              Middleware
*******************************************************************************/

router.post('/contact/send', [
  validateEmailConnectionStatus.bind(this),
  validateContactUsRequestInformation.bind(this),
  DenyInvalidAndBlockedDomains.bind(this),
  sendContactUsRequestInbox.bind(this)
])

router.get('/contact/status', [
  sendContactUsEmailStatus.bind(this)
])

/*******************************************************************************
 *                          Middleware Interaction
*******************************************************************************/

/**
 * Validates that the email service is currently working before even attempting to continue
 */
function validateEmailConnectionStatus (req, res, next) {
  if (email.getStatus()) {
    next()
  } else {
    res.status(503).send({error: 'Unavailable Service', description: 'Email service is currently unavailable or down'})
  }
}

/**
 * Validates the users name, email and text that as been sent.
 * [TODO: Filter out blocked or banned email address domains for if they pass the captcha]
 */
function validateContactUsRequestInformation (req, res, next) {
  const sender = {name: req.body.name, email: req.body.email, subject: req.body.subject, text: req.body.text}

  if (_.isNil(sender.name) || _.isNil(sender.email) || _.isNil(sender.subject) || _.isNil(sender.text)) {
    return res.status(400).send({error: 'Invalid fields', description: 'Please, make sure you\'ve filled all of the required fields'})
  } else if (sender.name.length > 50 || sender.email.length > 50 || sender.subject.length > 50) {
    return res.status(400).send({error: 'Invalid length', description: 'Please make sure email and name are less than 50 characters each'})
  } else if (sender.text.length > 500 || sender.textlength < 5) {
    return res.status(400).send({error: 'Invalid length', description: 'Please use less than 500 characters for contact text'})
  }

  // Bind the sender to the request data to be accessed later
  req.sender = sender
  next()
}

/**
 * Rejects any invalid domain names or banned domain names from being sent.
 */
function DenyInvalidAndBlockedDomains (req, res, next) {
  next()
}

/**
 * After validation of the name, email and senderText then send the email to the
 * email to the deafult CodeDoesGood inbox.
 */
function sendContactUsRequestInbox (req, res) {
  const sender = req.sender

  email.send(sender.email, config.getKey(['email']).email, sender.subject, sender.text, sender.text)
  .then((result) => {
    res.sendStatus(200)
  })
  .catch((error) => {
    logger.error(`Error attempting to send a email. to=${config.getKey(['email']).email} from=${sender.email}, error=${error}`)
    res.status(503).send({error: 'Unavailable Service', description: 'Email service is currently unavailable or down'})
  })
}

/**
 * Sends OK or Internal Server Error based on the true / false email status
 */
function sendContactUsEmailStatus (req, res) {
  if (email.getStatus()) { res.sendStatus(200) } else { res.sendStatus(500) }
}

module.exports = router
