'use strict';
let Generator = require('yeoman-generator');
let chalk = require('chalk');
let yosay = require('yosay');
let path = require('path');

module.exports = class extends Generator{
  async prompting() {
    this.log(yosay(
      `${chalk.magenta('Minimal')} ${chalk.green('NodeJS')} ${chalk.yellow('app generator')}!`
    ));

    let prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s the name of the app?',
      default: path.basename(this.destinationRoot())
    }, {
      type: 'confirm',
      name: 'isApp',
      message: 'Is this an app (i.e not a shared library)',
      default: true
    }, {
      type: 'input',
      name: 'author',
      message: 'Author?',
      default: ''
    }, {
      type: 'confirm',
      name: 'isExpress',
      message: 'Install express',
      default: false
    }];

    this.answers = await this.prompt(prompts);
  }

  writing() {
    this.fs.copyTpl(this.templatePath('package.json.ejs'), this.destinationPath('package.json'), {
      props: {
        name: this.appname,
        author: this.answers.author,
        isApp: this.answers.isApp,
        isExpress: this.answers.isExpress
      }
    });
    this.fs.copyTpl(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath('_.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copyTpl(this.templatePath('_.eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copyTpl(this.templatePath('jsconfig.json'), this.destinationPath('jsconfig.json'));
    this.fs.copyTpl(this.templatePath('_launch.json'), this.destinationPath('.vscode/launch.json'));
    this.fs.copyTpl(this.templatePath('_tasks.json'), this.destinationPath('.vscode/tasks.json'));
    this.fs.copyTpl(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
    this.fs.copyTpl(this.templatePath('test/index.js'), this.destinationPath('test/index.js'));
    this.fs.copyTpl(this.templatePath('test/.eslintrc'), this.destinationPath('test/.eslintrc'));
  }

  install() {
    this.npmInstall([
      'chai',
      'eslint',
      'nyc',
      'mocha',
      'nodemon',
      'proxyquire',
      'sinon'
    ], {
      'save-dev': true
    });

    if (this.answers.isExpress) {
      this.npmInstall([
        'express',
        'cookie-parser',
        'body-parser'
      ], { save: true });
    }
  }
};
