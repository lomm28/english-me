const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(
  'localRegister',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(req, username, password, done);
      const user = User.findOne({
        where: {
          name: username,
          password,
        },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    },
  ),
);

passport.use(
  'localLogin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      console.log(req, username, password, done);
      const user = await User.findOne({
        where: {
          name: username,
          password,
        },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    },
  ),
);

module.exports = passport;
