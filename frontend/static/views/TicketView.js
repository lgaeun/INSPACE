import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import userData from "../js/data.js";
// import e from "express";

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

    $tickets.forEach((ticket) => {
      // ticket 클릭이벤트
      ticket.onclick = (e) => {
        const selectedTime = Number(ticket.dataset.name);
        const selectedPrice = ticket.dataset.price;

        const userAuth =
          e.target.className === "charge ticket" ? "charge" : "oneday";
        // 클릭시 버튼 눌림 효과 CSS적용
        // e.target.style = `color: black;
        //   box-shadow: 0 0 0 2px #000 inset;
        //   background-color: white;
        //   transition: 0.5s`;

        const $selected = document.querySelector(".ticket__selected");
        if ($selected) {
          $selected.classList.remove("ticket__selected");
        }

        if (e.target != $selected) {
          e.target.classList.add("ticket__selected");

          $nextBtn.disabled = false;
          $nextBtn.classList.remove("next-btn__disabled");
          $nextBtn.classList.add("next-btn__abled");
        } else {
          $nextBtn.disabled = true;
          $nextBtn.classList.add("next-btn__disabled");
          $nextBtn.classList.remove("next-btn__abled");
        }

        // 이벤트 타깃이 아닌 버튼 이벤트 초기화
        $tickets.forEach((ticket) => {
          if (ticket !== e.target) {
            ticket.style = "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;";
          }
        });
        // 티켓데이터
        const ticketData = objectFunc();
        // localStorage에 추가
        localStorage.setItem("ticket", JSON.stringify(ticketData));
        //티켓데이터 obj생성함수
        function objectFunc() {
          return {
            time: selectedTime,
            auth: userAuth,
            history: `${sessionStorage.getItem("history")}`,
            price: selectedPrice,
          };
        }
      };
    });
  }
}
