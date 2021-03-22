export default class Product {
  constructor({ name = '', price = 0, count = 0 }) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  isEmpty() {
    return this.count === 0;
  } 
  setCount(count) {
    this.count += count;
  }
}