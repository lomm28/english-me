const Router = require('koa-router');
const {
  getApiInfo,
  getSwaggerSpec,
  healthcheck,
} = require('../controllers/misc');

const router = new Router();

router.get('/api/info', getApiInfo);
router.get('/spec', getSwaggerSpec);
router.get('/status', healthcheck);

module.exports = router;
