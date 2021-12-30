import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
import { initSeats } from "../js/seat-selection/seat-selection.js";
import toast from "../js/common/toast.js";
import {
  Price,
  baseURL,
  setButtonConnection,
  composePaymentsInfo,
  checkSeat,
  extendTime,
  chooseSeat,
  chooseByTicket,
} from "../js/handler/seatHandler.js";

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
            <div class="payment-box">
              <h1 class="seat-title">selected <br> Seat</h1>
              <h1 class="seat__selected"></h1>
              <div class="total-price-box">
                <h1 class="total-price-box__title">총 결제금액:</h1>
                <h1 class="total-price-box__price">0원</h1>
              </div>
              <div class="info-payments">
                <li class="info-payment">이용권정보<a>시간권</a></li>
                <li class="info-payment" id="charged-time">이용시간<a></a></li>
                <li class="info-payment" >결제수단<a id="pay-method">카드결제</a></li>
              </div>
              <a href='/paycheck' data-link><input type="button" value="결제하기" id="payment-Btn" /></a>
              <a href='/paycheck' data-link ><input type="button" id="moveon" /></a>
            </div>
          </section>
          <main class="seat-view">
            <div id="disable--seat-view"></div>
            <div class="information">
              <div class="color-box__empty"></div>
              <p class="table-status">Empty</p>
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
    this.nav.defaultFunc();

    initSeats();

    const denied = JSON.parse(localStorage.getItem("denied"));
    if (denied) {
      toast(denied.msg);
      localStorage.removeItem("denied");
    }

    const path = sessionStorage.getItem("path");
    const prevPath = sessionStorage.getItem("history");
    const prevBtn = document.querySelector("#prev-btn");
    const payBtn = document.getElementById("payment-Btn");
    const totalPrice = document.querySelector(".total-price-box__price");
    const ticketInfoArr = document.querySelectorAll(
      ".info-payments .info-payment a"
    );

    // 사용중 Main
    if (prevPath === "using") {
      if (path === "move") chooseSeat(payBtn, prevBtn, totalPrice);
      else if (path == "extend") extendTime(ticketInfoArr, totalPrice, payBtn);
    }
    //퇴실메인
    else if (prevPath === "before") {
      if (path === "select") chooseSeat(payBtn, prevBtn, totalPrice);
      else if (path === "extend") extendTime(ticketInfoArr, totalPrice, payBtn);
      // 선택+연장
      else {
        chooseByTicket(payBtn, prevBtn, totalPrice, ticketInfoArr);
      }
    }
  }
}
