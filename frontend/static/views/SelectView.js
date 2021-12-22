import AbstractView from "./AbstractView.js";
import initSeats from "../js/seat-selection/seat-selection.js";

const Price = {
  oneday: {
    1: 2000,
    4: 6000,
    12: 15000,
    24: 25000,
  },
  charge: {
    50: 50000,
    100: 10000,
  },
};

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
                <li class="info-payment" id="pay-method">결제수단<a>카드결제</a></li>
              </div>
              <a href='/paycheck' data-link><input type="button" value="결제하기" id="payment-Btn" /></a>
            </div>
          </section>

          <div id="disable--seat-view"></div>

          <main class="seat-view">
            <nav class="seat-view__nav">
              <a href="/main" data-link>
              <button type="button" class="btn btn-primary">
                <div class="plus-icon">
                  <img src="/static/assets/svg/arrow-left.svg" />
                </div>
                <a href='/paycheck' data-link id="prevBtn"><div class="select-label">이전페이지로</div></a>
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
    const ticketObj = sessionStorage
      .getItem("ticket")
      .split("{")[1]
      .split("}")[0]
      .split(",")
      .reduce((obj, el) => {
        const [key, val] = el.split(":").map((str) => str.replace(/\"/g, ""));
        obj[key] = val;
        return obj;
      }, {});

    const { time, auth, history } = ticketObj;
    const path = sessionStorage.getItem("path");
    const prevPath = sessionStorage.getItem("history");
    const prevBtn = document.querySelector("#prevBtn");
    const payBtn = document.getElementById("payment-Btn");
    const totalPrice = document.querySelector(".total-price-box a");
    const ticketInfoArr = document.querySelectorAll(".info-payment a");

    ticketInfoArr[0].innerText = auth === "oneday" ? "당일권" : "시간권";
    ticketInfoArr[1].innerText = `${time}시간`;

    totalPrice.innerText = `${Price[auth][time]}원`;

    //(1) 로그인으로부터 온 경우
    if (prevPath === "login") {
      prevBtn.setAttribute("href", "/ticket");
      // 로그인 뷰에서 넘어왔을 때
      payBtn.addEventListener("click", (e) => {
        const selectedSeat = sessionStorage.getItem("lastSelected");
        if (!selectedSeat) {
          alert("좌석을 선택해주세요!");
          //넘어가기 방지
        } else {
          //validation - 좌석 data fetch받아와서 자리 여전히 없으면 req 넘기고, 다음 페이지로 이동
          const req = {
            category: auth,
            duration: time,
            price: Price[auth][time],
            table: 1,
            position: Number(selectedSeat),
          };
          //api.post(req)
          console.log(req);
          sessionStorage.clear();

          //else
          // 다음페이지로 넘어가기 방지
          // alert 좌석을 다시 선택해주세요
          // 자리 re-render
          // localstorage에서 lastSelected 초기화
        }
      });
    }
    //(2) 퇴실 Main에서 온 경우
    else if (prevPath === "before") {
      prevBtn.setAttribute("href", "/main");
      //퇴실메인 - 좌석선택
      if (path === "select") {
        // 왼편 결제하기 컴포넌트 지우기, 결제하기버튼 -> 이동하기 버튼으로 바꾸기
        // 이용중 main으로 이동
        sessionStorage.clear();
      }
      //퇴실메인 - 시간연장
      else if (path === "extend") {
        const disableSelect = document.getElementById("disable--seat-view");
        const text = document.querySelector(".payment-box h2");
        const warningMessage = document.createElement("h1");

        text.innerText = "선택한 이용권";
        disableSelect.style.visibility = "visible";

        warningMessage.innerText =
          "좌석 선택은 이용권 연장 완료 후 시도해 주시기 바랍니다.";
        warningMessage.style.color = "white";
        warningMessage.style.fontSize = "50px";
        disableSelect.append(warningMessage);

        sessionStorage.clear();
      }
    }
    //(3)이용중 Main에서 온 경우
    else {
      console.log(prevPath);
      //좌석 이동
      if (path === "move") {
        // 왼편 결제하기 컴포넌트 지우기, 결제하기버튼 -> 이동하기 버튼으로 바꾸기
        // 이용중 main으로 이동
        const $paymentBtn = document.getElementById("payment-Btn");
        const $usingTime = document.getElementsByName(".info-payment")[1];
        const paymethod = document.getElementById("pay-method");

        $paymentBtn.value = "좌석 이동하기";
        totalPrice.innerText = `0원`;
        $usingTime.innerText = "";
        paymethod.innerText = "시간권 차감";

        sessionStorage.clear();
      }
    }
  }
}
