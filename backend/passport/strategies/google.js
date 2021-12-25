const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, OAuth } = require("../../models");
const findOrCreate = require("mongoose-findorcreate");
const hashPassword = require("../../utils/hash-password");

const config = {
    clientID: "483541837822-l081si09sa61433r6im5osejheb8ges0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
};
// if (!user) {
//   await User.create({
//     googleId: profile.id,
//     name: profile.displayName,
//     userId: profile.emails[0].value,
//     password: hashPassword(profile.id),
//   });

module.exports = new GoogleStrategy(
    config,
    async(accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;
        // console.log('profile 값 : ', profile)
        try {
            // const user = await findOrCreateUser({ googleId: profile.id });
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
    }
);


// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { User, OAuth } = require('../../models');



// const config = {
//     clientID: '483541837822-l081si09sa61433r6im5osejheb8ges0.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: "/auth/google/callback"
// };


// async function findOrCreateUser({ googleId }) {
//     const user = await User.findOne({
//         googleId
//     });

//     if (user.googleId != undefined) {
//         return user;
//     }

//     const created = await User.create({
//         name,
//         userId,
//         googleId,
//         password: 'GOOGLE_OAUTH',
//     });

//     return created;
// }

// module.exports = new GoogleStrategy(config, async(accessToken, refreshToken, profile, done) => {
//     const { email, name } = profile._json;
//     // console.log('profile 값 : ', profile)
//     try {
//         const user = await findOrCreateUser({ googleId: profile.id })
//         done(null, {
//             userId: profile.emails[0].value,
//             name: profile.displayName,
//             googleId: profile.id,
//         });

//     } catch (e) {
//         done(e, null);
//     }
// });



// // const google = new GoogleStrategy(config, function(accessToken, refreshToken, profile, done) {
// //     User.findOrCreate({ googleId: profile.id }, function(err, user) {
// //         console.log('profile.id : ', profile.id)
// //         console.log('profile : ', profile)
// //         return done(err, {
// //             userId: profile.emails[0].value,
// //             name: profile.displayName,
// //             password: profile.id,
// //             googleId: profile.id
// //         })
// //     })

// //     // passport.serializeUser((user, done) => {
// //     //     done(null, user)
// //     // })

// //     // passport.deserializeUser((id, done) => {
// //     //     User.findById(id, (err, user) => done(err, user))
// //     // })
// // })

// // module.exports = google;
// // // async function findOrCreateUser({ name, email }) {
// // //     const user = await User.findOne({
// // //         email,
// // //     });

// // //     if (user) {
// // //         return user;
// // //     }

// // //     const created = await User.create({
// // //         name,
// // //         email,
// // //         password: 'GOOGLE_OAUTH',
// // //     });

// // //     return created;
// // // }

// // // module.exports = new GoogleStrategy(config, async(accessToken, refreshToken, profile, done) => {
// // //     const { email, name } = profile._json;

// // //     try {
// // //         const user = await findOrCreateUser({ email, name })
// // //         done(null, {
// // //             id: user._id,
// // //             userId: user.userId,
// // //             name: user.name,
// // //         });
// // //     } catch (e) {
// // //         done(e, null);
// // //     }
// // // });