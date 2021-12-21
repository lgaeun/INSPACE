// import { doc } from "prettier";
// import { response } from "express";
//import e from "express";
// import e from "express";
import AbstractView from "./AbstractView.js";
import userData from "../js/data.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
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
            <!-- <img class="logo" src="/static/assets/images/logo.png" /> -->
            <h1>inspace</h1>
          </div>
        </aside>
        <article class="right">
          <div id="login-box">
            <h3>Log in</h3>
            <form action="post" id="login-form">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  name="ID"
                  id="ID"
                  class="form-control login-input"
                  placeholder="name@example.com"
                />
                <label for="ID">Email address</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control login-input"
                  id="password"
                  placeholder="Password"
                />
                <label for="password">Password</label>
              </div>

              <!-- <input
                type="text"
                name="ID"
                id="ID"
                placeholder="ID"
                class="login-input"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="PASSWORD"
                class="login-input"
              /> -->
              <a href="/" data-link
                ><input type="button" id="login-Btn" value="로그인"
              /></a>
              <button id="google-login">
                <!-- <img
                  src="/static/assets/images/Google_2015_logo.svg.png"
                  width="40"
                /> -->
                <!-- <img src="../../assets/images/google-logo.png" width="40" /> -->
                Google 계정으로 로그인
              </button>
            </form>
            <div id="form-box">
              <ul>
                <a href="/signup" data-link
                  ><button id="register-Btn">회원가입</button></a
                >
                <li>|</li>
                <a href="/find" data-link
                  ><button id="find-Btn">비밀번호 찾기</button></a
                >
              </ul>
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

    // @@@@@ 로그인 기능 @@@@@@
    const $loginBtn = document.getElementById("login-Btn");

    $loginBtn.addEventListener("click", () => {
      // id, password 입력값 받기
      let ID = document.getElementById("ID").value;
      let PASSWORD = document.getElementById("password").value;

      // 예외처리
      if (ID.length < 6) {
        alert("6자 이상 아이디를 입력해주세요.");
      } else if (PASSWORD.length < 8) {
        alert("8자 이상 비밀번호를 입력해주세요.");
      }

      // 전달할 유저 데이터
      const loginUser = {
        id: ID,
        password: PASSWORD, // 유저스키마에 패스워드 저장할 때 해시값 사용하면 해시값으로 변경후 password 전송
      };

      // 예비) 서버에서 유효성 체크
      const idCheck = userData.some((user) => {
        return user.id === loginUser.id;
      });

      const passwordCheck = userData.some((user) => {
        return user.password === loginUser.password;
      });

      if (!idCheck || !passwordCheck) {
        alert(
          "존재하지 않는 계정이거나 아이디와 비밀번호가 일치하지 않습니다."
        );
      }

      const loginSuccessedUser = userData.find(
        (user) => loginUser.id === user.id
      );

      //서버 fetch
      fetch("http://localhost:3000/users", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      })
        .then((res) => res.json())
        .then(console.log);
      // fetch("http://localhost:3000/users")
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //   });
      // .then((data) => console.log(data));

      //만약 충전권 회원이라면 바로 메인페이지로 이동하고
      // 당일권 회원이라면 이용권 구매 UI로 이동한다.

      if (loginSuccessedUser.leftTime) {
        sessionStorage.setItem("history", "main");
        $loginBtn.parentElement.href = "/main";
      } else {
        sessionStorage.setItem("history", "login");
        $loginBtn.parentElement.href = "/ticket";
      }
    });
  }
}
