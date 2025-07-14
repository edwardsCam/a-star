const overlays = {
  path: 'cyan',
  start: 'green',
  goal: 'green',
  checked: 'yellow',
  considered: 'red',
}

export default function getBackgroundColor(tile) {
  if (tile.getCost() > 1) {
    return 'black'
  }
  if (tile.overlay === 'path') {
    return overlays.path
  }
  if (tile.considered && tile.overlay !== 'start') {
    return overlays.considered
  }
  if (tile.overlay) {
    return overlays[tile.overlay]
  }
  if (tile.checked) {
    return overlays.checked
  }
  const hex = Math.floor(Math.interpolate([1, 10], [255, 0], tile.getCost()))
  return `rgb(${hex}, ${hex}, ${hex})`
}
