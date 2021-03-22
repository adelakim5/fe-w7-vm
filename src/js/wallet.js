import Currency from './currency';

export default class Wallet {
  constructor({ target = null, balance = 0, values = [] }) {
    this.target = target;
    this.balance = balance;
    this.values = values;
    this.currencyList = [];
    this.init();
    // 1. 자판기 객체 의존성 주입이 필요
    // 2. 자기 자신에 대한 클릭 이벤트가 가능하게 self 필요.
  }
  init() {
    this.createCurrencyList();
    // this.render();
  }
  createCurrencyList() {
    this.currencyList = this.values.map(v => new Currency(v));
    this.randomDistributeCurrency(this.balance);
  }
  randomDistributeCurrency(balance) {
    while(balance > 0) {
      const randomCount = parseInt(Math.random() * this.currencyList.length);
      const target = this.currencyList[randomCount];
      if(target.value > balance) {
        continue;
      }
      balance -= target.value;
      target.addCount(1);
    }
  }
  updateBalance() {

  }
  render() {
    // console.log('렌더!');
  }
}