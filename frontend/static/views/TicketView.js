import AbstractView from "./AbstractView.js";

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
              <li class="oneday ticket"><a>1시간권 : 2,000원</a></li>
              <li class="oneday ticket"><a>4시간권 : 6,000원</a></li>
              <li class="oneday ticket"><a>12시간권 : 15,000원</a></li>
              <li class="oneday ticket"><a>24시간권 : 25,000원</a></li>
            </ul>
          </article>
          <article class="charge-box">
            <h3>충전권</h3>
            <p>시간 내에 사용 가능하며 퇴실시 유지됩니다.</p>
            <ul>
              <li>
                <li class="charge ticket"><a>50시간권 : 50,000원</a></li>
                <li class="charge ticket"><a>100시간권 : 100,000원</a></li>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>`;
  }

  async defaultFunc() {}
}
