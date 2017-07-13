import endpoint from '../endpoint';
import utils from '../utils';

/**
 * This is currently preplanning code to help within the future when the
 * volunteer software is setup and ready for hooking into.
 */

const volunteerEndpoint = endpoint({
  // Pointing to the general idea of the volunteer webapp location.
  apiUrl: 'http://volunteer.codedoesgood.org/api/',
  path: 'volunteer',
  /**
   * Gather all constributors from the volunteer software
   * general thought of a response to be a list of contributors names, id, summaries, picture url.
   */
  contributors() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/contributors`, 'get');
    return this.apiCall(options);
  },
  /**
   * Gather contributor by id for displaying more information about the contributor.
   * general thought of a response to be a list containing the contributor
   * name, id, summary, bio, contact-details, image url.
   * @param {*} id The id of the contributor
   */
  contributorById(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/contributor/${id}`, 'get');
    return this.apiCall(options);
  },
  /**
   * Gather all projects from the volunteer software.
   * general thought of a response to be a list containing the projects
   * names, ids, summaries, image urls
   */
  projects() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/projects`, 'get');
    return this.apiCall(options);
  },
  /**
   * Gather project by id for displaying more information about the project.
   * general thought of a response to be a list containing the project
   * name, id, summary, bio, links, image url.
   * @param {*} id The id of the project
   */
  projectById(id) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/project/${id}`, 'get');
    return this.apiCall(options);
  },
});

export default volunteerEndpoint;
