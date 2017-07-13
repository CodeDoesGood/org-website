import endpoint from '../endpoint';
import utils from '../utils';

const contactEndpoint = endpoint({
  apiUrl: utils.API_URL,
  path: 'contact-us',
  send(name, email) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/send`, 'post', { name, email });
    return this.apiCall(options);
  },
  status(name, email) {
    const options = utils.buildOptions(this.apiUrl, `${this.path}/status`, 'get', { name, email });
    return this.apiCall(options);
  },
});

export default contactEndpoint;
