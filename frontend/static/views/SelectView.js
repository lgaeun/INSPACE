import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import {
  bringSeatInfo,
  initSeats,
} from "../js/seat-selection/seat-selection.js";
import toast from "../js/common/toast.js";

// const baseURL =
//   "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000";
const baseURL = "http://localhost:5000";
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
let path = null;
let prevPath = null;
let prevBtn = null;
let payBtn = null;
let seatTitle = null;
let totalPrice = null;
let ticketInfoArr = null;
let disableSelect = null;
let warningMessage = null;
let ticketType = null;
let userId = null;

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("좌석 선택");
    this.nav = new NavComponent();
  }
  getHtml() {
    return (
      this.nav.getHtml() +
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

  setButtonConnection(button, destination) {
    button.parentElement.setAttribute("href", `/${destination}`);
  }

  composePaymentsInfo(ticketInfoArr, totalPrice, time, auth) {
    const formattedPrice = `${Intl.NumberFormat("ko-KR").format(
      Price[auth][time]
    )}원`;

    ticketInfoArr[0].innerText = auth === "oneday" ? "당일권" : "시간권";
    ticketInfoArr[1].innerText = `${time}시간`;
    totalPrice.innerText = formattedPrice;

    return formattedPrice;
  }

  disablePaymentInfo(payBtn, totalPrice) {
    const $usingTime = document.getElementById("charged-time");
    const paymethod = document.getElementById("pay-method");

    payBtn.value = "좌석 이동하기";
    totalPrice.innerText = `0원`;
    $usingTime.innerText = "";
    paymethod.innerText = "시간권 차감";
  }

  disableSeatSelection(disableSelect, warningMessage) {
    disableSelect.style.visibility = "visible";
    warningMessage.innerHTML =
      "좌석 선택은 <br> 이용권 연장 완료 후 <br> 시도해 주시기 바랍니다.";
    warningMessage.style.color = "white";
    warningMessage.style.fontSize = "50px";
    warningMessage.style.textAlign = "center";
    warningMessage.style.padding = "2em";
    disableSelect.append(warningMessage);
  }

  checkSeat(selectedSeat, payBtn) {
    if (!selectedSeat) {
      this.setButtonConnection(payBtn, "select");
      alert("좌석을 선택해주세요");
      return false;
    } else {
      return true;
    }
  }

  extendTime() {
    const ticket = JSON.parse(localStorage.getItem("ticket"));
    const { time, auth } = ticket;
    const formattedPrice = this.composePaymentsInfo(
      ticketInfoArr,
      totalPrice,
      time,
      auth
    );
    seatTitle.innerHTML = "Your <br>Selected<br> Ticket";
    ticketType.innerText = ticketInfoArr[0].innerText;
    this.disableSeatSelection(disableSelect, warningMessage);

    payBtn.addEventListener("click", () => {
      let priceObj = {
        category: auth,
        duration: time,
        price: Price[auth][time],
      };
      let priceData = {
        method: "POST",
        body: JSON.stringify(priceObj),
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(priceData);
      fetch(baseURL + `/reservation/payments/${userId}`, priceData)
        .then((res) => {
          if (res.ok) {
            localStorage.setItem("ticket", {
              ...ticket,
              price: formattedPrice,
            });
          }
        })
        .catch((err) => console.log("시간권 정보 전송 failed", err));
    });
  }

  chooseSeat() {
    this.setButtonConnection(prevBtn, "main");
    this.disablePaymentInfo(payBtn, totalPrice);

    payBtn.addEventListener("click", (e) => {
      const selectedSeat = sessionStorage.getItem("lastSelected");
      let isSelected = this.checkSeat(selectedSeat, payBtn);

      if (isSelected) {
        const seatObj = {
          table: sessionStorage.getItem("table"),
          position: Number(selectedSeat.replace(/[^0-9]/g, "")),
        };
        let seatData = {
          method: "POST",
          body: JSON.stringify(seatObj),
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(baseURL + `/reservation/position/${userId}`, seatData).then(
          (res) => {
            if (res.ok) {
              localStorage.setItem("checkIn", true);
            } else {
              if (res.err === "남은 시간이 없습니다.") {
                alert("남은 시간이 없습니다. 이용권 먼저 구매해주세요");
                this.setButtonConnection(payBtn, "main");
              } else if (res.err === "이미 사용중인 좌석입니다.") {
                sessionStorage.setItem("denied", "true");
                window.history.back();
              }
            }
          }
        );
      }
    });
  }

  defaultFunc() {
    this.nav.defaultFunc();

    initSeats();

    if (sessionStorage.getItem("denied") === "true") {
      toast("이미 선택된 좌석입니다");
      sessionStorage.removeItem("denied");
    }

    path = sessionStorage.getItem("path");
    prevPath = sessionStorage.getItem("history");
    prevBtn = document.querySelector("#prev-btn");
    payBtn = document.getElementById("payment-Btn");
    seatTitle = document.querySelector(".seat-title");
    totalPrice = document.querySelector(".total-price-box__price");
    ticketInfoArr = document.querySelectorAll(".info-payment a");
    disableSelect = document.getElementById("disable--seat-view");
    warningMessage = document.createElement("h1");
    ticketType = document.querySelector(".seat__selected");
    userId = localStorage.getItem("id");

    //퇴실메인
    if (prevPath === "before") {
      //좌석만 선택
      if (path === "select") {
        console.log("좌석만 선택");
        this.chooseSeat();
      }
      //시간만 연장
      else if (path === "extend") {
        console.log("시간만 연장 ");
        this.extendTime();
      }
      // 선택+연장
      else {
        console.log("그냥 입장");
        this.setButtonConnection(prevBtn, "ticket");

        const { time, auth } = JSON.parse(localStorage.getItem("ticket"));
        const formattedPrice = this.composePaymentsInfo(
          ticketInfoArr,
          totalPrice,
          time,
          auth
        );

        payBtn.addEventListener("click", (e) => {
          const selectedSeat = sessionStorage.getItem("lastSelected");
          let isSelected = this.checkSeat(selectedSeat, payBtn);
          const seatTicketObj = {
            category: auth,
            duration: time,
            price: Price[auth][time],
            table: sessionStorage.getItem("table"),
            position: Number(selectedSeat.replace(/[^0-9]/g, "")),
          };
          let seatData = {
            method: "POST",
            body: JSON.stringify(seatTicketObj),
            headers: {
              "Content-Type": "application/json",
            },
          };
          if (isSelected) {
            fetch(
              baseURL + `/reservation/table/position/payments/${userId}`,
              seatData
            ).then((res) => {
              console.log(res);
              if (res.ok) {
                localStorage.setItem("ticket", {
                  ...ticket,
                  price: formattedPrice,
                });
                localStorage.setItem("checkIn", true);
              } else {
                sessionStorage.setItem("denied", "true");
                window.history.back();
              }
            });
          }
        });
      }
    }
    // 사용중 Main
    else if (prevPath === "using") {
      if (path === "move") {
        this.chooseSeat();
      }
      //이용중메인 -> 시간만 연장
      else if (path == "extend") {
        this.extendTime();
      }
    }
  }
}
