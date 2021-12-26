import toast from "../js/common/toast.js";
import AbstractView from "./AbstractView.js";
import { baseURL } from "../js/common/baseURL.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("InSpace");
  }
  async getHtml() {
    let content;
    await fetch(baseURL + "/template/find")
      .then((res) => res.json())
      .then((res) => {
        content = "" + res.data.trim();
      });
    return content;
  }

  defaultFunc() {
    // const script = document.createElement("script");
    // script.src =
    //   "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    // document.getElementById("root").appendChild(script);

    const $passwordReqBtn = document.querySelector(".btn-signup");

    $passwordReqBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      const user = {
        userName: name,
        userId: email,
      };

      const URL =
        "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/reset-password";
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(user),
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          toast("임시 비밀번호가 발급되었습니다.");
        } else {
          toast("정보를 입력해주세요.");
        }
      });
    });
  }
}
