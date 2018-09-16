/* global describe: true, test: true */

const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('generator:koajs', () => {
  test('generate a project', async () => {
    await helpers.run(path.join(__dirname, '../../../generators/app'));
    assert.file('src/app.js');
    assert.file('src/routes/index.js');
  });
});
