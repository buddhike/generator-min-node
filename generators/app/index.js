'use strict';
let yeoman = require('yeoman-generator');
let chalk = require('chalk');
let yosay = require('yosay');
let slug = require('slug');
let path = require('path');

module.exports = yeoman.Base.extend({
  ask: function () {
    this.log(yosay(
      `${chalk.magenta('Minimal')} ${chalk.green('NodeJS')} ${chalk.yellow('app generator')}!`
    ));

    let prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s the name of the app?',
      default: slug(path.basename(this.destinationRoot()))
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
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.template('package.json.ejs', 'package.json');
    this.copy('_.gitignore', '.gitignore');
    this.copy('_.editorconfig', '.editorconfig');
    this.copy('_.eslintrc', '.eslintrc');
    this.copy('jsconfig.json', 'jsconfig.json');
    this.copy('_launch.json', '.vscode/launch.json');
    this.copy('_tasks.json', '.vscode/tasks.json');
    this.mkdirp('src');
    this.mkdirp('test');
    this.copy('src/index.js', 'src/index.js');
    this.copy('test/index.js', 'test/index.js');
    this.copy('test/setup.js', 'test/setup.js');
    this.copy('test/.eslintrc', 'test/.eslintrc');
  },

  install: function () {
    this.npmInstall([
      'chai',
      'eslint',
      'istanbul',
      'mocha',
      'nodemon',
      'proxyquire',
      'sinon'
    ], {
      'save-dev': true
    });

    if (this.props.isExpress) {
      this.npmInstall([
        'express',
        'cookie-parser',
        'body-parser'
      ], { save: true });
    }
  }
});
