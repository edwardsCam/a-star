const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

export default class PriorityQueue {
  constructor(comparator) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

/*
export default function PriorityQueue(isHigherPriority) {
  const dat = []

  this.push = function(item) {
    if (!item) return
    dat.push(item)
    bubbleUp()
  }
  this.pop = function() {
    if (!this.has()) return null
    const ret = dat.shift()
    bubbleDown()
    return ret
  }
  this.peek = function() {
    return dat[0]
  }
  this.has = function() {
    return dat.length > 0
  }

  function bubbleUp() {
    let i = dat.length - 1
    while (i > 0) {
      const j = i >>> 1
      if (_isHigherPriority(i, j)) {
        swap(i, j)
        i = j
      } else break
    }
  }

  function bubbleDown() {
    let i = 0
    const last = dat.length - 1
    while (true) {
      const left = (i << 1) + 1
      const right = left + 1
      let min = i
      if (left <= last && _isHigherPriority(left, min)) {
        min = left
      }
      if (right <= last && _isHigherPriority(right, min)) {
        min = right
      }
      if (i === min) {
        break
      } else {
        swap(i, min)
        i = min
      }
    }
  }

  function swap(i1, i2) {
    const tmp = dat[i1]
    dat[i1] = dat[i2]
    dat[i2] = tmp
  }

  const _isHigherPriority = (i1, i2) => isHigherPriority(dat[i1], dat[i2])
}
*/
