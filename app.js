const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

const main = async function(ctx, next) {
  console.log(ctx.request.path, ctx.request.path.match(/log.gif/i));
  if (ctx.request.path === '/') {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./index.html', 'utf8');
  } else if (ctx.request.path.match(/log.gif/i)) {
    console.log(`${Date.now()} ${ctx.request.ip} ${JSON.stringify(ctx.request)}`);
    ctx.response.body = null;
  }

  next();
};

app.use(serve('./static'));
app.use(main);


app.listen(3000);
