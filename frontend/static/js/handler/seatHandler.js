import toast from "../common/toast.js";

export const baseURL =
  "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000";

export const Price = {
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

export function setButtonConnection(button, destination) {
  button.parentElement.setAttribute("href", `/${destination}`);
}

export function composePaymentsInfo(ticketInfoArr, totalPrice, time, auth) {
  const formattedPrice = `${Intl.NumberFormat("ko-KR").format(
    Price[auth][time]
  )}원`;
  console.log(ticketInfoArr);
  ticketInfoArr[0].innerText = auth === "oneday" ? "당일권" : "시간권";
  ticketInfoArr[1].innerText = `${time}시간`;
  totalPrice.innerText = formattedPrice;

  return formattedPrice;
}

function disablePaymentInfo(payBtn, totalPrice) {
  const $usingTime = document.getElementById("charged-time");
  const paymethod = document.getElementById("pay-method");

  payBtn.value = "좌석 이동하기";
  totalPrice.innerText = `0원`;
  $usingTime.innerText = "";
  paymethod.innerText = "시간권 차감";
}

function disableSeatSelection(disableSelect, warningMessage) {
  disableSelect.style.visibility = "visible";
  warningMessage.innerHTML =
    "좌석 선택은 <br> 이용권 연장 완료 후 <br> 시도해 주시기 바랍니다.";
  warningMessage.style.color = "white";
  warningMessage.style.fontSize = "50px";
  warningMessage.style.textAlign = "center";
  warningMessage.style.padding = "2em";
  disableSelect.append(warningMessage);
}

export function checkSeat(selectedSeat, payBtn) {
  if (!selectedSeat) {
    setButtonConnection(payBtn, "select");
    localStorage.setItem(
      "denied",
      JSON.stringify({ ok: true, msg: "좌석을 선택해주세요!" })
    );
    return false;
  } else {
    return true;
  }
}

export function extendTime(ticketInfoArr, totalPrice) {
  const ticket = JSON.parse(localStorage.getItem("ticket"));
  const { time, auth } = ticket;
  const formattedPrice = composePaymentsInfo(
    ticketInfoArr,
    totalPrice,
    time,
    auth
  );
  const seatTitle = document.querySelector(".seat-title");
  const disableSelect = document.getElementById("disable--seat-view");
  const warningMessage = document.createElement("h1");
  const ticketType = document.querySelector(".seat__selected");

  seatTitle.innerHTML = "Your <br>Selected<br> Ticket";
  ticketType.innerText = ticketInfoArr[0].innerText;
  disableSeatSelection(disableSelect, warningMessage);

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
    fetch(baseURL + `/reservation/payments`, priceData)
      .then((res) => {
        console.log(res);
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

export function chooseSeat() {
  const payBtn = document.getElementById("payment-Btn");
  const prevBtn = document.querySelector("#prev-btn");
  const totalPrice = document.querySelector(".total-price-box__price");

  setButtonConnection(prevBtn, "main");
  disablePaymentInfo(payBtn, totalPrice);

  payBtn.addEventListener("click", (e) => {
    setButtonConnection(payBtn, "select");
    const selectedSeat = sessionStorage.getItem("lastSelected");
    let isSelected = checkSeat(selectedSeat, payBtn);

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
          console.log(res);
          if (res.ok) {
            localStorage.setItem("checkIn", true);
            document.querySelector("#moveon").click();
            return;
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
          let status = res.message;
          status += res.type === "noTime" ? "이용권을 먼저 구매해주세요." : "";
          toast(status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  prevBtn.addEventListener("click", () => {
    if (localStorage.getItem("denied")) localStorage.removeItem("denied");
  });
}
