const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, OAuth } = require("../../models");
const findOrCreate = require("mongoose-findorcreate");
const hashPassword = require("../../utils/hash-password");

const config = {
    clientID: "483541837822-l081si09sa61433r6im5osejheb8ges0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
};

//구글로그인시 기존 유저라면 구글아이디와 연결,
//구글로그인시 신규 유저라면 회원가입처리
module.exports = new GoogleStrategy(

    config,
    async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                const tempuser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    userId: profile.emails[0].value,
                    password: hashPassword(profile.id),
                });
                done(null, tempuser);
            }
        } catch (e) {
            done(e, null);
        }
    })