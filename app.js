const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const PORT = 8080;

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
