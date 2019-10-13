import getBackgroundColor from 'utils/getBackgroundColor'

let showInfo = false

document.getElementById('showInfoBtn').onclick = () => showInfo = !showInfo

export default function drawSquare(r, c, tile, width, borderWidth) {
  const id = `r-${r}_c-${c}`
  let square = document.getElementById(id)
  if (!square) {
    square = document.createElement('span')
    square.setAttribute('id', id)
    square.style.height = square.style.width = `${width - borderWidth * 2}px`
    square.style.border = `${borderWidth}px solid black`
    square.style.gridRowStart = r + 1
    square.style.gridColumnStart = c + 1
    square.style.position = 'relative'
    document.getElementById('grid').appendChild(square)
  }
  square.style.background = getBackgroundColor(tile)
  drawStats(tile.bestKnownStats, square)
}

function drawStats(stats, square) {
  if (showInfo && stats.g) {
    const gStat = document.createElement('span')
    const hStat = document.createElement('span')
    const fStat = document.createElement('span')

    gStat.innerHTML = Math.floor(stats.g)
    hStat.innerHTML = stats.h.toFixed(1)
    fStat.innerHTML = (stats.g + stats.h).toFixed(1)

    gStat.style.fontSize = `${width / 4}px`
    hStat.style.fontSize = `${width / 4}px`
    fStat.style.fontSize = `${width / 4}px`

    gStat.style.position = 'absolute'
    hStat.style.position = 'absolute'
    fStat.style.position = 'absolute'

    gStat.style.left = '5px'
    gStat.style.top = '5px'

    hStat.style.right = '5px'
    hStat.style.top = '5px'

    fStat.style.left = `${width / 2 - 14}px`
    fStat.style.top = `${width / 2}px`

    square.appendChild(gStat)
    square.appendChild(hStat)
    square.appendChild(fStat)
  }
}
