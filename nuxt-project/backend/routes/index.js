import { Router } from 'express';
import contact from './contact';
import editor from './editor';

const router = Router();

/**
 * Binding all contact routes to be used within the
 * express routing system.
 */
router.use(contact);
router.use(editor);

export default router;
