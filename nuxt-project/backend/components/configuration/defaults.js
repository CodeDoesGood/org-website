const defaultConfig = {

  // The settings used by nodemailer for sending emails (password should never be set here).
  email: {
    service: 'gmail',
    email: 'contact@codedoesgood.org',
    password: null,
  },

  database_path: './backend/database/database.db',
  // What port the webserver will listen too, default: 80
  web_port: 80,
};

module.exports = defaultConfig;
