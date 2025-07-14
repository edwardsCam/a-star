const validOverlays = ['path', 'start', 'goal', 'checked', 'considered']

export default class Tile {
  #cost

  constructor() {
    this.reset()
  }

  setCost(cost) {
    this.cost = cost
  }

  getCost() {
    return this.cost
  }

  setOverlay(overlay) {
    if (validOverlays.includes(overlay)) {
      this.overlay = overlay
    } else {
      alert(`Invalid overlay: ${overlay}`)
    }
  }

  clearOverlays() {
    this.overlay = null
  }

  consider() {
    this.considered = true
  }

  check() {
    this.checked = true
  }

  updateStats(g, h) {
    const { bestKnownStats } = this
    if (bestKnownStats.g == null || g < bestKnownStats.g) {
      this.bestKnownStats.g = g
    }
    if (bestKnownStats.h == null || h < bestKnownStats.h) {
      this.bestKnownStats.h = h
    }
  }

  reset() {
    this.overlay = null
    this.considered = false
    this.checked = false
    this.bestKnownStats = {}
    this.setCost(1)
  }
}
