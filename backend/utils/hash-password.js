const crypto = require("crypto");

module.exports = (password) => {
  const hash = crypto.createHash("sha512");
  hash.update(password);
  return hash.digest("base64");
};
