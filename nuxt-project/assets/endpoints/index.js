import * as apiCall from './apiCall';
import utils from './utils';

import contactEndpoint from './endpoints/contactEndpoint';
import editorEndpoint from './endpoints/editorEndpoint';
import volunteerEndpoint from './endpoints/volunteerEndpoint';

export default function endpointApi(token = null) {
  /**
   * Stores a value in the client by key.
   * @param key The indexing key.
   * @param value The value being stored.
   */
  const setUtil = (key, value) => {
    utils[key] = value;
  };

  /**
   * Gets a value by key from client.
   * @param key
   */
  const getUtil = key => utils[key];

  if (token !== null) {
    setUtil('TOKEN', token);
  }

  return {
    contact: contactEndpoint,
    editor: editorEndpoint,
    volunteer: volunteerEndpoint,
    apiCall,
    setUtil,
    getUtil,
    utils,
  };
}

