import Signup from "./Signup.js";

function Login() {
  const $root = document.getElementById("root");

  $root.innerHTML = `
    <div class="bg">
      <main class="sign-in">
        <aside class="left">
          <div class="logo_container">
            <img class="logo" src="./assets/images/logo.png" />
          </div>
        </aside>
        <article class="right">
          <div id="login-box">
            <h3>로그인</h3>
            <input
              type="text"
              name="ID"
              id="ID"
              placeholder="ID"
              class="login-input"
            />
            <input
              type="password"
              name="ID"
              id="password"
              placeholder="PASSWORD"
              class="login-input"
            />
            <input type="submit" id="login-Btn" value="로그인" />
            <button id="google-login">
              <img src="../assets/img/Google_2015_logo.svg.png" width="40" />
              계정으로 로그인
            </button>
            <div id="form-box">
              <ul>
                <button id="register">회원가입</button>
                <li id="findPassword">비밀번호 찾기</li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    </div>
  `;

  const $register = document.getElementById("register");

  $register.addEventListener("click", () => {
    Signup();
  });

  const $loginBtn = document.getElementById("login-Btn");

  $loginBtn.addEventListener("click", () => {
    //서버에 id, password POST 후 Response 처리
  });
}

export default Login;
