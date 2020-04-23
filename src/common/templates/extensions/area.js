const nunjucks = require('nunjucks')

module.exports = function({ $core }) {
  const { module_areas } = $core.plugin;

  this.tags = ["extensible_area"];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    const body = parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, areaName, callback) {
    const area_id = `${context.ctx.moduleName}.${areaName}`;
    const plugins = module_areas[area_id] || [];
    callback(null, plugins.map(plugin => plugin($core)).join(''));
  };
};
