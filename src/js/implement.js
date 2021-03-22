import { products } from './products.json';
import Currency from './currency';
import Product from './product';
import Wallet from './wallet';

const TYPES = [10, 50, 100, 500, 1000, 5000, 10000];

const productList = products.map(v => new Product(v));

const returnCurrency = balance => {
  return TYPES.reduceRight((arr, cur) => {
    const cnt = parseInt(balance / cur); 
    balance -= cur * cnt;
    return arr.push(cnt) && arr;
  }, []).reverse();
}

const buyingProduct = (product, balance) => {
  if(product.isEmpty()) return console.log('매진 :(');
  if(balance < product.price) return console.log('잔액 부족 :(');
  product.setCount(-1);
  return updateBalance(balance, product);
};

const updateBalance = (balance, product) => balance - product.price;

const testFirst = () => {
  console.log('------------------------------');
  console.log('10 ~ 10,000원의 개수를 구하는 함수');
  for(let i = 0; i < 5; i++) {
    const balance = getRandom();
    const result = returnCurrency(balance);
    const str = `금액 : ${balance}원\r\n` + TYPES.reduceRight((acc, cur, idx) => {
      return acc + (result[idx] > 0 ? `${cur}원 : ${result[idx]}개\r\n` : '');
    }, '');
    console.log(str);
  }
  console.log('------------------------------');
}

const testSecond = () => {
  console.log('잔액이 줄어들게 하는 함수');
  let balance = 150000;
  while(balance > 100000) {
    const product = productList[parseInt(Math.random() * productList.length)];
    const count = product.count;
    balance = buyingProduct(product, balance);
    console.log(`구매 상품 : ${product.name}, 재고 변화 : ${count} -> ${product.count}`);
    console.log(`구매 후 잔액 : ${balance}`);
  }
  console.log('------------------------------');
}

const testThird = () => {
  const wallet = new Wallet({ type : null, balance : 100000, values: TYPES });
  console.log('지갑 현재 상태');
  const result = wallet.currencyList.reduceRight((acc, cur) => acc += `${cur.value}원 : ${cur.count}개\r\n`, '');
  console.log(result);
  console.log('------------------------------');
}

const getRandom = () => parseInt((Math.random().toFixed(2) * 10000) + 1000);

testFirst();
testSecond();
testThird();

