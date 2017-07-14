import _ from 'lodash';

import Configuration from '../components/configuration/configuration';
import DatabaseWrapper from '../components/databaseWrapper/databaseWrapper';
import logger from '../components/logger/logger';

const config = new Configuration('CodeDoesGood', 'CodeDoesGoodWebsite.json');
const databaseWrapper = new DatabaseWrapper(config.getKey('database_path'));

/**
 * Validates that the email service is currently working before even attempting to continue
 */
function validateDatabaseConnectionStatus(req, res, next) {
  if (databaseWrapper.getStatus()) { return next(); }
  return res.status(503).send({ error: 'Unavailable Service', description: 'Content service is currently unavailable or down' });
}

/**
 * Validates the users name, email and text that as been sent.
 */
function validateContentId(req, res, next) {
  const contentId = parseInt((req.params.id), 10);

  /**
   * Validate that the contentId is a valid number and not containing any letters.
   */
  if (isNaN(contentId)) {
    res.status(400).send({ error: 'invalid id', description: 'Id provided was not a valid number' });
  }

  /**
   * Checks to see if the id exists in the database, continues if it exists otherwise
   * it will reject and and sends a bad request (400) back to the client.
   */
  databaseWrapper.doesIdExist(contentId)
    .then(() => {
      req.contentId = contentId;
      next();
    })
    .catch(() => res.status(400).send({ error: 'invalid id', description: 'Id does not exist' }));
}

/**
 * This will validate the authenication token when authentication is added for updating
 * and adjusting content with a editing section of the website.
 */
function validateAuthenticationToken(req, res/* , next */) {
  // const token = req.params.token;
  /**
   * todo: Setup authentication with jwt tokens and validate here.
   */
  return res.status(503).send({ error: 'Authentication', description: 'Updating content is currently unavailable' });
  // next();
}

/**
 * Validates that the content being requested to be updated is a valid string and not null
 */
function validateContentBeingUpdated(req, res, next) {
  const content = req.body.content;

  if (_.isNil(content)) {
    res.status(400).send({ error: 'Content Validation', description: 'Content is not in a valid format' });
  }

  const text = content.text;
  const title = content.title;
  const alias = content.alias;
  const modifier = content.modifier;

  if (_.isNil(text) || !_.isString(text)) {
    res.status(400).send({ error: 'Content Validation', description: 'Content text is not in a valid format' });
  } else if (_.isNil(alias) || !_.isString(alias)) {
    res.status(400).send({ error: 'Content Validation', description: 'Content alias is not in a valid format' });
  } else if (_.isNil(title) || !_.isString(title)) {
    res.status(400).send({ error: 'Content Validation', description: 'Content title is not in a valid format' });
  } else if (_.isNil(modifier) || !_.isString(modifier)) {
    res.status(400).send({ error: 'Content Validation', description: 'Content modifier is not in a valid format' });
  }

  req.content = content;
  next();
}

/**
 * Updates the content in the content table by id.
 */
function updateContentByIdForRequestingUser(req, res) {
  const content = req.content;
  const contentId = req.contentId;

  const text = content.text;
  const title = content.title;
  const alias = content.alias;
  const modifier = content.modifier;

  databaseWrapper.updateContentById(contentId, text, title, alias, modifier)
    .then(() => res.status(200).send({ message: `Content updated for ${content.title}` }))
    .catch(error => res.status(500).send({ error: 'Updating', description: `Failed to update content for ${content.title}, error=${JSON.stringify(error)}` }));
}

/**
 * Sends the content of the content table to the requesting user by using the
 * contentId that was validated before hand.
 */
function sendContentByIdForRequestingUser(req, res) {
  const contentId = req.contentId;

  databaseWrapper.getContentById(contentId)
    .then(result => res.status(200).send({ message: `content for id ${contentId}`, content: { text: result.text } }))
    .catch((error) => {
      logger.warn(`Error gathering content for id ${contentId}, error=${JSON.stringify(error)}`);
      res.status(500).send({ error: 'content error', description: `Unable to gather content for id ${contentId}` });
    });
}

export default {
  validateDatabaseConnectionStatus,
  validateContentBeingUpdated,
  updateContentByIdForRequestingUser,
  sendContentByIdForRequestingUser,
  validateAuthenticationToken,
  validateContentId,
};
