import { Router } from 'express';
import contact from './contact';

const router = Router();

router.use(contact);

export default router;
