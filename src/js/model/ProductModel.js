import Observable from "../Observable.js";
import Product from "./Product.js";

export default class ProductModel extends Observable {
  constructor() {
    super();
    this.productList = null;
  }

  // notify processView setViewAboutProduct
  updateCount(target) {
    this.notify({type : 'buy', target});
    target.setCount(-1);
  }

  setInitialData(data) {
    this.productList = data.map((e, i) => new Product(e, i));
  }

  // notify productView setView
  updateStatus(balance) {
    this.productList.forEach(target => {
      if(this.isStatusChange(target, balance)) {
        target.toggleStatus();
        this.notify({ target });
      }
    });
  }

  isStatusChange(target, balance) {
    return (target.status && (target.price > balance || !target.count))
        || (!target.status && target.price <= balance && target.count > 0)
  }
}
