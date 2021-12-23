let removeToast;

export default function toast(string) {
  const toast = document.getElementById("toast");

  if (toast.classList.contains("reveal")) {
    clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 2000));
  } else {
    removeToast = setTimeout(function () {
      document.getElementById("toast").classList.remove("reveal");
    }, 2000);
  }
  toast.classList.add("reveal"), (toast.innerText = string);
}
