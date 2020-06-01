let constants = require("../constants");
let jwt = require("jsonwebtoken");
const { NOT_AUTHORIZED_URL, HTTP_STATUS_CODE } = require("../constants");
const { getBearerToken } = require("../utils");
console.log("getBearerToken", getBearerToken);
let authMiddleware = function (req, res, next) {
  if (NOT_AUTHORIZED_URL.includes(req.path)) {
    next();
    return;
  }
  const authorizationHeader =
    req.headers && req.headers.authorization ? req.headers.authorization : null;
  const token = getBearerToken(authorizationHeader);
  if (!token) {
    res.json({
      code: HTTP_STATUS_CODE.UNAUTHORIZED,
      message: "Unauthorized",
    });
    return;
  }
  try {
    console.log("token", token);
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // TokenExpiredError;
    console.log("verify token err", err.name, err.message);
    res.json({
      code: HTTP_STATUS_CODE.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
