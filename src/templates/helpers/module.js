const nunjucks = require('nunjucks')

module.exports = function(items) {
  this.tags = ["module"];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, moduleName, callback) {
    const html = '<div class="module-edition">' + items[moduleName] + '</div class="module-edition">';
    callback(null, html);
  };
};
