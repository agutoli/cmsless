const nunjucks = require('nunjucks')

module.exports = function() {
  this.tags = ["static"];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, myStringArg, callback) {
    console.log(myStringArg);
    let ret = new nunjucks.runtime.SafeString(myStringArg);
    callback(null, ret);
  };
};