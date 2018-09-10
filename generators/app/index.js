const Generator = require('yeoman-generator');
const validatePackageName = require('validate-npm-package-name');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: 'A starter project for claudia api app',
    };

    console.log(this.options.name);

    if (this.options.name) {
      const { name } = this.options;
      const packageNameValidity = validatePackageName(name);

      if (packageNameValidity.validForNewPackages) {
        this.props.name = name;
      } else {
        throw new Error(packageNameValidity.errors[0] || 'The name option is not a valid npm package name.');
      }
    }
  }
};
