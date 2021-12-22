import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import initSeats from "../js/seat-selection/seat-selection.js";
import sessionStorageToObj from "../js/common/sessionStorageToObj.js";
import toast from "../js/common/toast.js";

const Price = {
  oneday: {
    1: 2000,
    4: 6000,
    12: 15000,
    24: 25000,
  },
  charge: {
    50: 50000,
    100: 100000,
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

      const ticketObj = sessionStorageToObj("ticket");
      const { time, auth } = ticketObj;
      const formattedPrice = `${Intl.NumberFormat("ko-KR").format(
        Price[auth][time]
      )}원`;

      ticketInfoArr[0].innerText = auth === "oneday" ? "당일권" : "시간권";
      ticketInfoArr[1].innerText = `${time}시간`;
      totalPrice.innerText = formattedPrice;

      payBtn.addEventListener("click", (e) => {
        const selectedSeat = sessionStorage.getItem("lastSelected");
        //선택한 좌석이 있을 경우
        if (!selectedSeat) {
          payBtn.parentElement.setAttribute("href", "/select");
          // toast("좌석을 선택해주세요!");
          alert("좌석을 선택해주세요");
        } else {
          //validation - 좌석 data fetch받아와서 자리 여전히 없으면 req 넘기고, 다음 페이지로 이동
          if (true) {
            payBtn.parentElement.setAttribute("href", "/paycheck");
            const req = {
              category: auth,
              duration: time,
              price: Price[auth][time],
              table: sessionStorage.getItem("table"),
              position: Number(selectedSeat.replace(/[^0-9]/g, "")),
              //현재 시각
            };
            //api.post(req)
            console.log("selected seta", req);

            sessionStorage.clear();
            sessionStorage.setItem("history", "using");
            sessionStorage.setItem("price", formattedPrice);
          } else {
            alert("좌석을 다시 선택해주세요");
            payBtn.parentElement.setAttribute("href", "/select");
            localStorage.removeItem("table");
            localStorage.removeItem("lastSelected");
          }
        }
      });
    }
    //퇴실 Main에서 버튼 선택
    else if (prevPath === "before") {
      prevBtn.setAttribute("href", "/main"); //퇴실메인으로 표시해야 함
      //좌석 선택 - 퇴실뷰 나오면 그때 구현!!!
      if (path === "select") {
        sessionStorage.clear();
        sessionStorage.setItem("history", "main");
      }
      //시간만 연장
      else if (path === "extend") {
        const disableSelect = document.getElementById("disable--seat-view");
        const warningMessage = document.createElement("h1");
        const ticketType = document.querySelector(".seat__selected");

        seatTitle.innerText = "Your Selected Ticket";
        ticketType.innerText = disableSelect.style.visibility = "visible";

        warningMessage.innerText =
          "좌석 선택은 이용권 연장 완료 후 시도해 주시기 바랍니다.";
        warningMessage.style.color = "white";
        warningMessage.style.fontSize = "50px";
        warningMessage.style.padding = "2em";
        disableSelect.append(warningMessage);

        prevBtn.addEventListener("click", () => {});

        sessionStorage.clear();
        sessionStorage.setItem("history", "before");
      }
    }
    // 사용중 Main에서 버튼 선택
    else if (prevPath === "using") {
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

        payBtn.addEventListener("click", (e) => {
          const selectedSeat = sessionStorage.getItem("lastSelected");
          //선택한 좌석이 있을 경우
          if (!selectedSeat) {
            payBtn.parentElement.setAttribute("href", "/select");
            // toast("좌석을 선택해주세요!");
            alert("좌석을 선택해주세요");
          } else {
            //validation - 좌석 data fetch받아와서 자리 여전히 없으면 req 넘기고, 다음 페이지로 이동
            if (true) {
              payBtn.parentElement.setAttribute("href", "/paycheck");
              const req = {
                category: auth,
                duration: time,
                price: Price[auth][time],
                table: sessionStorage.getItem("table"),
                position: Number(selectedSeat.replace(/[^0-9]/g, "")),
                //현재 시각
              };
              //api.post(req)
              console.log("selected seta", req);

              sessionStorage.clear();
              sessionStorage.setItem("history", "using");
              sessionStorage.setItem("price", formattedPrice);
              sessionStorage.setItem("moved", selectedSeat);
            } else {
              alert("좌석을 다시 선택해주세요");
              payBtn.parentElement.setAttribute("href", "/select");
              localStorage.removeItem("table");
              localStorage.removeItem("lastSelected");
            }
          }
        });
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
        warningMessage.style.margin = "2em";
        disableSelect.append(warningMessage);

        sessionStorage.clear();
        sessionStorage.setItem("history", "using");
        sessionStorage.setItem("price", formattedPrice);
      }
    }
  }
}
