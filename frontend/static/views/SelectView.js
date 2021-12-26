import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import { initSeats } from "../js/seat-selection/seat-selection.js";
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
    this.setTitle("INSPACE");
    this.nav = new NavComponent();
  }
  async getHtml() {
    let content;
    await fetch("http://localhost:8000/template/select")
      .then((res) => res.json())
      .then((res) => {
        content = "" + res.data.trim();
      });
    return this.nav.getHtml() + content;
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
      sessionStorage.setItem(
        "denied",
        JSON.stringify({ ok: true, msg: "좌석을 선택해주세요!" })
      );
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
          Authorization: localStorage.getItem("token"),
        },
      };
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
            Authorization: localStorage.getItem("token"),
          },
        };

        fetch(baseURL + `/reservation/position/`, seatData)
          .then((res) => {
            if (res.ok) {
              localStorage.setItem("checkIn", true);
              return;
            }
            return res.json();
          })
          .then((res) => {
            const status = {
              ok: true,
              msg: `${res.message}`,
            };
            status.msg +=
              res.type === "noTime" ? "이용권을 먼저 구매해주세요." : "";
            sessionStorage.setItem("denied", JSON.stringify(status));
            window.history.back();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  defaultFunc() {
    this.nav.defaultFunc();

    initSeats();

    const denied = JSON.parse(sessionStorage.getItem("denied"));
    if (denied) {
      toast(denied.msg);
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

    // 사용중 Main
    if (prevPath === "using") {
      if (path === "move") this.chooseSeat();
      else if (path == "extend") this.extendTime();
    }
    //퇴실메인
    else if (prevPath === "before") {
      if (path === "select") this.chooseSeat();
      else if (path === "extend") this.extendTime();
      // 선택+연장
      else {
        this.setButtonConnection(prevBtn, "ticket");
        const ticket = JSON.parse(localStorage.getItem("ticket"));
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
              Authorization: localStorage.getItem("token"),
            },
          };
          if (isSelected) {
            fetch(
              baseURL + `/reservation/table/position/payments/`,
              seatData
            ).then((res) => {
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
  }
}
