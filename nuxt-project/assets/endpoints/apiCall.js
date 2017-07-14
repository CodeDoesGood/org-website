import * as _ from 'lodash';
import * as request from 'superagent';
import Promise from 'bluebird';

import utils from './utils';

Promise.config({
  warnings: false,
});

export default function apiCall(options) {
  ['method', 'apiUrl', 'path', 'body'].forEach((option) => {
    // All options must be specified before making a call.
    if (!options[option]) {
      throw new Error(`${option} has to be specified`);
    }
  });

  const parseApiCall = (value, defaultValue = {}, isError = true) => {
    try {
      const result = JSON.parse(value);
      if (!isError && _.isNil(result.message)) {
        return { message: 'No content returned', content: {} };
      } else if (isError && _.isNil(result.error)) {
        return 'No error message was given';
      } else if (isError) {
        return result;
      }

      return result;
    } catch (error) {
      return defaultValue;
    }
  };

  const token = utils.TOKEN;

  return new Promise((resolve, reject) => {
    request[options.method](`${options.apiUrl}/${options.path}`)
      .send(options.body)
      .set('token', token)
      .end((error, result) => {
        if (error) {
          reject(parseApiCall(error.response.text, {
            error: 'Could not found error',
          }, true));
        } else {
          resolve(parseApiCall(result.text, {}, false));
        }
      });
  });
}
