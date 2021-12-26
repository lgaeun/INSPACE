module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ message: "토큰이 만료되었습니다" });
    return;
  }
  next();
};

// 사용안하는데 지워도되나
