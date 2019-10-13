export default class Cursor {
  constructor({ pos, g, h, prev } = {}) {
    this.pos = pos || null
    this.g = g || 0
    this.h = h || 0
    this.prev = prev || null
  }
}
