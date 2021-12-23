const { Router } = require('express');
const passport = require('passport');
const asyncHandler = require('../utils/async-handler');
// const { setUserToken } = require('../utils/jwt');

const router = Router();

// router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
//     setUserToken(res, req.user);
//     res.redirect('/');
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
    // userToken 설정하기
    console.log('req.user : ', req.user)
        // setUserToken(res, req.user)
    console.log('req.user : ', req.user)
        // console.log('res값', res)
    res.redirect('/');
})
module.exports = router;