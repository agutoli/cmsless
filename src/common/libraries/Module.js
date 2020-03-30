const fs = require('fs')
const path = require('path');

module.exports = function() {
  const pluginDir = path.resolve(path.join(__dirname, '../../plugins'))
  const plugins = fs.readdirSync(pluginDir);
  return {
    lookUp: function() {
    //   for (let folder of plugins) {
    //     const manifest = path.resolve(path.join(pluginDir, folder, 'manifest.json'))
    //     if (fs.existsSync(manifest)) {
    //       try {
    //         const info = require(manifest);
    //       } catch(err) {
    //         console.log('plugin: can not load plugin '+ folder);
    //       }
    //     }
    //   }
    }
  }
}