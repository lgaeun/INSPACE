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
        console.log('local try 안에 콘솔')
        if (!user) {
            throw new Error('회원을 찾을 수 없습니다.');
        }
        if (user.password !== hashPassword(password)) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        console.log('local done 위에 콘솔')

        done(null, {
            userId: user.userId,
            id: user._id.toString(),
            //user.id로 수정 ?
            //password : user.password
            // id: user.userId,
            //passwordReset: user.passwordReset
        });
        console.log('local try 문 끝나고 콘솔')
    } catch (err) {
        done(err, null);
    }
});

module.exports = local;