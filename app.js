const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const init = require("./routes/init.js");


// 加载路由中间件
app.use(init.routes()).use(init.allowedMethods());
app.use(init.routes()).use(init.allowedMethods());

app.listen(3000)
console.log('[demo] route-use-middleware is starting at port 3000')