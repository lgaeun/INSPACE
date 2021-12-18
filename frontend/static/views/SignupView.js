import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }
  async getHtml() {
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
            <a href='/' data-link>Cancel</a>
            <a href='/' data-link>Sign up</a>
            </div>
          </div>
        </article>
      </main>
    </div>
  `;
  }

  async defaultFunc() {}
}
