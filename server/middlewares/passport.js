/* eslint-disable no-param-reassign */

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
    async (ctx, username, password, done) => {
      const user = User.findOne({
        where: {
          name: username,
        },
      });

      if (user) {
        ctx.body = { msg: `User ${user.username} already exists` };
        return done(null, false);
      }

      if (!user && username && password) {
        const newUser = await User.create({ name: username, password });
        return done(null, newUser);
      }
      return done(null, false);
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
    async (ctx, username, password, done) => {
      const user = await User.findOne({
        where: {
          name: username,
          password,
        },
      });
      if (!user) {
        ctx.body = { msg: `No such user found: ${username}` };
        return done(null, false);
      }
      if (user.password === password) {
        ctx.body = { msg: 'Successfully logged in', user };
        return done(null, user);
      }
      ctx.body = { msg: 'Password is incorrect' };
      return done(null, false);
    },
  ),
);

module.exports = passport;
