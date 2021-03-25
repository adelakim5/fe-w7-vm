import Currency from "./Currency.js";
import { _, INITNUM } from "./utils.js";

export default class WalletView {
  constructor(view, manager) {
    this.view = view;
    this.manager = manager;
    this.balanceHtml = null;
  }

  init() {
    this.render();
    this.clickCurrency();
  }

  render() {
    const template = (unit, count) => {
      return /*html*/ `
          <li class="currency">
            <div class="currency__unit" data-value="${unit}">${unit}원</div>
            <div class="currency__count" >${count}개</div>
          </li>
          `;
    };
    const templateBottom = () => {
      return /*html*/ `
            <li class="balance">
              <p>${this.balance}</p>
              <span>원</span>
            </li>
            `;
    };
    this.view.innerHTML = this.currencies.reduce((acc, val) => acc + template(val.value, val.count), `<ul class="currencies">`) + templateBottom() + `</ul>`;
    const currencyAll = _.$$(".currency", this.view);
    this.currencies.forEach((e, i) => {
      e.setSelf(currencyAll[i]);
    });
    this.balanceHtml = _.$(".balance", this.view);
  }

  clickCurrency() {
    // 화폐 클릭 이벤트
    this.view.addEventListener("click", ({ target }) => {
      if (!target.classList.contains("currency__unit")) return;
      const sameCurrency = this.currencies.find((curr) => curr.value === Number(target.dataset.value));
      if (sameCurrency.count > 0) {
        this.manager.inputCurrency(target.dataset.value);
        sameCurrency.setCount(-1);
        target.parentNode.lastElementChild.innerText = `${sameCurrency.count}개`;
        this.updateBalance(-1 * sameCurrency.value);
      }
    });
  }

  updateBalance() {
    this.balanceHtml.firstElementChild.innerText = this.balance;
    this.currencies.forEach((e) => (e.self.lastElementChild.innerText = `${e.count}개`));
  }

  addChange(balance) {
    // this.currencies is added
    this.returnCurrency(balance);
    this.updateBalance(balance);
  }

  returnCurrency(balance) {
    this.currencies.reduceRight((arr, cur) => {
      const cnt = parseInt(balance / cur.value);
      if (cnt) {
        balance -= cur.value * cnt;
        cur.count += cnt;
      }
      //   return arr.push(cnt) && arr;
    });
  }
}
