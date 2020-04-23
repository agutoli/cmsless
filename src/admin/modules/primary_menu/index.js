module.exports = ({ $core, $module }) => {
  // fetch all users
  // const users = await $core.db.query({ type:  'user' }).fetchAll();
  return {
    render: ($tmpl) => {
      return $tmpl.getTemplate('primary_menu.html');
    }
  }
};
