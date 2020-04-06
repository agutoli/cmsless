const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')

const Config = require('../common/libraries/Config')
const Module = require('../common/libraries/Module')
const Plugin = require('../common/libraries/Plugin')

class Boostrap {
  constructor(server) {
    
    this.server = server;
    this.config = new Config(this);
    this.module = new Module(this);

    // load plugins at end
    this.plugin = new Plugin(this);
  }
}

module.exports = {
  init: () => {
    const server = express()
    
    const env = nunjucks.configure(path.join(__dirname, '../templates'), {
      autoescape: true,
      express: server
    });

    const StaticTag = require('../templates/helpers/static')

    env.addExtension('static', new StaticTag())

    const boot = new Boostrap(server);

    boot.module.lookUp();
    boot.plugin.lookUp();

    server.get('/', (req, res) => {
      var tmpl = env.getTemplate('index.html').render({test: 123});
      res.send(tmpl);
    });

    return server
  }
};