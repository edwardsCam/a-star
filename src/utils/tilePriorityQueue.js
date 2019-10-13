import PriorityQueue from 'utils/priorityQueue'

export default () =>
  new PriorityQueue((a, b) => {
    const aCost = a.g + a.h
    const bCost = b.g + b.h
    if (aCost == bCost) return a.h < b.h
    return aCost < bCost
  })
