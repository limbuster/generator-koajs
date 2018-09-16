// const _ = require('lodash');
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.',
    });
  }

  initializing() {
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(this.options.generateInto, './src/app.js'),
    );
    this.fs.copy(
      this.templatePath('routes.js'),
      this.destinationPath(this.options.generateInto, './src/routes/index.js'),
    );
  }

  writing() {
    const pkgJson = {
      dependencies: {
        koa: rootPkg.dependencies.koa,
        'koa-router': rootPkg.dependencies['koa-router'],
      },
      devDependencies: {
        jest: rootPkg.devDependencies.jest,
        'generator-jest': rootPkg.devDependencies['generator-jest'],
      },
      scripts: {
        start: 'node ./src/app',
        test: rootPkg.scripts.test,
      },
    };
    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson,
    );
    const filepath = this.destinationPath(this.options.generateInto, 'routes/index.js');
    this.fs.copyTpl(this.templatePath('routes.js'), filepath);
    this.composeWith(require.resolve('generator-jest/generators/test'), {
      testEnvironment: 'node',
      arguments: [filepath],
      componentName: 'routers',
    });
  }
};
