import MainView from "../views/MainView.js";
import LoginView from "../views/LoginView.js";
import SignupView from "../views/SignupView.js";
import TicketView from "../views/TicketView.js";
import SelectView from "../views/SelectView.js";

let view = null;
let data = null;

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
<<<<<<< HEAD
  //해당 url 히스토리 만들어줌.
  // const state = { 'page_id': 1, 'user_id': 5 }
  // const title = ''
  // const url = 'hello-world.html'

  // history.pushState(state, title, url)

  if (view.data) {
    data = view.data;
  } else {
    data = null;
  }

=======
>>>>>>> 1089744a0424ab577792d810b89da6950b5012a7
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/signup", view: SignupView },
    { path: "/", view: LoginView },
    { path: "/main", view: MainView },
    { path: "/ticket", view: TicketView },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

<<<<<<< HEAD
  view = new match.route.view(getParams(match));

  if (data) {
    console.log("in");
    view.setData(data);
  }
  // match = {
  //   route: { path: "/", view: Dashboard },
  //   result: [location.pathname],
  // };

  //index.html의  app div 에 view의 html 태그들을 넣어줌.
=======
  const view = new match.route.view(getParams(match));

>>>>>>> 1089744a0424ab577792d810b89da6950b5012a7
  document.querySelector("#root").innerHTML = view.getHtml();
  view.defaultFunc();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.parentElement.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.parentElement.href);
    }
  });
  router();
});
