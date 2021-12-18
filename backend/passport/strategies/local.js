const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');
const hashPassword = require('../../utils/hash-password');

const config = {
    usernameField: 'userId',
    passwordField: 'password',
};

const local = new LocalStrategy(config, async(userId, password, done) => {
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            throw new Error('회원을 찾을 수 없습니다.');
        }
        if (user.password !== hashPassword(password)) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        done(null, {
            userId: user.userId,
            id: user._id,

            // id: user.userId,
            //passwordReset: user.passwordReset
        });
    } catch (err) {
        done(err, null);
    }
});

module.exports = local;