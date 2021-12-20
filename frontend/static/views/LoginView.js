// import { doc } from "prettier";
// import { response } from "express";
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
    <div class="bg">
      <main class="sign-in">
        <aside class="left">
          <div class="logo_container">
            <img class="logo" src="/static/assets/images/logo.png" />
          </div>
        </aside>
        <article class="right">
          <div id="login-box">
            <h3>Log in</h3>
            <form action="post" id="login-form">
              <input
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
              />
              <a href="/" data-link><input type="button" id="login-Btn" value="로그인" /></a>
              <button id="google-login">
                <img src="/static/assets/images/Google_2015_logo.svg.png" width="40" />
                계정으로 로그인
              </button>
            </form>  
            <div id="form-box">
              <ul>
                <a href='/signup' data-link ><button id="register-Btn">회원가입</button></a>
                <li> | </li>
                <li id="findPassword">비밀번호 찾기</li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    </div>
  `;
  }

  defaultFunc() {
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
      // fetch("url", {
      //   method: "POST",
      //   cache: "no-cache",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(loginUser),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       alert("존재하지 않는 회원이거나 아이디와 비밀번호가 틀렸습니다.");
      //     } else {
      //       response.json();
      //     }
      //   })
      //   .then(console.log);
      //만약 충전권 회원이라면 바로 메인페이지로 이동하고
      // 당일권 회원이라면 이용권 구매 UI로 이동한다.

      if (loginSuccessedUser.leftTime) {
        $loginBtn.parentElement.href = "/main";
      } else {
        $loginBtn.parentElement.href = "/ticket";
      }
    });
  }
}
