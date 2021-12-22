import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
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
                <li class="info-payment" id="charged-time">이용시간<a>4시간</a></li>
                <li class="info-payment" >결제수단<a id="pay-method">카드결제</a></li>
              </div>
              <a href='/paycheck' data-link><input type="button" value="결제하기" id="payment-Btn" /></a>
            </div>
          </section>

          <main class="seat-view">
            <div id="disable--seat-view"></div>
            <!-- <nav class="seat-view__nav">
              <a href="/main" data-link>
              <button type="button" class="btn btn-primary">
                <div class="plus-icon">
                  <img src="/static/assets/svg/arrow-left.svg" />
                </div>
                <a href='/paycheck' data-link id="prevBtn"><div class="select-label">이전페이지로</div></a>
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

    const path = sessionStorage.getItem("path");
    const prevPath = sessionStorage.getItem("history");
    const prevBtn = document.querySelector("#prev-btn");
    const payBtn = document.getElementById("payment-Btn");
    const seatTitle = document.querySelector(".seat-title");
    const totalPrice = document.querySelector(".total-price-box__price");
    const ticketInfoArr = document.querySelectorAll(".info-payment a");

    //(1) 로그인으로부터 온 경우
    if (prevPath === "login") {
      prevBtn.setAttribute("href", "/ticket");

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
      ticketInfoArr[0].innerText = auth === "oneday" ? "당일권" : "시간권";
      ticketInfoArr[1].innerText = `${time}시간`;
      totalPrice.innerText = `${Price[auth][time]}원`;

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
          sessionStorage.setItem("history", "using");

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
      prevBtn.setAttribute("href", "/main"); //퇴실메인으로 표시해야 함
      //좌석 선택
      if (path === "select") {
        sessionStorage.clear();
        sessionStorage.setItem("history", "main");
      }
      //시간만 연장
      else if (path === "extend") {
        const disableSelect = document.getElementById("disable--seat-view");
        const warningMessage = document.createElement("h1");

        seatTitle.innerText = "Your Selected Ticket";
        disableSelect.style.visibility = "visible";

        warningMessage.innerText =
          "좌석 선택은 이용권 연장 완료 후 시도해 주시기 바랍니다.";
        warningMessage.style.color = "white";
        warningMessage.style.fontSize = "50px";
        warningMessage.style.padding = "2em";
        disableSelect.append(warningMessage);

        sessionStorage.clear();
        sessionStorage.setItem("history", "before");
      }
    } else if (prevPath === "using") {
      // &&시간이 남아있는 경우에만 자리이동 가능(이용중 메인에서 온 경우)
      if (path === "move") {
        // 왼편 결제하기 컴포넌트 지우기, 결제하기버튼 -> 이동하기 버튼으로 바꾸기
        // const $paymentBtn = document.getElementById("payment-Btn");
        const $usingTime = document.getElementById("charged-time");
        const paymethod = document.getElementById("pay-method");

        payBtn.value = "좌석 이동하기";
        totalPrice.innerText = `0원`;
        $usingTime.innerText = "";
        paymethod.innerText = "시간권 차감";

        sessionStorage.clear();
        sessionStorage.setItem("history", "using");
      }
      //이용중메인 -> 시간만 연장
      else if (path == "extend") {
        const disableSelect = document.getElementById("disable--seat-view");
        const warningMessage = document.createElement("h1");

        seatTitle.innerText = "Your Selected Ticket";
        disableSelect.style.visibility = "visible";

        warningMessage.innerText =
          "좌석 선택은 이용권 연장 완료 후 시도해 주시기 바랍니다.";
        warningMessage.style.color = "white";
        warningMessage.style.fontSize = "50px";
        disableSelect.append(warningMessage);

        sessionStorage.clear();
        sessionStorage.setItem("history", "using");
      }
    }
  }
}
