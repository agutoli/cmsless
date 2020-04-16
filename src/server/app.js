'use strict'

const path = require('path');
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const StaticTag = require('../templates/helpers/static');

const env = nunjucks.configure([
    path.join(__dirname, '../templates'),
  ], {
  autoescape: true,
  express: app
});

env.addExtension('static', new StaticTag())

module.exports = app