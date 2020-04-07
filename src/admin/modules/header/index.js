module.exports = ({ $core, $module }) => {
  // areas in that module which you can render a plugin
  $module.add_extensible_areas([ 'before', 'inner', 'after' ]);

  $module.on("init", () => {
    console.log('init....')
  });

  $module.on("after", () => {
    console.log('after....')
  });

  // fetch all users
  // const users = await $core.db.query({ type:  'user' }).fetchAll();
  return {
    render: ($tmpl) => {
      return $tmpl.getTemplate('sidebar.html');
    }
  }
};