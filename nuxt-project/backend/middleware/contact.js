import _ from 'lodash';

import Configuration from '../components/configuration/configuration';
import Email from '../components/email/email';
import logger from '../components/logger/logger';

const config = new Configuration('CodeDoesGood', 'CodeDoesGoodWebsite.json');
const email = new Email(config.getKey('email'));

/**
 * Validates that the email service is currently working before even attempting to continue
 */
function validateEmailConnectionStatus(req, res, next) {
  if (email.getStatus()) {
    next();
  } else {
    res.status(503).send({ error: 'Unavailable Service', description: 'Email service is currently unavailable or down' });
  }
}

/**
 * Validates the users name, email and text that as been sent.
 */
function validateContactUsRequestInformation(req, res, next) {
  const senderName = req.body.name;
  const senderEmail = req.body.email;
  const senderSubject = req.body.subject;
  const senderText = req.body.text;

  let valid = true;

  const sender = { name: senderName, email: senderEmail, subject: senderSubject, text: senderText };
  _.forEach(sender, (item) => { if (_.isNil(item)) { valid = false; } });

  if (!valid) {
    return res.status(400).send({ error: 'Invalid fields', description: 'Please, make sure you\'ve filled all of the required fields' });
  } else if (sender.name.length > 50 || sender.email.length > 50 || sender.subject.length > 50) {
    return res.status(400).send({ error: 'Invalid length', description: 'Please make sure email and name are less than 50 characters each' });
  } else if (sender.text.length > 500 || sender.text.length < 5) {
    return res.status(400).send({ error: 'Invalid length', description: 'Please use less than 500 characters for contact text or greater than 5' });
  }

  // Bind the sender to the request data to be accessed later
  req.sender = sender;
  return next();
}

/**
 * Rejects any invalid domain names or banned domain names from being sent.
 */
function DenyInvalidAndBlockedDomains(req, res, next) {
  return next();
}

/**
 * After validation of the name, email and senderText then send the email to the
 * email to the deafult CodeDoesGood inbox.
 */
function sendContactUsRequestInbox(req, res) {
  const sender = req.sender;

  email.send(sender.email, config.getKey(['email']).email, sender.subject, sender.text, sender.text)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    logger.error(`Error attempting to send a email. to=${config.getKey(['email']).email} from=${sender.email}, error=${error}`);
    res.status(503).send({ error: 'Unavailable Service', description: 'Email service is currently unavailable or down' });
  });
}

/**
 * Sends OK or Internal Server Error based on the true / false email status.
 */
function sendContactUsEmailStatus(req, res) {
  if (email.getStatus()) { res.sendStatus(200); } else { res.status(503).send({ error: 'Unavailable Service', description: 'Email service is currently unavailable or down' }); }
}

export default {
  validateEmailConnectionStatus,
  validateContactUsRequestInformation,
  DenyInvalidAndBlockedDomains,
  sendContactUsRequestInbox,
  sendContactUsEmailStatus,
};
