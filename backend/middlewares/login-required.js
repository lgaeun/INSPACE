module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    // console.log("req.userasas", req.user);
    res.json({ message: "토큰이 만료되었습니다" });
    return;
  }
  // console.log("req.user", req.user);
  // console.log("req.headers.auth", req.headers.authorization);
  next();
};
