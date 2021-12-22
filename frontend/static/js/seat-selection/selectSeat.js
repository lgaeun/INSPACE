import toast from "../common/toast.js";

let countSelected = 0;

const selectSeat = (e) => {
  const classes = e.target.classList;
  let mySeat = e.target.innerText;
  const display = document.querySelector(".payment-box .seat__selected");

  if (classes.contains("seat") && classes.contains("available")) {
    if (countSelected == 0) {
      const tableNumber =
        e.target.parentElement.parentElement.childNodes[1].id.substring(5);
      //자리 선택하기
      countSelected++;
      classes.add("selected");
      classes.remove("available");
      display.innerText = mySeat;

      sessionStorage.setItem("lastSelected", mySeat);
      sessionStorage.setItem("table", tableNumber);
    } else {
      toast("자리를 이미 선택하셨습니다!");
    }
  } else if (classes.contains("seat") && classes.contains("selected")) {
    //자리 놔주기
    classes.add("available");
    classes.remove("selected");
    display.innerText = "";

    sessionStorage.removeItem("lastSelected");
    sessionStorage.removeItem("table");

    countSelected--;
  }
};

export default selectSeat;
