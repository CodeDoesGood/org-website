import { Router } from 'express';
import contact from './contact';

const router = Router();

/**
 * Binding all contact routes to be used within the
 * express routing system.
 */
router.use(contact);

export default router;
