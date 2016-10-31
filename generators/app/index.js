'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var slug = require('slug')
var path = require('path')

module.exports = yeoman.Base.extend({
  ask: function () {
    this.log(yosay(
      `${chalk.magenta('Minimal')} ${chalk.green('NodeJS')} ${chalk.yellow('app generator')}!`
    ))

    var prompts = [{
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
    }]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props
    }.bind(this))
  },

  writing: function () {
    this.template('package.json.ejs', 'package.json')
    this.copy('_.babelrc', '.babelrc')
    this.copy('_.editorconfig', '.editorconfig')
    this.copy('_.eslintrc', '.eslintrc')
    this.copy('jsconfig.json', 'jsconfig.json')
    this.copy('_launch.json', '.vscode/launch.json')
    this.copy('_tasks.json', '.vscode/tasks.json')
    this.mkdir('src')
    this.mkdir('test')
    this.copy('src/index.js', 'src/index.js')
    this.copy('test/index.js', 'test/index.js')
    this.copy('test/setup.js', 'test/setup.js')
    this.copy('test/.eslintrc', 'test/.eslintrc')
  },

  install: function () {
    this.npmInstall([
      'babel-cli',
      'babel-eslint',
      'babel-plugin-transform-async-to-generator',
      'babel-plugin-transform-class-properties',
      'babel-preset-es2015',
      'babel-polyfill',
      'chai',
      'eslint',
      'eslint-plugin-promise',
      'eslint-plugin-standard',
      'eslint-config-standard',
      'istanbul',
      'mocha',
      'nodemon',
      'proxyquire',
      'sinon'
    ], {
      'save-dev': true
    })

    if (this.props.isExpress) {
      this.npmInstall([
        'express',
        'cookie-parser',
        'body-parser'
      ], { save: true })
    }
  }
})
