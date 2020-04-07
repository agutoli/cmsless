class Core {
  constructor(stack) {
    this.$core = stack;
  }

  mergeContext(ctx) {
    return {
      ...this,
      ...ctx
    };
  }
}

module.exports = Core;