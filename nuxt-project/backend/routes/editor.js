import { Router } from 'express';
import editor from '../middleware/editor';

const router = Router();

/**
 * Returns the content requested by id if it exists.
 */
router.get('/editor/gather/:id', [
  editor.validateDatabaseConnectionStatus.bind(this),
  editor.validateContentId.bind(this),
  editor.sendContentByIdForRequestingUser.bind(this),
]);

/**
 * Todo: Verify token that was authenticated with.
 */
router.post('/editor/update/:id', [
  editor.validateDatabaseConnectionStatus.bind(this),
  editor.validateAuthenticationToken.bind(this),
  editor.validateContent.bind(this),
  editor.validateContentId.bind(this),
  editor.updateContentByIdForRequestingUser.bind(this),
]);

/**
 * Todo: Verify token that was authenticated with.
 */
router.post('/editor/insert', [
  editor.validateDatabaseConnectionStatus.bind(this),
  editor.validateAuthenticationToken.bind(this),
  editor.validateContent.bind(this),
  editor.insertContentIntoDatabase.bind(this),
]);

export default router;
