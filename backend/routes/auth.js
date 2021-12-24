const { Router } = require('express');
const passport = require('passport');
const { User } = require('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');

// const { setUserToken } = require('../utils/jwt');

const router = Router();

// router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
//     setUserToken(res, req.user);
//     res.redirect('/');
// });

router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate("google"), asyncHandler(async(req, res, next) => {
    // userToken 설정하기
    const { name, userId, password } = req.body;
    const hashedPassword = hashPassword(password)
        // setUserToken(res, req.user)
    await User.create({
            name: req.name,
            userId: req.userId,
            password: hashedPassword,
        })
        // console.log('res값', res)
    res.redirect('/');
}))
module.exports = router;