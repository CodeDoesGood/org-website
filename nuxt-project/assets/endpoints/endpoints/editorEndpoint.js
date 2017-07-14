import endpoint from '../endpoint';
import utils from '../utils';

/**
 * This is currently preplanning code to help within the future when the
 * page editor system is setup and ready use.
 */
const volunteerEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'editor',
  /**
   * Get stored page content by content id
   * @param {number} id The id of the content to gather
   */
  gatherById(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/gather/${id}`, 'get');
    return this.apiCall(options);
  },
  /**
   * Update the stored content within by id,the id
   * being the id of the content of the guides or page.
   * @param {number} id The id of the content within the database
   * @param {string} content The content that will be updating replacing the database content
   */
  updateById(id, content) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/update/${id}`, 'get', { content });
    return this.apiCall(options);
  },
});

export default volunteerEndpoint;
