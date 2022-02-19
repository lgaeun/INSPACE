const { Router } = require("express");
const passport = require("passport");
const { User } = require("../models");
const { setUserToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;


const router = Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    async(req, res, next) => {
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
    res.json({
      token,
    });
    res.redirect("/");
  }

);

module.exports = router;