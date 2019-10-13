function interpolate(domain, range, value) {
  const x1 = domain[0]
  const x2 = domain[1]
  const y1 = range[0]
  const y2 = range[1]
  const min = Math.min(y1, y2)
  const max = Math.max(y1, y2)
  const result = y1 + ((y2 - y1) * (value - x1)) / (x2 - x1)
  return Math.clamp(min, max, result)
}

function clamp(min, max, value) {
  if (value <= min) {
    return min
  } else if (value >= max) {
    return max
  } else {
    return value
  }
}

function distance(p1, p2) {
  const dy = p2[1] - p1[1]
  const dx = p2[0] - p1[0]
  return Math.sqrt(dy * dy + dx * dx)
}

Math.interpolate = interpolate
Math.clamp = clamp
Math.distance = distance
