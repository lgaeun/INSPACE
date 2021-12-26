import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import ticketHandler from "../js/handler/ticketHandler.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("INSPACE");
    this.obj = {};
    this.nav = new NavComponent();
  }

  getHtml() {
    return (
      this.nav.getHtml() +
      `<div class="ticket-bg">
      <main class="ticket-select">
        <h2>Ticket</h2>
        <section class="ticket-box">
          <article class="oneday-box">
            <h3>당일권</h3>
            <p>당일 내에 사용 가능하며 퇴실시 소멸됩니다.</p>
            <ul>
              <li class="oneday ticket" data-name="1" data-price="2,000">1시간권 : 2,000원</li>
              <li class="oneday ticket" data-name="4" data-price="6,000">4시간권 : 6,000원</li>
              <li class="oneday ticket" data-name="12" data-price="15,000">12시간권 : 15,000원</li>
              <li class="oneday ticket" data-name="24" data-price="25,000">24시간권 : 25,000원</li>
            </ul>
          </article>
          <div class="divider"></div>
          <article class="charge-box">
            <h3>충전권</h3>
            <p>시간 내에 사용 가능하며 퇴실시 유지됩니다.</p>
            <ul>
              <li>
                <li class="charge ticket" data-name="50" data-price="50,000">50시간권 : 50,000원</li>
                <li class="charge ticket" data-name="100" data-price="100,000">100시간권 : 100,000원</li>
              </li>
            </ul>
          </article>
        </section>
      </main>
      <div class="prev-btn-wrapper seat-view__nav">
          <a href="/main" data-link><button id="prev-btn">Prev</button></a>
        </div>
      <div class="next-btn-wrapper">
          <a href="/select" data-link><button id="next-btn" class="next-btn__disabled">Next</button></a>
        </div>
    </div>`
    );
  }

  defaultFunc() {
    this.nav.defaultFunc();

    const $tickets = document.querySelectorAll(".ticket");
    const $nextBtn = document.getElementById("next-btn");
    $nextBtn.disabled = true;

    const ID = localStorage.getItem("id");

    const $onedayTickets = document.querySelectorAll(".oneday");
    const $chargeTickets = document.querySelectorAll(".charge");

    fetch(
      // `http://localhost:5000/reservation/${ID}/ticket`
      `http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/reservation/ticket`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // 유저의 현재 사용하는 이용권이 충전권(charge)인 경우 충전권 버튼만 클릭 이벤트 활성화
        console.log(data);

        if (data.category === "savingupTime") {
          ticketHandler($chargeTickets);

          $onedayTickets.forEach((ticket) => {
            ticket.style.pointerEvents = "none";
            ticket.style.backgroundColor = "#b0b0b0a3";
          });
          // 유저의 현재 사용하는 이용권이 시간권(oneday)인 경우 시간권 버튼만 클릭 이벤트 활성화
        } else if (data.category === "oneday") {
          ticketHandler($onedayTickets);

          $chargeTickets.forEach((ticket) => {
            ticket.style.pointerEvents = "none";
            ticket.style.backgroundColor = "#b0b0b0a3";
          });
          // 처음 이용하는 유저인 경우 모든 버튼 활성화
        } else {
          ticketHandler($tickets);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
