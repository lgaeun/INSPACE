const { Router } = require("express");
const passport = require("passport");
const { User } = require("../models");
const { setUserToken } = require("../utils/jwt");
// const { secret } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
// const { User } = require('../models');
// const asyncHandler = require('../utils/async-handler');
// const hashPassword = require('../utils/hash-password');

const router = Router();

// router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
//     setUserToken(res, req.user);
//     res.redirect('/');
// });

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res, next) => {
    // userToken 설정하기
    // setUserToken(res, req.user)
    const user = await User.findOne({ googleId: req.user.googleId }).populate(
      "userSeat"
    );
    var checkIn = null;
    const { userId, name } = user;
    if (!user.userSeat) {
      checkIn = false;
    } else {
      checkIn = !user.userSeat.isempty;
    }

    const token = jwt.sign(
      {
        googleId: req.user.googleId,
        name: name,
        userId: userId,
        checkIn,
        id: user._id,
      },
      secret
    );
    res.cookie("token", token);
    // console.log('res값 : ', res)
    // console.log('req.user : >>', req.user)
    // console.log('token값999', token)
    res.json({
      token,
    });
  }
);

module.exports = router;

// router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate("google"), asyncHandler(async(req, res, next) => {
//     // userToken 설정하기
//     const { name, userId, password } = req.body;
//     const hashedPassword = hashPassword(password)
//         // setUserToken(res, req.user)
//     await User.create({
//             name: req.name,
//             userId: req.userId,
//             password: hashedPassword,
//         })
//         // console.log('res값', res)
//     res.redirect('/');
// }))
module.exports = router;
