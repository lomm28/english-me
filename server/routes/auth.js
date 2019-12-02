const passport = require('passport');
const Router = require('koa-router');

const router = new Router();

router.get('/register', ctx => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/api/info');
  }
  return ctx.redirect('/spec');
});

router.post('/register', ctx => {
  return passport.authenticate('localRegister', {
    successRedirect: '/',
    failureRedirect: '/register',
  });
});

module.exports = router;
