import AbstractView from "./AbstractView.js";
import NavComponent from "../js/common/nav.js";
// import { copy } from "../../../backend/app.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    //this.postId = params.id;
    this.setTitle("Main Page");
    this.nav = new NavComponent();
  }

  getHtml() {
    return (
      this.nav.getHtml() +
      `<div class="main-container">
        <div class="main-section">
          <div class="main-section__info">
            <div id="seat-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-geo"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                />
              </svg>
              <span> - </span>
            </div>
            <div id="check-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
            <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
          </svg>
              <span> - </span>
            </div>
            <div id="ticket-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-ticket-perforated" viewBox="0 0 16 16">
            <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"/>
            <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"/>
          </svg>
              <span> - </span>
            </div>
          </div>
          <div class="main-section__timer">
            <canvas id="timer" width="400" height="400"></canvas>
          </div>
          <div class="main-section__btn-check-in">
          <a href="/select" data-link
          ><button class="btn" type="button" id="btn--move-seat">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-geo"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                />
              </svg>
          좌석 이동</button></a
        >
            <a href="/ticket" data-link
              ><button class="btn" type="button" id="check-in__btn--extend-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
              <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
            </svg>
              시간 연장</button></a
            >
            <a href="javascript:void(0);"
              ><button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#confirmModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
                퇴실하기
              </button></a
            >
          </div>
          <div class="main-section__btn-check-out">
            <a href="/ticket" data-link
              ><button class="btn" type="button" id="check-out__btn--extend-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
              <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
            </svg>
              시간 연장</button></a
            >
            <a href="/select" data-link
            ><button class="btn" type="button" id="btn--select-seat">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-geo"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
            />
          </svg>
            좌석 선택</button></a>
            <a href="/ticket" data-link
              ><button class="btn" type="button" id="btn--select-extend">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
              
              시간 연장 + 좌석 선택</button></a
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">정말 퇴실하시겠습니까? </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
        <button type="button" class="btn btn-primary" id="btn-check-out" data-bs-dismiss="modal">확인</button>
      </div>
    </div>
  </div>
</div>

    `
    );
  }

  defaultFunc() {
    this.nav.defaultFunc();
    const $checkIn = document.querySelector(".main-section__btn-check-in");
    const $checkOut = document.querySelector(".main-section__btn-check-out");
    const $btnCheckOut = document.getElementById("btn-check-out");

    const selectSeatBtn = document.querySelector("#btn--select-seat");
    const moveSeatBtn = document.querySelector("#btn--move-seat");
    const selectAndExtendBtn = document.querySelector("#btn--select-extend");
    const extendTimeBtnIn = document.querySelector(
      "#check-in__btn--extend-time"
    );
    const extendTimeBtnOut = document.querySelector(
      "#check-out__btn--extend-time"
    );

    const view = sessionStorage.getItem("view");
    if (view && view === "using") {
      sessionStorage.clear();
    }

    const $seatInfo = document.querySelector("#seat-info span");
    const $checkInfo = document.querySelector("#check-info span");
    const $ticketInfo = document.querySelector("#ticket-info span");

    const progressColor = "#BCCBEA";
    const circleColor = "#EDF0EB";
    const lineWidth = 40;

    const canvas = document.getElementById("timer");
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const checkIn = localStorage.getItem("checkIn"); //fetch
    const id = localStorage.getItem("id");

    let clearTimer = false;
    let elapsed = 0;

    // fetch(
    //   "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/login"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    if (checkIn == "true") {
      checkInDisplay(true);

      fetch(
        `http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/users/${id}/checkIn`
      )
        //fetch("http://localhost:3000/checkIn")
        .then((res) => res.json())
        .then((data) => {
          //data = data[0];

          const info = {
            seat: "T" + data.table + "-" + data.position,
            check: formatDate(new Date(data.startTime)),
            ticket:
              data.duration +
              "시간 " +
              (data.category == "savingupTime" ? "충전권" : "당일권"),
          };

          setInfo(info);

          const endTime = new Date(data.finishTime);

          let setTimer = setInterval(function () {
            if (clearTimer) {
              clearInterval(setTimer);
            }
            elapsed = endTime.getTime() - new Date().getTime();
            drawTimer();
          }, 1000);
        })
        .catch((err) => console.log(err));
    } else {
      checkInDisplay(false);

      fetch(
        `http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/users/${id}/checkOut`
      )
        //fetch("http://localhost:3000/checkOut")
        .then((res) => res.json())
        .then((data) => {
          //data = data[0];

          const info = {
            seat: " - ",
            check: " - ",
            ticket: " - ",
          };

          setInfo(info);

          elapsed =
            Math.abs(data.remainingTime.hour) * (1000 * 60 * 60) +
            data.remainingTime.min * (1000 * 60) +
            data.remainingTime.sec * 1000;

          drawTimer();
        })
        .catch((err) => console.log(err));
    }

    const formatDate = (current_datetime) => {
      let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1 > 10
          ? current_datetime.getMonth() + 1
          : `0${current_datetime.getMonth() + 1}`) +
        "-" +
        (current_datetime.getDate() > 10
          ? current_datetime.getDate()
          : `0${current_datetime.getDate()}`) +
        " " +
        (current_datetime.getHours() > 10
          ? current_datetime.getHours()
          : `0${current_datetime.getHours()}`) +
        ":" +
        (current_datetime.getMinutes() > 10
          ? current_datetime.getMinutes()
          : `0${current_datetime.getMinutes()}`) +
        ":" +
        (current_datetime.getSeconds() > 10
          ? current_datetime.getSeconds()
          : `0${current_datetime.getSeconds()}`);
      return formatted_date;
    };

    function setInfo(info) {
      $seatInfo.innerHTML = info.seat;
      $checkInfo.innerHTML = info.check;
      $ticketInfo.innerHTML = info.ticket;
    }

    function checkInDisplay(flag) {
      if (flag) {
        $checkIn.style.display = "grid";
        $checkOut.style.display = "none";
      } else {
        const info = {
          seat: "-",
          check: "-",
          ticket: "-",
        };

        setInfo(info);

        $checkIn.style.display = "none";
        $checkOut.style.display = "grid";
      }
    }
    //퇴실 메인
    selectSeatBtn.addEventListener("click", function () {
      sessionStorage.clear();
      sessionStorage.setItem("history", "before");
      sessionStorage.setItem("path", "select");
    });
    extendTimeBtnOut.addEventListener("click", function () {
      sessionStorage.clear();
      sessionStorage.setItem("history", "before");
      sessionStorage.setItem("path", "extend");
    });
    selectAndExtendBtn.addEventListener("click", function () {
      sessionStorage.clear();
      sessionStorage.setItem("history", "before");
      sessionStorage.setItem("path", "both");
    });

    // 이용중 메인
    moveSeatBtn.addEventListener("click", function () {
      sessionStorage.clear();
      sessionStorage.setItem("history", "using");
      sessionStorage.setItem("path", "move");
    });
    extendTimeBtnIn.addEventListener("click", function () {
      sessionStorage.clear();
      sessionStorage.setItem("history", "using");
      sessionStorage.setItem("path", "extend");
    });

    $btnCheckOut.addEventListener("click", () => {
      fetch(
        `http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/users/${id}/checkOut`
      )
        .then((res) => {
          if (res.ok) {
            localStorage.setItem("checkIn", false);
            location.reload();
          }
        })
        .then((data) => {})
        .catch((err) => console.log(err));
    });

    function drawTimer() {
      //timer process circle
      const restTimeHour = (elapsed > 0 ? elapsed : 0) / (1000 * 60 * 60);

      const hour = 24;
      const degrees = (restTimeHour / hour) * 100;
      const radians = (degrees * Math.PI) / 50;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // backgroud circle
      ctx.beginPath();
      ctx.strokeStyle = circleColor;
      ctx.lineWidth = lineWidth;
      // ctx.shadowBlur = 5;
      // ctx.shadowColor = "#9fa0a4";
      // ctx.shadowOffsetX = 0;
      // ctx.shadowOffsetY = 1;
      ctx.arc(
        canvasHeight / 2,
        canvasWidth / 2,
        canvasWidth / 3,
        0,
        Math.PI * 4,
        false
      );
      ctx.imageSmoothingEnabled = true;
      ctx.closePath();
      ctx.stroke();

      // progressBar
      ctx.beginPath();
      ctx.strokeStyle = progressColor;
      ctx.lineWidth = lineWidth;
      ctx.arc(
        canvasHeight / 2,
        canvasWidth / 2,
        canvasWidth / 3,
        0 - (90 * Math.PI) / 180,
        radians - (90 * Math.PI) / 180,
        false
      );
      ctx.stroke();

      // progress update text
      ctx.fillStyle = "#000000";
      ctx.font = "16pt Noto Sans KR";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = "center";

      if (elapsed > 0) {
        ctx.fillText("잔여시간", canvasWidth / 2, canvasHeight / 2 - 10);

        const restTime = new Date(elapsed);

        let seconds = parseInt(elapsed / 1000);
        let minutes = parseInt(seconds / 60);
        let hours = parseInt(minutes / 60);

        minutes = minutes - hours * 60;
        seconds = seconds - (minutes * 60 + hours * 60 * 60);

        ctx.font = "22pt Noto Sans KR";
        const outputTextPerc = `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`;
        ctx.fillText(outputTextPerc, canvasWidth / 2, canvasHeight / 2 + 27);
      } else {
        ctx.fillText("잔여시간없음", canvasWidth / 2, canvasHeight / 2 + 10);
      }
    }
  }
}
