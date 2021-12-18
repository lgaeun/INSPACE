import { createTable, createSmallTable } from "./Table.js";
import selectSeat from "./selectSeat.js";

const section = document.getElementById("section-container");
const row1 = document.getElementById("table-row1");
const row2 = document.getElementById("table-row2");
const row3 = document.getElementById("table-row3");
const row4 = document.getElementById("table-row4");

const dummyTimesLeft = [
  {
    "table-row1": [
      null,
      "1h",
      "2h3m",
      "30m",
      null,
      null,
      null,
      "1h",
      "2h3m",
      "30m",
      null,
      null,
    ],
  },
  {
    "table-row2": [null, "1h", "2h3m", "30m", null, null],
  },
  {
    "table-row3": [null, "1h", "2h3m", "30m", null, null],
  },
  {
    "table-row4": [
      null,
      "1h",
      "2h3m",
      "30m",
      null,
      null,
      null,
      "1h",
      "2h3m",
      "30m",
      null,
      null,
    ],
  },
];

window.onload = () => {
  let numChairs = 0;

  //1열 regular table 생성하기
  for (let i = 0; i < 3; i++) {
    const NextTableChairStartNumber = createTable(numChairs, row1.id);
    numChairs = NextTableChairStartNumber;
  }

  //2열 small table 생성하기
  for (let i = 0; i < 3; i++) {
    const NextTableChairStartNumber = createSmallTable(numChairs, row2.id);
    numChairs = NextTableChairStartNumber;
  }

  //3열 small table 생성하기
  for (let i = 0; i < 3; i++) {
    const NextTableChairStartNumber = createSmallTable(numChairs, row3.id);
    numChairs = NextTableChairStartNumber;
  }

  //4열에 regular table 생성하기
  for (let i = 0; i < 3; i++) {
    const NextTableChairStartNumber = createTable(numChairs, row4.id);
    numChairs = NextTableChairStartNumber;
  }

  //db에서 가져오는 시점에 이미 자리가 차 있는 좌석들은 잔여 시간 표시하기
  dummyTimesLeft.forEach((obj) => {
    const row = Object.entries(obj)[0][0];
    const hours = Object.entries(obj)[0][1];
    const occupied = document.querySelectorAll(`#${row} li`);

    hours.forEach((hour, idx) => {
      if (hour !== null) {
        occupied[idx].innerText = hour;
        occupied[idx].style.color = "white";
      } else {
        occupied[idx].classList.add("available");
        occupied[idx].innerText = `${occupied[idx].getAttribute("idx")}번`;
      }
      occupied[idx].style.fontSize = "0.7rem";
    });
  });
};

function revealTime(seatNum) {
  //fetch 받아왔을때 실시간으로 occupied된 seat의 남은시간을 보여주는 함수
}

section.addEventListener("click", selectSeat);
