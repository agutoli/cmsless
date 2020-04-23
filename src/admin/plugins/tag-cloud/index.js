function MyButtonRender() {
  return `
    <div>
      <button>Teste</button>
    </div>
  `
}

module.exports = ({ $core, $plugin }) => {
  // registers
  $core.add_render_area('sidebar.outside_before', MyButtonRender);
  $core.add_render_area('bottom.inside_before', MyButtonRender);

  return {}
};
