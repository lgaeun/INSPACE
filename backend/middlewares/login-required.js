module.exports = (req, res, next) => {
  if (!req.user) {
    res.json({ message: "세션이 만료되었습니다" });
    return;
  }
  next();
};
