import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import initSeats from "../js/seat-selection/seat-selection.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("좌석 선택");
  }
  getHtml() {
    return (
      NavComponent() +
      `<div class="seat-bg" id="bg">
      <div class="seat-container-border">
        <div class="seat-container" id="seat-container">
          <section class="seat-detail">
            <!-- 결제정보, 좌석 정보 -->
            <div class="payment-box">
              <h1 class="seat-title">selected <br> Seat</h1>
              <h1 class="seat__selected"></h1>
              <div class="total-price-box">
                <h1 class="total-price-box__title">총 결제금액:</h1>
                <h1 class="total-price-box__price">12,000원</h1>
              </div>
              <div class="info-payments">
                <li class="info-payment">이용권정보<a>시간권</a></li>
                <li class="info-payment">이용시간<a>4시간</a></li>
                <li class="info-payment">결제수단<a>카드결제</a></li>
              </div>
              <a href='/paycheck' data-link><input type="button" value="결제하기" id="payment-Btn" /></a>
            </div>
          </section>
          <div class="divider"></div>
          <main class="seat-view">
            <!-- <nav class="seat-view__nav">
              <a href="/main" data-link>
              <button type="button" class="btn btn-primary">
                <div class="plus-icon">
                  <img src="/static/assets/svg/arrow-left.svg" />
                </div>
                <div class="select-label">이전페이지로</div>
              </button>
              </a>
            </nav> -->

            <div class="information">
              <!-- <img src="/static/assets/images/table-ok.png" /> -->
              <div class="color-box__empty"></div>
              <p class="table-status">Empty</p>
              <!-- <img src="/static/assets/images/table-full.png" /> -->
              <div class="color-box__full"></div>
              <p class="table-status full">Full</p>
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
      <div class="prev-btn-wrapper seat-view__nav">
          <a href="/ticket" data-link><button id="prev-btn">Prev</button></a>
        </div>
    </div>
    `
    );
  }

  defaultFunc() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    document.getElementById("root").appendChild(script);

    initSeats();
  }
}
