
module.exports = {
  webpack: (config) => {
    const configuration = config;
    configuration.entry.main = './backend/index.js';
    return configuration;
  },
};
