const path = require('path')
const nunjucks = require('nunjucks')

module.exports = function(ctx) {
  const { STATIC_URL } = ctx.settings;
  this.tags = ["static"];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, "run", args);
  };

  this.run = function(context, stringArg, callback) {
    if (process.env.STAGE !== 'dev') {
      return callback(null, path.join(STATIC_URL, stringArg));
    }
    callback(null, path.join('/dev', STATIC_URL, stringArg));
  };
};
