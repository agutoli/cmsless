const fs = require('fs')
const path = require('path')
const express = require('express')
const lodashGet = require('lodash.get')

class ModuleManager {
  constructor(ctx) {
    this._ctx = ctx;
  }

  /**
   * It checks if plugin is activated 
   *
   * @returns {object}
   */
  register_routes(routes) {
    const router = express.Router()
    for (let route of routes) {
      router[route.method.toLowerCase()](route.path, (req, res) => {
        res.send(route.handler());
      })
    }
    return router;
  }

  /**
   * It checks if plugin is activated 
   *
   * @returns {object}
   */
  get_plugin_config() {
    return this._ctx.config.get('active_plugins')
  }

  /**
   * It checks if plugin is activated 
   *
   * @param {string} pluginSlug
   * @returns {boolean}
   */
  async is_plugin_active(pluginSlug) {
    const config = await this.get_plugin_config()
    return lodashGet(config, `value.${pluginSlug}.active`, false)
  }

  lookUp() {
    const pluginDir = path.resolve(path.join(__dirname, '../../admin/modules'))
    const plugins = fs.readdirSync(pluginDir);

    for (let pluginName of plugins) {
      const routes = path.resolve(path.join(pluginDir, pluginName, 'routes.js'))
      const manifest = path.resolve(path.join(pluginDir, pluginName, 'manifest.json'))
      if (fs.existsSync(manifest)) {
        try {
          const info = require(manifest);
          if (this.is_plugin_active(info.slug)) {
            console.log(pluginName, info)
            // const plgRoutes = require(routes);
            // this._ctx.server.use(this.register_routes(plgRoutes))
          }
        } catch(err) {
          console.log('plugin: can not load plugin '+ pluginName);
        }
      }
    }
  }
}

module.exports = ModuleManager;