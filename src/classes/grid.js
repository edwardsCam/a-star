import Tile from 'classes/tile'

export default class Grid {
  constructor({ size } = {}) {
    this.rows = []

    for (let r = 0; r < size; r++) {
      this.rows.push([])
      for (let c = 0; c < size; c++) {
        this.rows[r].push(new Tile())
      }
    }
  }

  getTileAt(r, c) {
    return this.rows[r][c]
  }

  forEach(cb) {
    this.rows.forEach((row, r) => {
      row.forEach((tile, c) => {
        cb(r, c, tile)
      })
    })
  }

  mark(pos, mark) {
    const [r, c] = pos
    const tile = this.rows[r][c]
    if (typeof mark === 'string') {
      if (mark === 'considered') {
        tile.consider()
      } else if (mark === 'checked') {
        tile.check()
        tile.setOverlay('checked')
      } else {
        tile.setOverlay(mark)
      }
    } else {
      tile.setCost(mark)
    }
  }
}
