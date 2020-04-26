const fs = require('fs')
const path = require('path')
const express = require('express')
const lodashGet = require('lodash.get')

class PluginManager {
  constructor(ctx) {
    this._ctx = ctx;

    this.module_areas = {}
  }

  register_modules_areas(areaName, render, opts) {
    if (!this.module_areas[areaName]) {
      this.module_areas[areaName] = [];
    }
    this.module_areas[areaName].push({ render, opts });
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

  load_plugin_options(pluginEntry) {
    const configFile = path.join(pluginEntry, 'options.js');
    if (fs.existsSync(configFile)) {
      return require(configFile);
    }
    return () => {};
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
    const pluginDir = path.resolve(path.join(__dirname, '../../admin/plugins'))
    const plugins = fs.readdirSync(pluginDir);
    for (let pluginName of plugins) {
      const pluginEntry = path.resolve(path.join(pluginDir, pluginName));

      // load plugins options
      const optionsRender = this.load_plugin_options(pluginEntry);
      const pluginManifest = path.join(pluginEntry, 'plugin.json');

      if (fs.existsSync(pluginManifest)) {
        try {
          const info = require(pluginManifest);
          const pluginModule = require(pluginEntry);
          const { render_areas } = pluginModule;

          for (let area in render_areas) {
            this.register_modules_areas(area, render_areas[area], {
              info,
              optionsRender
            });
          }
        } catch(err) {
          console.log(err);
          console.log('plugin: can not load plugin '+ pluginName);
        }
      }
    }
  }
}

module.exports = PluginManager;
