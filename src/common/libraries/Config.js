const lodashGet = require('lodash.get')

class ConfigManager {
  constructor(ctx) {
    this._ctx = ctx
  }
  get(optionName) {
    const db = require('./_db.json');
    return db.options.find(x => x.name === optionName);
  }
}

module.exports = ConfigManager;