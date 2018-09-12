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

    // this.option('name', {
    //   type: String,
    //   required: true,
    //   desc: 'The new module name.',
    // });
  }

  writing() {
    const pkgJson = {
      dependencies: {
        koa: rootPkg.dependencies.koa,
      },
      scripts: {
        start: 'node app',
      },
    };
    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson,
    );
    const filepath = this.destinationPath(this.options.generateInto, 'app.js');
    this.fs.copyTpl(this.templatePath('app.js'), filepath);
    // this.composeWith(require.resolve('generator-jest/generators/test'), {
    //   testEnvironment: 'node',
    //   arguments: [filepath],
    //   componentName: 'app',
    // });
  }
};
