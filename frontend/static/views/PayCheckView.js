export default class {
  constructor(params) {
    this.setTitle = "Paycheck Page";
  }

  getHtml() {
    return `
    <div class="bg">
      <main class="container">
        <div class="payment-box">
          <h2>결제내역</h2>
          <div class="total-price-box">이용정보: <a> 시간권 4시간</a></div>
          <div class="info-payments">
            <li class="info-payment">성함<a>김민규</a></li>
            <li class="info-payment">결제금액<a>12,000원</a></li>
            <li class="info-payment">결제수단<a>카드결제</a></li>
            <li class="info-payment">결제일시<a>2021.12.14 15:45</a></li>
          </div>
          <a href='/main' data-link><input type="button" value="확인" id="payment-Btn" /></a>
        </div>
      </main>
    </div>
    `;
  }

  defaultFunc() {}
}
