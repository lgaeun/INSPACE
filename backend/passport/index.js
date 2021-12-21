//아이디/비번 맞으면 세션을 하나 만들어줘야할듯
//로그인성공->세션정보를 만듦->마이페이지 방문 시 세션검사
//id를 이용해서 세션을 저장시킴(로그인 성공시 발동)

const passport = require('passport');
const { User } = require('../models');
const local = require('./strategies/local');

module.exports = () => {
    passport.use(local);
    console.log('serialize 전 콘솔')
    passport.serializeUser((user, done) => {
        done(null, user); //_id로 받아주기
        console.log(user)
        console.log('serialize done user', user)
    });

    passport.deserializeUser((user, done) => {
        //디비에서 위에있는 user.id로 정보를 찾은다음
        console.log('deserialize user 찾기 전')
        User.findOne({ _id: user.id }, (err, user) => {
            done(null, user); //검증성공
            console.log('deserialize user 찾은 후 user', user)
        })

    });
};