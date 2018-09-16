const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();

router.get('/', async (ctx) => {
  ctx.body = {
    data: {
      message: 'Hello World!',
    },
  };
});

app.use(router.routes());
module.exports = app;
