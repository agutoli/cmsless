class Plugin {
  register_hook(hook, func) {
    func();
  }
}

module.exports = Plugin