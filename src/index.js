import 'utils/math'
import Grid from 'classes/grid'
import Tile from 'classes/tile'
import Cursor from 'classes/cursor'
import checkers from 'utils/checkers'
import drawSquare from 'utils/drawSquare'
import tilePriorityQueue from 'utils/tilePriorityQueue'
import { toggleShowInfo } from 'utils/ui'
import { N, SIZE, DELAY } from './constants'

let walls = [
  [0, 5],
  [1, 13],
  [1, 5],
  [10, 10],
  [10, 13],
  [10, 8],
  [11, 13],
  [11, 5],
  [11, 8],
  [12, 10],
  [12, 11],
  [12, 12],
  [12, 13],
  [12, 16],
  [12, 8],
  [12, 9],
  [13, 16],
  [13, 6],
  [14, 16],
  [15, 11],
  [15, 12],
  [15, 13],
  [15, 14],
  [15, 15],
  [15, 16],
  [15, 5],
  [16, 11],
  [17, 11],
  [18, 10],
  [18, 11],
  [18, 15],
  [18, 7],
  [18, 8],
  [18, 9],
  [19, 15],
  [2, 0],
  [2, 1],
  [2, 13],
  [2, 2],
  [2, 5],
  [3, 13],
  [3, 5],
  [3, 7],
  [3, 8],
  [4, 13],
  [4, 5],
  [4, 8],
  [5, 13],
  [5, 5],
  [5, 8],
  [6, 1],
  [6, 13],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [6, 8],
  [7, 11],
  [7, 13],
  [7, 8],
  [8, 10],
  [8, 11],
  [8, 13],
  [8, 8],
  [8, 9],
  [9, 10],
  [9, 13],
  [9, 6],
  [9, 8],
]

const startPosition = [0, 0]
const goalPosition = [19, 19]

let q
let grid
let cursor
let done = false
let isPaused = false
let isPlacing = false
let mod = 0

const primaryActionBtn = document.getElementById('primaryActionBtn')
const showInfoBtn = document.getElementById('showInfoBtn')
const customBtn = document.getElementById('customBtn')
showInfoBtn.onclick = () => {
  if (toggleShowInfo()) {
    showInfoBtn.innerHTML = 'Hide Info'
  } else {
    showInfoBtn.innerHTML = 'Show Info'
  }
  drawAll()
}

customBtn.onclick = () => {
  isPlacing = true
  customBtn.disabled = true
  walls = []
  init()

  grid.forEach((r, c, tile) => {
    const pos = [r, c]
    document.getElementById(`r-${r}_c-${c}`).onclick = () => {
      grid.mark(pos, 99)
      walls.push(pos)
      draw(pos)
    }
  })
}

init()

function init() {
  primaryActionBtn.innerHTML = 'Start'
  primaryActionBtn.onclick = start
  cursor = new Cursor({
    pos: startPosition,
    h: Math.distance(startPosition, goalPosition),
  })
  grid = new Grid({ size: N })
  q = tilePriorityQueue()
  q.push(cursor)
  const gridElement = document.getElementById('grid')
  gridElement.style.width = gridElement.style.height = `${SIZE}px`
  grid.mark(startPosition, 'checked')
  grid.mark(startPosition, 'considered')
  grid.mark(startPosition, 'start')
  grid.mark(goalPosition, 'goal')
  walls.forEach(wall => grid.mark(wall, 99))

  drawAll()
}

function start() {
  done = false
  isPlacing = true
  customBtn.disabled = false
  grid.forEach((r, c, tile) => {
    document.getElementById(`r-${r}_c-${c}`).onclick = undefined
  })
  primaryActionBtn.innerHTML = 'Pause'
  primaryActionBtn.onclick = () => {
    isPaused = !isPaused
    if (isPaused) {
      primaryActionBtn.innerHTML = 'Resume'
    } else {
      primaryActionBtn.innerHTML = 'Pause'
    }
  }
  doWork()
}

function finish() {
  markPath(getShortestPath())
  primaryActionBtn.innerHTML = 'Clear'
  primaryActionBtn.onclick = () => init()
}

function doWork() {
  if (isPaused) {
    requestAnimationFrame(doWork)
    return
  }
  if (done) {
    finish()
    return
  }
  if (mod === 0) {
    cursor = q.pop()
    if (
      cursor.pos[0] !== startPosition[0] ||
      cursor.pos[1] !== startPosition[1]
    ) {
      mark(cursor.pos, 'considered')
    }
    document.getElementById('cursor-pos').innerHTML = `[ ${cursor.pos[0]}, ${
      cursor.pos[1]
    } ]`
    document.getElementById('cursor-g').innerHTML = `g: ${cursor.g}`
    document.getElementById('cursor-h').innerHTML = `h: ${cursor.h.toFixed(2)}`
    document.getElementById('cursor-f').innerHTML = `f: ${(
      cursor.g + cursor.h
    ).toFixed(2)}`
  }
  if (!cursor) {
    done = true
    return
  }
  const { nextR, nextC, skip } = checkers[mod](cursor.pos)
  mod = ++mod % 4
  if (!skip) {
    const nextTile = grid.getTileAt(nextR, nextC)
    if (!nextTile.considered) {
      checkTile(nextR, nextC, nextTile)
      setTimeout(doWork, DELAY)
      return
    }
  }
  setTimeout(doWork)
}

function getShortestPath() {
  const result = []
  result.push(cursor)
  let prev = cursor.prev
  while (prev) {
    result.push(prev)
    prev = prev.prev
  }
  return result.reverse()
}

function markPath(path) {
  onPath(tile => grid.getTileAt(...tile.pos).clearOverlays())
  onPath(tile => mark(tile.pos, 'path'))

  function onPath(cb) {
    path.forEach((tile, i) => {
      if (i !== 0) {
        cb(tile)
      }
    })
  }
}

function mark(pos, val) {
  grid.mark(pos, val)
  draw(pos)
}

function checkTile(r, c, tile) {
  if (r === goalPosition[0] && c === goalPosition[1]) {
    done = true
    return
  }
  const pos = [r, c]
  const g = cursor.g + tile.cost
  const h = Math.distance(pos, goalPosition)
  tile.updateStats(g, h)

  const alreadyChecked = tile.checked
  if (!alreadyChecked) {
    mark([r, c], 'checked')
    const newCursor = new Cursor({
      pos,
      prev: cursor,
      g,
      h,
    })
    q.push(newCursor)
  }
}

function draw([r, c]) {
  drawSquare(r, c, grid.getTileAt(r, c))
}

function drawAll() {
  document.getElementById('grid').innerHTML = ''
  grid.forEach(drawSquare)
}
