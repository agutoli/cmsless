const nunjucks = require('nunjucks')

module.exports = function(instance) {
  this.tags = ["extensible_area"];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    const body = parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, stringArg, callback) {
    let ret = new nunjucks.runtime.SafeString('<b>'+stringArg+'</b>');
    callback(null, ret);
  };
};