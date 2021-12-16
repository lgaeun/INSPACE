const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false })) // req.body정보를 읽을수 있도록 설정
app.listen(8080, function() {
    console.log('listening on 8080');
})
const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://admin:qwer1234@cluster0.tjxab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true, // 에러가 발생하지 않도록 다른 인자를 객체 형식으로 선언
    })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err);
    })

// app.get('/login', function(res, req){
//         req.render('login.html')
// })

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/fail'
}), function(res, req) {
    req.redirect('/')
})
passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        session: true, //로그인 후 세션을 저장 할 건지
        passReqToCallback: false, //아이디/비번 말고도 다른 정보 검증 시
    }, function(userId, password, done) {
        User.findOne({ userId: userId }, function(err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다.' })
            if (password == user.password) {
                return done(null, user)
            } else {
                return done(null, false, { message: '비밀번호가 틀렸습니다.' })
            }
        })
    }))
    //아이디/비번 맞으면 세션을 하나 만들어줘야할듯
    //로그인성공->세션정보를 만듦->마이페이지 방문 시 세션검사
    //id를 이용해서 세션을 저장시킴(로그인 성공시 발동)
passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    //이 세션 데이터를 가진 사람을 db에서 찾아줘.
passport.deserializeUser(function(id, done) {
    //디비에서 위에있는 user.id로 정보를 찾은다음
    User.findOne({ id: id }, function(err, user) {
        done(null, user) //검증성공
    })
})