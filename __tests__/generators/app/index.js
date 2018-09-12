/* global describe: true, test: true, expect: true */

const helpers = require('yeoman-test');
const path = require('path');

describe('generator:koajs', () => {
  test('generate a project', () => helpers.run(path.join(__dirname, '../../../generators/app'))
    .withOptions({ foo: 'bar' }) // Mock options passed in
    .withArguments(['name-x']) // Mock the arguments
    .withPrompts({ coffee: false }) // Mock the prompt answers
    .withLocalConfig({ lang: 'en' }) // Mock the local config
    .then(() => {
      // assert something about the generator
    }));
});
