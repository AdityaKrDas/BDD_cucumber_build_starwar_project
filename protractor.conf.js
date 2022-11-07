// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const jsonReports = process.cwd() + "/test-reports";

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

exports.config = {
  
  debug: false,
  allScriptsTimeout: 11000,
  specs: [
    
    './e2e/features/*.feature'
    
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  allScriptsTimeout: 45000,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    strict: true,
    require: [
      './e2e/steps/app.steps.ts'
    ],
    format: [
      'json:test-reports/cucumber-test-results.json'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
    });
    if (!fs.existsSync(jsonReports)) {
      mkdirp.sync(jsonReports);
    }
    
  }
};
