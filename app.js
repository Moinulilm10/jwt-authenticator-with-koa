const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("./verifyToken");

const PORT = 8080;

const app = new Koa();
const router = new Router();

const JWT_SECRET_KEY = "jsonwebtokensecretkey";

router.post("/signin", async (ctx) => {
  const { aud, userId } = ctx.request.body;
  if (!aud || !userId) {
    ctx.body = 404;
    ctx.body = { error: "Aud or useID not given" };
    return;
  } else {
    const token = jwt.sign({ aud, userId }, JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    ctx.body = { token: token };
  }
});
router.get("/login", verifyToken, async (ctx) => {
  ctx.body = {
    aud: ctx.state.user.aud,
    userId: ctx.state.user.userId,
  };
});

// app.use(async (ctx) => {
//   ctx.body = "Hello Koa";
// });

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
