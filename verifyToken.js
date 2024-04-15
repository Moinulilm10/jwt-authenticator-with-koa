const jwt = require("jsonwebtoken");

const verifyToken = (ctx, next) => {
  try {
    const token = ctx.headers.token;
    if (!token) {
      ctx.status = 401;
      ctx.body = { error: "No token" };
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentTimestamp = Date.now() / 1000;
    if (decoded.exp && currentTimestamp > decoded.exp) {
      ctx.throw(401, " token has expired");
    }
    ctx.state.user = decoded;
  } catch (error) {
    ctx.throw(401, "authentication failed");
  }
  return next();
};

module.exports = verifyToken;
