const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option('projectRoot', {
      type: String,
      required: false,
      default: '',
      desc: 'Relative path to the project code root',
    });
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: 'A generator for creating a seed koajs project',
    };
  }

  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
  async _askForModuleName() {
    let askedName;
    if (this.props.name) {
      askedName = { name: this.props.name };
    } else {
      askedName = await askName({
        name: 'name',
        default: path.basename(process.cwd()),
      }, this);
    }
    const answer = askedName;
    const moduleNameParts = this._getModuleNameParts(answer.name);
    Object.assign(this.props, moduleNameParts);
  }

  _getModuleNameParts(name) {
    const moduleName = {
      name,
      repositoryName: this.props.repositoryName,
    };

    if (moduleName.name.startsWith('@')) {
      const nameParts = moduleName.name.slice(1).split('/');
      Object.assign(moduleName, {
        scopeName: nameParts[0],
        localName: nameParts[1],
      });
    } else {
      moduleName.localName = moduleName.name;
    }

    if (!moduleName.repositoryName) {
      moduleName.repositoryName = moduleName.localName;
    }
    return moduleName;
  }

  default() {
    this.composeWith(require.resolve('../boilerplates'));
    this.composeWith(require.resolve('../editorconfig'));
    this.composeWith(require.resolve('../eslint'));
  }

  async prompting() {
    await this._askForModuleName();
    this.config.save(this.props);
  }

  writing() {
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    const pkg = _.merge(
      {
        name: this.props.name,
        version: '0.0.0',
        description: this.props.description,
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail,
        },
        files: [this.options.projectRoot],
        main: path.join(this.options.projectRoot, 'app.js').replace(/\\/g, '/'),
        keywords: [],
        dependencies: {},
        devDependencies: {},
        engines: {
          npm: '>= 5.0.0',
        },
        scripts: {},
      },
      currentPkg,
    );

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  installing() {
    this.npmInstall();
  }

  end() {
    this.log('The seed project for koajs api was successfully scaffolded.');
  }
};
