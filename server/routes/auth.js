/* eslint-disable no-param-reassign */

const passport = require('passport');
const Router = require('koa-router');

const router = new Router();

// router.get('/register', ctx => {
//   if (ctx.isAuthenticated()) {
//     return ctx.redirect('/api/info');
//   }
//   return ctx.redirect('/spec');
// });

router.post('/register', ctx =>
  // eslint-disable-next-line
  passport.authenticate('localRegister', (err, user) => {
    if (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
      return false;
    }
    if (!user) {
      ctx.status = 409;
      ctx.body = ctx.request.body;
      return false;
    }

    const { name } = user;
    ctx.status = 200;
    ctx.body = { message: `User ${name} successfully registered` };
  })(ctx),
);

router.post('/login', ctx =>
  // eslint-disable-next-line
  passport.authenticate('localLogin', (err, user) => {
    if (err) {
      ctx.status = 500;
      ctx.body = { message: err.message };
      return false;
    }
    if (user) {
      // TODO: implement session start
      ctx.status = 200;
      ctx.body = { message: 'Successfully logged in', user };
      return true;
    }
    ctx.status = 500;
    ctx.body = { message: 'Please make sure that you entered correct info!' };
  })(ctx),
);

module.exports = router;
