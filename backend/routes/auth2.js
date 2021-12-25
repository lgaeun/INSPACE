const { Router } = require("express");
const { setUserToken } = require("../utils/jwt");
require("../passport/strategies/google-setup.js");
const passport = require("passport");

const router = Router();

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get("/good", isLoggedIn, (req, res) =>
//   res.send(`Welcome mr ${req.user.displayName}!`)
// );

// Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
