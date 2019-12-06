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
    async (context, username, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            name: username,
          },
        });

        if (user) {
          context.body = { message: `User ${user.name} already exists` };
          return done(null, false);
        }

        if (!user && username && password) {
          const { email } = context.ctx.request.body;
          const newUser = await User.create({
            name: username,
            password,
            email,
          });

          const { dataValues: userInfo } = newUser;

          return done(null, userInfo);
        }
        return done(null, false);
      } catch (e) {
        done(e);
      }
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
    async (context, username, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            name: username,
          },
        });
        if (!user) {
          context.body = { message: `No such user found: ${username}` };
          return done(null, false);
        }
        if (user.password === password) {
          const { dataValues: userInfo } = user;
          return done(null, userInfo);
        }
        context.body = { message: 'Password is incorrect' };
        return done(null, false);
      } catch (e) {
        done(e);
      }
    },
  ),
);

module.exports = passport;
