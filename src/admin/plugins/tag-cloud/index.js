module.exports = {
  /**
   * Render areas which will be preloaded
   * before modules
   */
  render_areas: {
    "sidebar.outside_before": () => '<div class="sidebar-tag-cloud">',
    "sidebar.outside_after": () => '</div>',
  }
}
