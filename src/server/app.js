'use strict'

const path = require('path');
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const StaticTag = require('../templates/helpers/static');

const env = nunjucks.configure(path.join(__dirname, '../templates'), {
  autoescape: true,
  express: app
});

env.addExtension('static', new StaticTag())

const Plugin = require('../plugins/base')
const Comments = require('../plugins/comments')

console.log(new Comments(app, new Plugin));

app.get('/', (req, res) => {
  res.render('index.html');
});

module.exports = app