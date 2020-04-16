const fs = require('fs')
const path = require('path')
const express = require('express')
const lodashGet = require('lodash.get')
const nunjucks = require('nunjucks')

const AreaTmplExtension = require('../templates/extensions/area')

const Core = require('./Core')
const Module = require('./Module')

class ModuleManager extends Core {
  constructor(stack) {
    super(stack)
    this.registered = {};
  }

  lookUp() {
    const modulesDir = path.resolve(path.join(__dirname, '../../admin/modules'))
    const modules = fs.readdirSync(modulesDir);

    for (let moduleName of modules) {
      const moduleDir = path.resolve(path.join(modulesDir, moduleName))
      const manifest = path.join(moduleDir, 'manifest.json')
      const templates = path.join(moduleDir, 'templates')

      const templ = nunjucks.configure(templates, {
        autoescape: false
      });

      templ.addExtension('AreaExtension', new AreaTmplExtension(this));

      if (fs.existsSync(manifest)) {
        try {
          const info = require(manifest);
          const entry = require(path.join(modulesDir, moduleName));

          const res = entry(this.mergeContext({
            $module: new Module(this, {
              info,
              entry,
              moduleDir,
              modulesDir
            })
          }))
        
          this.registered[moduleName] = res.render(templ).render({ moduleName });
          console.log('-> loaded:', moduleName);
        } catch(err) {
          console.log(err)
          console.log('** plugin: can not load plugin '+ modulesDir);
        }
      }
    }
    return this.registered;
  }
}

module.exports = ModuleManager;