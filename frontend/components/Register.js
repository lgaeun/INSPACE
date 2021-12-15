import Login from "./Login.js";

function Register() {
  const $root = document.getElementById("root");

  $root.innerHTML = `
  <main>
    <div id="container">
      <div id="login-image">
        <h1><img src="././img/logo.png" alt="logo" /></h1>
        <h2>WELCOME</h2>
      </div>
      <div id="login-box">
        <h3>회원가입</h3>
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
        <input type="submit" id="login-Btn" value="회원가입" />
        <button id="back-Btn">뒤로가기</button>

      </div>
    </div>
  </main>
`;

  const $backBtn = document.getElementById("back-Btn");

  $backBtn.addEventListener("click", Login);
}

export default Register;
