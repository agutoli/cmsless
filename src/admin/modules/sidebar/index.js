function install() {
  console.log('install!');
}

function uninstall() {
  console.log('uninstall!');
}

module.exports = function (ctx, plugin) {

  // hooks
  plugin.register_hook('install', install);
  plugin.register_hook('uninstall', uninstall);

  return {};
};