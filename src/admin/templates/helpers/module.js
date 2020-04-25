const nunjucks = require('nunjucks')

module.exports = function(ctx) {
  this.tags = ["module"];

  const items = ctx.module.lookUp();

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, moduleName, callback) {
    callback(null, items[moduleName]);
  };
};
