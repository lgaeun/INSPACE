import AbstractView from "./AbstractView.js";
import userData from "../js/data.js";
// import e from "express";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("INSPACE");
  }
  async getHtml() {
    return `<body>
    <div class="bg">
      <main class="ticket-select">
        <h2>이용권 선택</h2>
        <section class="ticket-box">
          <article class="oneday-box">
            <h3>당일권</h3>
            <p>당일 내에 사용 가능하며 퇴실시 소멸됩니다.</p>
            <ul>
              <li class="oneday ticket" data-name="1hour">1시간권 : 2,000원</li>
              <li class="oneday ticket" data-name="4hour">4시간권 : 6,000원</li>
              <li class="oneday ticket" data-name="12hour">12시간권 : 15,000원</li>
              <li class="oneday ticket" data-name="24hour">24시간권 : 25,000원</li>
            </ul>
          </article>
          <article class="charge-box">
            <h3>충전권</h3>
            <p>시간 내에 사용 가능하며 퇴실시 유지됩니다.</p>
            <ul>
              <li>
                <li class="charge ticket" data-name="50hour">50시간권 : 50,000원</li>
                <li class="charge ticket" data-name="100hour">100시간권 : 100,000원</li>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>`;
  }

  async defaultFunc() {
    const $tickets = document.querySelectorAll(".ticket");

    $tickets.forEach((ticket) => {
      ticket.onclick = (e) => {
        console.log(ticket.dataset.name);
        e.target.style =
          "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;";
        console.log(e);
        if (!e.target) {
          ticket.style = "box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;";
        }
      };
    });
  }
}
