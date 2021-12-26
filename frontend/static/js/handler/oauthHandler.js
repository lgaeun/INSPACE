async function googleLogin() {
  const $googleBtn = document.getElementById("google-btn");

  $googleBtn.href =
    "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/auth/google";
  window.location.href =
    "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/main";
  target.setAttribute("href", "/main");
  target.setAttribute("data-link", "true");

  // return new Promise((resolve, reject) => {
  //   $googleBtn.href =
  //     "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/auth/google";
  // })
  //   .then((res) => res.json())
  //   .then(console.log);

  // const loginURL =
  //   "http://elice-kdt-sw-1st-vm08.koreacentral.cloudapp.azure.com:5000/login";
  // //서버 fetch
  // fetch(loginURL, {
  //   method: "POST",
  //   body: JSON.stringify(loginUser),
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}

export default googleLogin;
