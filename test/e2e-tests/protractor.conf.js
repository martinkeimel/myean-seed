'use strict';

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },

  // Framework to use. Jasmine 2 is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['./scenarios/*.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  baseUrl: 'http://localhost:9000/',

  // This is currently used to set the database prior to tests running, but
  // it can be used for something else if needed
  beforeLaunch: './beforeLaunch'
};
