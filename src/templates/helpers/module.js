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
    // let ret = new nunjucks.runtime.SafeString(moduleName);
    callback(null, items[moduleName]);
  };
};