const passport = require("passport");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    // next();
    // res.json({ message: "유효한 토큰이 없습니다." });
    return;
  }

  return passport.authenticate("jwt", { session: false })(req, res, next);
};
