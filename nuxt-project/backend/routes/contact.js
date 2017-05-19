import { Router } from 'express';
import contact from '../middleware/contact';

const router = Router();

router.post('/contact-us/send', [
  contact.validateEmailConnectionStatus.bind(this),
  contact.validateContactUsRequestInformation.bind(this),
  contact.DenyInvalidAndBlockedDomains.bind(this),
  contact.sendContactUsRequestInbox.bind(this),
]);

router.get('/contact-us/status', [
  contact.sendContactUsEmailStatus.bind(this),
]);

export default router;
