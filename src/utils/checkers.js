import { N } from '../constants'

const checkRight = ([r, c]) => ({
  nextR: r,
  nextC: c + 1,
  skip: c >= N - 1,
})
const checkBottom = ([r, c]) => ({
  nextR: r + 1,
  nextC: c,
  skip: r >= N - 1,
})
const checkLeft = ([r, c]) => ({
  nextR: r,
  nextC: c - 1,
  skip: c <= 0,
})
const checkTop = ([r, c]) => ({
  nextR: r - 1,
  nextC: c,
  skip: r <= 0,
})

export default {
  0: checkRight,
  1: checkBottom,
  2: checkLeft,
  3: checkTop,
}
