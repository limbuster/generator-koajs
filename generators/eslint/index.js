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
      this.templatePath('.eslintrc.js'),
      this.destinationPath(this.options.generateInto, '.eslintrc.js'),
    );
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore'),
    );
  }

  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: rootPkg.devDependencies.eslint,
        husky: rootPkg.devDependencies.husky,
        'eslint-config-airbnb-base': rootPkg.devDependencies['eslint-config-airbnb-base'],
        'eslint-plugin-import': rootPkg.devDependencies['eslint-plugin-import'],
      },
      scripts: {
        lint: rootPkg.scripts.lint,
        prepush: rootPkg.scripts.prepush,
      },
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson,
    );
  }
};
