const jwt = require("jsonwebtoken");
const { NOT_AUTHORIZED_URL, HTTP_STATUS_CODE } = require("../constants");
const { getBearerToken } = require("../utils");
const { ErrorResponseManager } = require("../network/ErrorResponse");
console.log("getBearerToken", getBearerToken);

const authMiddleware = function (req, res, next) {
  if (NOT_AUTHORIZED_URL.includes(req.path)) {
    next();
    return;
  }
  const authorizationHeader =
    req.headers && req.headers.authorization ? req.headers.authorization : null;
  const token = getBearerToken(authorizationHeader);
  if (!token) {
    res.json(ErrorResponseManager.getUnauthorizedResponse());
    return;
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // TokenExpiredError;
    console.log("verify token err", err.name, err.message);
    res.json(ErrorResponseManager.getUnauthorizedResponse());
  }
};

module.exports = authMiddleware;
