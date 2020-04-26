const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')

const settings = require('../settings')
const Config = require('../common/libraries/Config')
const ModuleManager = require('../common/libraries/ModuleManager')
const PluginManager = require('../common/libraries/PluginManager')

class Boostrap {
  constructor(server) {
    this.settings = settings;

    global.__ = function i18n(input) {
      // temporary func
      return input;
    }

    this.server = server;
    this.config = new Config(this);

    // load plugins at end
    this.plugin = new PluginManager(this);
    this.plugin.lookUp();

    this.module = new ModuleManager(this);
  }
}

module.exports = {
  init: () => {
    const server = express()

    const env = nunjucks.configure(path.join(__dirname, '../admin/templates'), {
      autoescape: false,
      express: server
    });

    server.use(settings.STATIC_URL, express.static(path.join(__dirname, '../admin/static')))

    const StaticTag = require('../admin/templates/helpers/static')
    const ModuleTag = require('../admin/templates/helpers/module')

    const boot = new Boostrap(server);

    env.addExtension('static', new StaticTag(boot))
    env.addExtension('module', new ModuleTag(boot))

    server.get('/', (req, res) => {
      var tmpl = env.getTemplate('index.html').render({});
      res.send(tmpl);
    });

    server.get('/admin', (req, res) => {
      var tmpl = env.getTemplate('home.html').render({});
      res.send(tmpl);
    });

    server.get('/admin/gallery', (req, res) => {
      var tmpl = env.getTemplate('gallery.html').render({});
      res.send(tmpl);
    });

    server.get('/admin/list', (req, res) => {
      var tmpl = env.getTemplate('list.html').render({});
      res.send(tmpl);
    });

    server.get('/admin/edit', (req, res) => {
      var tmpl = env.getTemplate('edit.html').render({});
      res.send(tmpl);
    });
    return server
  }
};
