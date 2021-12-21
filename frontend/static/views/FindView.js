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
          <h1>inspace</h1>
          </div>
        </aside>
        <article class="right">
          <div class="find_container">
            <div class="sign-in_title">Find <br> Password</div>
            <form class="find_form">
              <div class="form-floating mb-3">
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Name"
              />
              <label for="name">Name</label>
            </div>

            <div class="form-floating mb-3">
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="name@example.com"
            />
            <label for="email">Email</label>
          </div>
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

  defaultFunc() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    document.getElementById("root").appendChild(script);
  }
}
