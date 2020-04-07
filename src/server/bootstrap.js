const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')

const Config = require('../common/libraries/Config')
const ModuleManager = require('../common/libraries/ModuleManager')
const PluginManager = require('../common/libraries/PluginManager')

class Boostrap {
  constructor(server) {
    
    this.server = server;
    this.config = new Config(this);
    this.module = new ModuleManager(this);
    // load plugins at end
    this.plugin = new PluginManager(this);
  }
}

module.exports = {
  init: () => {
    const server = express()
    
    const env = nunjucks.configure(path.join(__dirname, '../templates'), {
      autoescape: false,
      express: server
    });
    
    const StaticTag = require('../templates/helpers/static')
    const ModuleTag = require('../templates/helpers/module')

    const boot = new Boostrap(server);

    env.addExtension('static', new StaticTag())
    env.addExtension('module', new ModuleTag(boot.module.lookUp()))

    boot.plugin.lookUp();

    server.get('/', (req, res) => {
      var tmpl = env.getTemplate('index.html').render({});
      res.send(tmpl);
    });

    return server
  }
};