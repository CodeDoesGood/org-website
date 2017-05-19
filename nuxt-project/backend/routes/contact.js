const contact = require('../middleware/contact');
const Router = require('express').Router;

const router = Router();

router.post('/contact/send', [
  contact.validateEmailConnectionStatus.bind(this),
  contact.validateContactUsRequestInformation.bind(this),
  contact.DenyInvalidAndBlockedDomains.bind(this),
  contact.sendContactUsRequestInbox.bind(this),
]);

router.get('/contact/status', [
  contact.sendContactUsEmailStatus.bind(this),
]);

module.exports = router;
