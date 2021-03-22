export default class Currency {
  constructor(value = 0, count = 0) {
    this.value = value;
    this.count = count;
  }
  isEmpty() {
    return this.count === 0;
  }
  setCount(count) {
    this.count = count;
  }
  addCount(count) {
    this.count += count;
  }
}