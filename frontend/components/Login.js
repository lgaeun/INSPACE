import Register from "./Register.js";

function Login() {
  const $root = document.getElementById("root");

  $root.innerHTML = `
    <main>
      <div id="container">
        <div id="login-image">
          <h1><img src="././img/logo.png" alt="logo" /></h1>
          <h2>WELCOME</h2>
        </div>
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
            <img src="././img/Google_2015_logo.svg.png" width="40" /> 계정으로
            로그인
          </button>
          <div id="form-box">
            <ul>
              <li id="register">회원가입</li>
              <li id="findPassword">비밀번호 찾기</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  `;

  const $register = document.getElementById("register");

  $register.addEventListener("click", () => {
    Register();
  });

  const $loginBtn = document.getElementById("login-Btn");

  $loginBtn.addEventListener("click", () => {
    //서버에 id, password POST 후 Response 처리
  });
}

export default Login;
