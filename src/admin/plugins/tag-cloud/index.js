function MyButtonRender() {
  return `
    <div>
      <button>Tag of clouds</button>
    </div>
  `
}

module.exports = {
  /**
   * Render areas which will be preloaded
   * before modules
   */
  render_areas: {
    "sidebar.outside_before": MyButtonRender
  }
}
