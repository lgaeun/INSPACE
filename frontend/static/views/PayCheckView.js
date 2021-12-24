import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";

const baseURL =
  "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle = "Paycheck Page";
    this.nav = new NavComponent();
  }

  getHtml() {
    return (
      this.nav.getHtml() +
      `<div class="pay-check-bg">
      <main class="pay-check-container">
        <div class="payment-box">
          <h2 class="pay-chekc-title">Check <br> the payment!</h2>
          <div class="total-price-box">
                <h1 class="total-price-box__title">총 결제금액:</h1>
                <h1 class="total-price-box__price">12,000원</h1>
              </div>
          <div id="toast"></div>
          <div class="info-payments">
            <li class="info-payment">성함<a>김민규</a></li>
            <li class="info-payment">결제금액<a>12,000원</a></li>
            <li class="info-payment">결제수단<a>카드결제</a></li>
            <li class="info-payment"><p>결제일시</p><a>2021.12.14 15:45</a></li>
          </div>
          <a href='/main' data-link><input type="button" value="확인" id="payment-Btn" /></a>
        </div>
      </main>
    </div>
    `
    );
  }

  defaultFunc() {
    this.nav.defaultFunc();

    const paycheckTitle = document.querySelector(".pay-chekc-title");
    const totalPrice = document.querySelector(".total-price-box__price");
    const totalPriceTitle = document.querySelector(".total-price-box__title");
    const infoPayment = document.getElementsByClassName("info-payment");
    const okBtn = document.querySelector("#payment-Btn");

    let userName = infoPayment[0].querySelector("a");
    let payedAmount = infoPayment[1].querySelector("a");
    let paysubtitle = infoPayment[3].querySelector("p");
    let payTime = infoPayment[3].querySelector("a");

    let now = new Date();
    let hour = now.getHours() === 0 ? "00" : now.getHours();
    let min = now.getMinutes() === 0 ? "00" : now.getMinutes();
    if (String(min).length === 1) min = "0" + min;

    userName.innerText = localStorage.getItem("name");
    payTime.innerText = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()} ${hour}:${min}`;

    const path = sessionStorage.getItem("path");

    if (path === "move" || path === "select") {
      paycheckTitle.innerHTML =
        path === "move"
          ? "Your Seat has been<br><br> Successfully Moved!"
          : "Your Seat has been<br><br> Successfully Selected!";
      paycheckTitle.style.fontSize = "1.5rem";
      totalPriceTitle.innerText = "현재 좌석:";
      totalPrice.innerText = sessionStorage.getItem("lastSelected");
      payedAmount.innerText = "0원";
      paysubtitle.innerText = "좌석변경일시";
    } else {
      const price = JSON.parse(localStorage.getItem("ticket")).price;
      console.log(price);
      totalPrice.innerText = price;
      payedAmount.innerText = price;
    }

    okBtn.addEventListener("click", () => {
      localStorage.removeItem("ticket");
      sessionStorage.clear();
    });

    // userName.innerText = userData.user
    // payTime.innerText = userData.time
  }
}
