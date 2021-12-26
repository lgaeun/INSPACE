const JwtStrategy = require("passport-jwt").Strategy;
// const { secret } = require('../../utils/jwt');
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const cookieExtractor = (req) => {
    const token = req.headers.authorization;
    return token;
};

const opts = {
    secretOrKey: secret,
    jwtFromRequest: cookieExtractor,
};

module.exports = new JwtStrategy(opts, (user, done) => {
    done(null, user);
});