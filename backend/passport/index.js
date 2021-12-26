const passport = require("passport");
const local = require("./strategies/local");
const jwt = require("./strategies/jwt");
const google = require("./strategies/google");
// const { User } = require("../models");

// const google = require("./strategies/google");
// const findOrCreate = require('mongoose-findorcreate');
// const { userProfile } = require("./strategies/google");

module.exports = () => {
  passport.use(local);
  passport.use(jwt);
  passport.use(google);
  // passport.serializeUser((user, done) => {
  //     done(null, user); //_id로 받아주기
  // });

  // passport.deserializeUser((obj, done) => {
  //     done(null, obj)
  // });

  // passport.deserializeUser((user, done) => {
  //     //디비에서 위에있는 user.id로 정보를 찾은다음
  //     // console.log('deserialize user 찾기 전')
  //     console.log('user.id:', user.id)
  //     User.findOne({ _id: user.id }, (err, user) => {
  //         console.log(user.id)
  //         done(null, user); //검증성공
  //         // console.log('deserialize user 찾은 후 user', user)
  //     });
  // });
};
