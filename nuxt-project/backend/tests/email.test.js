/* global describe, it */
const Configuration = require('../components/configuration/configuration');
const Email = require('../components/email/email');

const config = new Configuration('CodeDoesGood', 'CodeDoesGoodWebsite.json');
const email = new Email(config.getKey('email'));

describe('#Email', () => {
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
