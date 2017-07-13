import endpoint from '../endpoint';
import utils from '../utils';

const contactEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'contact-us',
  /**
   * Sends a contact us email containging the contact us
   * form content to the contactus mail box for CodeDoesGood.
   * @param {string} name The name from contact us form.
   * @param {string} email The email from contact us form.
   * @param {string} subject The subject from contact us form.
   * @param {string} text The text from contact us form.
   */
  send(name, email, subject, text) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/send`, 'post', { name, email, subject, text });
    return this.apiCall(options);
  },
  /**
   * Gathers the current up status of the email service.
   * returns a standard 200 if all is okay but returns a 503
   * if its down with a standard error format.
   */
  status() {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/status`, 'get');
    return this.apiCall(options);
  },
});

export default contactEndpoint;
