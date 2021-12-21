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
            <span class="sign-in_title">패스워드 찾기</span>
            <form class="sign-in_form">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="이름을 입력하세요." />

              <label for="email">Email</label>
              <input type="email" id="email" placeholder="example@xx.com" />
            </form>
            <div class="btn_container">
            <a href='/' data-link><button class="btn btn-cancel">Cancel</button></a>
            <a href='/' data-link><button class="btn btn-signup">임시비밀번호 발급</button></a>
            </div>
          </div>
        </article>
      </main>
    </div>
  `;
  }

  defaultFunc() {}
}
