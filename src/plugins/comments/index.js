function install() {
  console.log('install!');
}

function uninstall() {
  console.log('uninstall!');
}

function the_footer() {
  return 'my footer';
}

module.exports = function (ctx, plugin) {

  // hooks
  plugin.register_hook('install', install);
  plugin.register_hook('uninstall', uninstall);

  plugin.add_action('the_footer', the_footer);
};