/* eslint-disable no-param-reassign */

const passport = require('passport');
const Router = require('koa-router');

const router = new Router();

router.get('/register', ctx => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/api/info');
  }
  return ctx.redirect('/spec');
});

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

module.exports = router;
