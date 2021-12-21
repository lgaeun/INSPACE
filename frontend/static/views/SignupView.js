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
            <img class="logo" src="/static//assets/images/logo.png" />
          </div>
        </aside>
        <article class="right">
          <div class="sign-in_container">
            <span class="sign-in_title">Sign up</span>
            <form class="sign-in_form">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="이름을 입력하세요." />

              <label for="email">Email</label>
              <input type="email" id="email" placeholder="example@xx.com" />

              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="알바펫,숫자 포함 8자리 이상"
              />

              <label for="confirm">Password Confirm</label>
              <input
                type="password"
                id="passwordconfirm"
                placeholder="비밀번호를 한 번 더 입력하세요"
              />
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
      }
      // 회원가입 유저 요청 데이터

      const createdUser = {
        name: name,
        email: email,
        password: password,
      };
      // 예비) userData에 회원정보 push
      userData.push(createdUser);

      // 서버 전달
      //     fetch("url", {
      //       method: "POST",
      //       cache: "no-cache",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(createdUser),
      //     })
      //       .then((response) => {
      //         if (!response.ok) {
      //           alert("이미 존재하는 회원입니다.");
      //         } else {
      //           response.json();
      //         }
      //       })
      //       .then(console.log);
      //   }
      // });
    });
  }
}
