import { createTable, createSmallTable } from "./Table.js";
import selectSeat from "./selectSeat.js";

export default function initSeats() {
  const section = document.getElementById("section-container");
  const row1 = document.getElementById("table-row1");
  const row2 = document.getElementById("table-row2");
  const row3 = document.getElementById("table-row3");
  const row4 = document.getElementById("table-row4");

  function bringSeatInfo() {
    fetch("http://localhost:3000/table")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        data.forEach((obj) => {
          const { position, remainingTime, table } = obj;
          console.log(position, remainingTime, table);
          const row = Object.entries(obj)[0][0];
          const hours = Object.entries(obj)[0][1];
          const occupied = document.querySelectorAll(`#${row} li`);

          hours.forEach((hour, idx) => {
            if (hour !== null) {
              occupied[idx].innerText = hour;
              occupied[idx].style.color = "white";
            } else {
              occupied[idx].classList.add("available");
              occupied[idx].innerText = `${occupied[idx].getAttribute(
                "idx"
              )}번`;
            }
            occupied[idx].style.fontSize = "0.7rem";
          });
        });
      })
      .catch((err) => console.log(err));
  }

  function createSeats() {
    let numChairs = 0;
    let tableNumber = 0;

    for (let i = 0; i < 3; i++) {
      numChairs = createTable(tableNumber, numChairs, row1.id);
      tableNumber++;
    }

    for (let i = 0; i < 3; i++) {
      numChairs = createSmallTable(tableNumber, numChairs, row2.id);
      tableNumber++;
    }

    for (let i = 0; i < 3; i++) {
      numChairs = createSmallTable(tableNumber, numChairs, row3.id);
      tableNumber++;
    }

    for (let i = 0; i < 3; i++) {
      numChairs = createTable(tableNumber, numChairs, row4.id);
      tableNumber++;
    }
  }

  bringSeatInfo();
  createSeats();

  section.addEventListener("click", selectSeat);
}
