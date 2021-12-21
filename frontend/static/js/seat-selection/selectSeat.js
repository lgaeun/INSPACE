let countSelected = 0;
let removeToast;

function toast(string) {
  const toast = document.getElementById("toast");

  toast.classList.contains("reveal")
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 2000)))
    : (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 2000));
  toast.classList.add("reveal"), (toast.innerText = string);
}

const selectSeat = (e) => {
  const classes = e.target.classList;
  let mySeat = e.target.innerText;
  const display = document.querySelector(".payment-box h2 p");

  if (classes.contains("seat") && classes.contains("available")) {
    if (countSelected == 0) {
      //자리 선택하기
      countSelected++;
      classes.add("selected");
      classes.remove("available");
      display.innerText = mySeat;
    } else {
      toast("자리를 이미 선택하셨습니다!");
    }
  } else if (classes.contains("seat") && classes.contains("selected")) {
    //자리 놔주기
    classes.add("available");
    classes.remove("selected");
    display.innerText = "";
    countSelected--;
  }
};

export default selectSeat;
