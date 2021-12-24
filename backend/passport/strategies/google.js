const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, OAuth } = require('../../models');

const config = {
    clientID: '483541837822-l081si09sa61433r6im5osejheb8ges0.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
};

async function findOrCreateUser({ name, email }) {
    const user = await User.findOne({
        email,
    });

    if (user) {
        return user;
    }

    const created = await User.create({
        name,
        email,
        password: 'GOOGLE_OAUTH',
    });

    return created;
}

module.exports = new GoogleStrategy(config, async(accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;

    try {
        const user = await findOrCreateUser({ email, name })
        done(null, {
            shortId: user.shortId,
            email: user.email,
            name: user.name,
        });
    } catch (e) {
        done(e, null);
    }
});