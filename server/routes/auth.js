const passport = require('passport');
const Router = require('koa-router');

const router = new Router();

router.post(
  '/register',
  passport.authenticate('localRegister', { failureRedirect: '/login' }),
  ctx => ctx.redirect('/'),
);

module.exports = router;
