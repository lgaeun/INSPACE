const ticketHandler = ($tickets) => {
  const $nextBtn = document.getElementById("next-btn");

  $tickets.forEach((ticket) => {
    // ticket 클릭이벤트
    ticket.onclick = (e) => {
      const selectedTime = Number(ticket.dataset.name);
      const selectedPrice = ticket.dataset.price;

      const userAuth =
        e.target.className === "charge ticket" ? "charge" : "oneday";
      // 클릭시 버튼 눌림 효과 CSS적용
      // e.target.style = `color: black;
      //   box-shadow: 0 0 0 2px #000 inset;
      //   background-color: white;
      //   transition: 0.5s`;

      const $selected = document.querySelector(".ticket__selected");
      if ($selected) {
        $selected.classList.remove("ticket__selected");
      }

      if (e.target != $selected) {
        e.target.classList.add("ticket__selected");

        $nextBtn.disabled = false;
        $nextBtn.classList.remove("next-btn__disabled");
        $nextBtn.classList.add("next-btn__abled");
      } else {
        $nextBtn.disabled = true;
        $nextBtn.classList.add("next-btn__disabled");
        $nextBtn.classList.remove("next-btn__abled");
      }

      // 이벤트 타깃이 아닌 버튼 이벤트 초기화
      $tickets.forEach((ticket) => {
        if (ticket !== e.target) {
          ticket.style = "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;";
        }
      });
      // 티켓데이터
      const ticketData = createTicketObj();
      // localStorage에 추가
      localStorage.setItem("ticket", JSON.stringify(ticketData));
      //티켓데이터 obj생성함수
      function createTicketObj() {
        return {
          time: selectedTime,
          auth: userAuth,
          history: `${sessionStorage.getItem("history")}`,
          price: selectedPrice,
        };
      }
    };
  });
};

export default ticketHandler;
