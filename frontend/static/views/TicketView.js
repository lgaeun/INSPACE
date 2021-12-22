import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import userData from "../js/data.js";
// import e from "express";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("INSPACE");
    this.obj = {};
  }

  getHtml() {
    return (
      NavComponent() +
      `<div class="ticket-bg">
      <main class="ticket-select">
        <h2>Ticket</h2>
        <section class="ticket-box">
          <article class="oneday-box">
            <h3>당일권</h3>
            <p>당일 내에 사용 가능하며 퇴실시 소멸됩니다.</p>
            <ul>
              <li class="oneday ticket" data-name="1">1시간권 : 2,000원</li>
              <li class="oneday ticket" data-name="4">4시간권 : 6,000원</li>
              <li class="oneday ticket" data-name="12">12시간권 : 15,000원</li>
              <li class="oneday ticket" data-name="24">24시간권 : 25,000원</li>
            </ul>
          </article>
          <div class="divider"></div>
          <article class="charge-box">
            <h3>충전권</h3>
            <p>시간 내에 사용 가능하며 퇴실시 유지됩니다.</p>
            <ul>
              <li>
                <li class="charge ticket" data-name="50">50시간권 : 50,000원</li>
                <li class="charge ticket" data-name="100">100시간권 : 100,000원</li>
              </li>
            </ul>
          </article>
        </section>
      </main>
      <div class="next-btn-wrapper">
          <a href="/select" data-link><button id="next-btn">Next</button></a>
        </div>
    </div>`
    );
  }

  defaultFunc() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    document.getElementById("root").appendChild(script);

    const $tickets = document.querySelectorAll(".ticket");

    $tickets.forEach((ticket) => {
      // ticket 클릭이벤트
      ticket.onclick = (e) => {
        const selectedTime = Number(ticket.dataset.name);

        const userAuth =
          e.target.className === "charge ticket" ? "charge" : "oneday";
        // 클릭시 버튼 눌림 효과 CSS적용
        e.target.style =
          "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;";

        // 이벤트 타깃이 아닌 버튼 이벤트 초기화
        $tickets.forEach((ticket) => {
          if (ticket !== e.target) {
            ticket.style = "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;";
          }
        });
        // 티켓데이터
        const ticketData = objectFunc();
        // localStorage에 추가
        sessionStorage.setItem("ticket", JSON.stringify(ticketData));
        //티켓데이터 obj생성함수
        function objectFunc() {
          return {
            time: selectedTime,
            auth: userAuth,
            history: `${sessionStorage.getItem("history")}`,
          };
        }
      };
    });
  }
}
