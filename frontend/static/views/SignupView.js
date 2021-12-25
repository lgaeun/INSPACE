import AbstractView from "./AbstractView.js";
import userData from "../js/data.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("INSPACE");
  }
  getHtml() {
    return `
    <style>
      @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
    </style>
    <div class="bg">
      <main class="sign-in">
        <aside class="left">
          <div class="logo_container">
            <!-- <img class="logo" src="../../assets/images/logo.png" /> -->
            <h1>inspace</h1>
          </div>
        </aside>
        <article class="right">
          <div class="sign-in_container">
            <h1 class="sign-in_title">Sign up</h1>
            <form class="sign-in_form">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  placeholder="Name"
                />
                <label for="name">Name</label>
              </div>

              <!-- <label for="name">Name</label>
              <input type="text" id="name" placeholder="이름을 입력하세요." /> -->
              <div class="form-floating mb-3">
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="name@example.com"
                />
                <label for="email">Email</label>
              </div>

              <!-- <label for="email">Email</label>
              <input type="email" id="email" placeholder="example@xx.com" /> -->

              <div class="form-floating mb-4">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="알바펫,숫자 포함 8자리 이상"
                />
                <label for="password">Password(알파벳, 숫자 포함 8자리 이상)</label>
              </div>

              <!-- <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="알바펫,숫자 포함 8자리 이상"
              /> -->

              <div class="form-floating mb-4">
                <input
                  type="password"
                  id="passwordconfirm"
                  class="form-control"
                  placeholder="비밀번호를 한 번 더 입력하세요"
                />
                <label for="password">Password Confirm</label>
              </div>

              <!-- <label for="confirm">Password Confirm</label>
              <input
                type="password"
                id="passwordconfirm"
                placeholder="비밀번호를 한 번 더 입력하세요"
              /> -->
            </form>
            <div class="btn_container">
            <a href='/' data-link><button class="btn btn-cancel">Cancel</button></a>
            <a href='/' data-link><button id="signUp" class="btn btn-signup">Sign up</button></a>
            </div>
          </div>
        </article>
      </main>
    </div>
  `;
  }

  defaultFunc() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    document.getElementById("root").appendChild(script);

    const $signUp = document.getElementById("signUp");

    $signUp.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordconfirm = document.getElementById("passwordconfirm").value;
      // 이메일 정규표현식
      const regEmail =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      const regPassword = /^[a-zA-Z0-9]{8,30}$/;

      // 이름, 이메일 , 비밀번호 검증
      if (name === "") {
        $signUp.parentElement.href = "";
        alert("이름을 입력해주세요.");
      } else if (regEmail.test(email) !== true) {
        $signUp.parentElement.href = "";
        alert("이메일을 입력해주세요.");
      } else if (regPassword.test(password) !== true) {
        $signUp.parentElement.href = "";
        alert("비밀번호를 정확히 입력해주세요.");
      } else if (password !== passwordconfirm) {
        $signUp.parentElement.href = "";
        alert("비밀번호가 맞지 않습니다.");
      } else {
        // 회원가입 유저 요청 데이터
        const createdUser = {
          name: name,
          userId: email,
          password: password,
          checkPassword: passwordconfirm,
        };
        // const dd = JSON.stringify(createdUser);
        // console.log(dd);
        const signupURL =
          "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/signup";
        // `http://localhost:8080/signup;`;
        // 서버 전달
        fetch(signupURL, {
          method: "POST",
          body: JSON.stringify(createdUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("에러");
              console.log(response);
            } else {
              response.json();
            }
          })
          .then(console.log)
          .catch((e) => console.log(e));
      }
    });
  }
}
