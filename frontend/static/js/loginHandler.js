function loginHandler() {
  // id, password 입력값 받기
  // let loginSuccess = false;
  const $loginBtn = document.getElementById("login-Btn");

  let ID = document.getElementById("ID").value;
  let PASSWORD = document.getElementById("password").value;

  // 예외처리
  if (ID.length < 6) {
    alert("6자 이상 아이디를 입력해주세요.");
  } else if (PASSWORD.length < 8) {
    alert("8자 이상 비밀번호를 입력해주세요.");
  } else {
    // 전달할 유저 데이터
    const loginUser = {
      userId: ID,
      password: PASSWORD, // 유저스키마에 패스워드 저장할 때 해시값 사용하면 해시값으로 변경후 password 전송
    };

    const loginURL =
      "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/login";
    //서버 fetch
    fetch(loginURL, {
      method: "POST",
      body: JSON.stringify(loginUser),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          // $loginBtn.parentElement.href = "/main";
          return res.json();
        } else {
          alert("존재하지 않는 회원이거나 아이디 비밀번호가 틀립니다.");
          throw new Error("아이디가 틀립니다.");
        }
      })
      .then((data) => {
        localStorage.setItem("checkIn", data.checkIn);
        localStorage.setItem("id", data.id);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);

        document.getElementById("login-Btn").parentElement.href = "/main";
      })
      .catch((err) => {
        console.log(err);
      });
    // sessionStorage.setItem("history", "login");
    // function movePage() {
    //   $loginBtn.parentElement.href = "/main";
    //}
  }
}

export default loginHandler;
