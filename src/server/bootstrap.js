const app = require('./app')

const Config = require('../common/libraries/Config')
const Module = require('../common/libraries/Module')
const Plugin = require('../common/libraries/Plugin')

class Boostrap {
  constructor() {
    this.config = new Config(this);
    this.module = new Module(this);

    // load plugins at end
    this.plugin = new Plugin(this);
  }
}

module.exports = {
  init: () => {
    const boot = new Boostrap();

    boot.module.lookUp();
    boot.plugin.lookUp();

    return app
  }
};