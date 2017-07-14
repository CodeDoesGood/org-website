const utils = {
  API_URL: '/api',
  TOKEN: '',

  buildOptions: (apiUrl, path, method, body = {}) => ({
    apiUrl,
    path,
    method,
    body,
  }),
};

export default utils;
