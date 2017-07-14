import { Router } from 'express';
import contact from '../middleware/contact';

const router = Router();

/**
 * Routing for all contact us processes.
 *
 * validate that the service is up and running.
 * Validate all information is provided.
 * Deny any blocked domains or requests.
 * Send the email to the contact us inbox.
 */
router.post('/contact-us/send', [
  contact.validateEmailConnectionStatus.bind(this),
  contact.validateContactUsRequestInformation.bind(this),
  contact.DenyInvalidAndBlockedDomains.bind(this),
  contact.sendContactUsRequestInbox.bind(this),
]);

/**
 * Routing process for getting the status of the contactus system
 */
router.get('/contact-us/status', [
  contact.sendContactUsEmailStatus.bind(this),
]);

export default router;
