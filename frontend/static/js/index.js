import MainView from "../views/MainView.js";

//연결한 뷰 컴포넌트 가져오기

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
//정규표현식 객체 생성
// "^" = 시작
//  '/' 모두(g)를 '\'로 변경(?)
// ':(문자들=w+)' g(모두) 즉 모든 파라미터를 (.+) 일치하는 문자들을 접근할 수 있도록 변경
//"$" = 끝

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
  //해당 url 히스토리 만들어줌.
  // const state = { 'page_id': 1, 'user_id': 5 }
  // const title = ''
  // const url = 'hello-world.html'

  // history.pushState(state, title, url)

  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // console.log(pathToRegex("/posts/:id/:pw"));
  // console.log("/posts/eunsol/123".match(pathToRegex("/posts/:id/:pw")));

  // URL + 받아올 파라미터 의 형태를 고정해서 만들어놔야함.
  const routes = [{ path: "/", view: MainView }];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    // console.log(location.pathname);
    // console.log(pathToRegex(route.path));
    // console.log(location.pathname.match(pathToRegex(route.path)));
    // console.log("-------");

    return {
      route: route,
      //현재 위치와 routes에 정해놓은 경로와 매치 되는지 확인
      //매치가 되면 객체 반환, 안 되면 null
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  //null이 아닌것 중 첫 번째 요소 즉 위에 정의해 놓은 객체 반환
  //사실 경로는 모두 유니크하게 짜야하기 때문에 하나만 나와야함.

  //모든 result가 null 이면 즉, 매칭되는 경로가 없으면 undefined 반환됨
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // console.log("match---------");
  // console.log(
  //   potentialMatches.find((potentialMatch) => potentialMatch.result !== null)
  // );

  // console.log(!match);

  ////따라서 route 경로에 지정해 놓지 않은 , 즉 존재하지 않는 경로는
  // 기본 홈(/)으로 돌아가게 경로 지정.
  if (!match) {
    //맞는 경로가 없으면 !undefined(=false한 값) = true
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  // match = {
  //   route: { path: "/", view: Dashboard },
  //   result: [location.pathname],
  // };
  //console.log(view.getHtml());

  //index.html의  app div 에 view의 html 태그들을 넣어줌.
  document.querySelector("#root").innerHTML = await view.getHtml();

  view.defaultFunc();
};

//페이지 로드
window.addEventListener("popstate", router);

//DOMContentLoaded = 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생합니다.
//즉 DOM 으로 생성되어 작동이 가능할 때.
document.addEventListener("DOMContentLoaded", () => {
  //클릭하면.
  document.body.addEventListener("click", (e) => {
    // console.log(e.target);
    // e.preventDefault();
    //index.html  data-link 속성을 가진 애들만.

    //해당 링크로 넘어가기 위한 엘리먼트를 감싼 <a> 태그 = e.target.parentElement
    if (e.target.parentElement.matches("[data-link]")) {
      //e.stopPropagation();
      //console.log("test-----------" + e.target.link);
      e.preventDefault(); //원래 a링크의 기본 속성 막기.
      navigateTo(e.target.parentElement.href); //히스토리 생성.
    }
  });

  //첫 페이지 로드
  router();
});
