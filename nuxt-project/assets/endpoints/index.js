import * as apiCall from './apiCall';
import utils from './utils';

import contactEndpoint from './endpoints/contactEndpoint';

export default function endpointApi(token = null) {
  const setUtil = (key, value) => {
    utils[key] = value;
  };

  const getUtil = key => utils[key];

  if (token !== null) {
    setUtil('TOKEN', token);
  }

  return {
    contact: contactEndpoint,
    apiCall,
    setUtil,
    getUtil,
    utils,
  };
}

