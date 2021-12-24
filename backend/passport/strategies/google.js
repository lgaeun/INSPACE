const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, OAuth } = require('../../models');
const findOrCreate = require('mongoose-findorcreate')
const passport = require('passport')

const config = {
    clientID: '483541837822-l081si09sa61433r6im5osejheb8ges0.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
};

// module.exports = new GoogleStrategy(config, (accesstoken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//             done(null, existingUser)
//         } else {
//             new User({ googleId: profile.id }).save().then((user) => {
//                 done(null, user)
//             })
//         }
//     })
// })


const google = new GoogleStrategy(config, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function(err, user) {
        console.log('profile.id : ', profile.id)
        console.log('profile : ', profile)
        return done(err, {
            userId: profile.emails[0].value,
            name: profile.displayName,
            password: profile.id
        })
    })

    // passport.serializeUser((user, done) => {
    //     done(null, user)
    // })

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => done(err, user))
    // })
})

module.exports = google;
// async function findOrCreateUser({ name, email }) {
//     const user = await User.findOne({
//         email,
//     });

//     if (user) {
//         return user;
//     }

//     const created = await User.create({
//         name,
//         email,
//         password: 'GOOGLE_OAUTH',
//     });

//     return created;
// }

// module.exports = new GoogleStrategy(config, async(accessToken, refreshToken, profile, done) => {
//     const { email, name } = profile._json;

//     try {
//         const user = await findOrCreateUser({ email, name })
//         done(null, {
//             id: user._id,
//             userId: user.userId,
//             name: user.name,
//         });
//     } catch (e) {
//         done(e, null);
//     }
// });