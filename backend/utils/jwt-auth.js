const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

module.exports = (req) => {
  // access token 검증
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  return {
    id: decoded.id,
  };
};
