import AbstractView from "./AbstractView.js";
import initSeats from "../js/seat-selection/seat-selection.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("좌석 선택");
  }
  getHtml() {
    return `
      <div class="bg" id="bg">
      <div class="seat-container-border">
        <div class="seat-container" id="seat-container">
          <section class="seat-detail">
            <!-- 결제정보, 좌석 정보 -->
            <div class="payment-box">
              <h2>
                선택한 좌석:
                <p></p>
              </h2>
              <div class="total-price-box">총 결제금액: <a> 12,000원</a></div>
              <div class="info-payments">
                <li class="info-payment">이용권정보<a>시간권</a></li>
                <li class="info-payment">이용시간<a>4시간</a></li>
                <li class="info-payment">결제수단<a>카드결제</a></li>
              </div>
              <input type="button" value="결제하기" id="payment-Btn" />
            </div>
          </section>

          <main class="seat-view">
            <nav class="seat-view__nav">
              <a href="/main" data-link>
              <button type="button" class="btn btn-primary">
                <div class="plus-icon">
                  <img src="/static/assets/svg/arrow-left.svg" />
                </div>
                <div class="select-label">이전페이지로</div>
              </button>
              </a>
            </nav>

            <div class="information">
              <img src="/static/assets/images/table-ok.png" />
              <p class="table-status">빈자리 있음</p>
              <img src="/static/assets/images/table-full.png" />
              <p class="table-status full">빈자리 없음</p>
            </div>

            <div id="toast"></div>

            <div id="section-container">
              <div id="table-row1"></div>
              <div id="table-row2"></div>
              <div id="table-row3"></div>
              <div id="table-row4"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
    `;
  }

  defaultFunc() {
    initSeats();
  }
}
