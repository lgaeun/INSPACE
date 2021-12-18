const crypto = require("crypto");

module.exports = (password) => {
    const hash = crypto.createHash("sha512");
    hash.update(password);
    return hash.digest("base64");
};


//양방향 암호화로 바꾼 후 인코딩 하는거랑 디코딩 하는 메소드를 넣어놓는다. 

//회원가입할때는 비밀번호 입력값을 인코딩 해주는 함수
//비교할 때는 디코딩해주는 함수를 사용해서 비교한다.