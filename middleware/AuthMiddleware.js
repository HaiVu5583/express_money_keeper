var constants = require("../constants");
var jwt = require("jsonwebtoken");

var authMiddleware = function (req, res, next) {
  if (constants.NOT_AUTHORIZED_URL.includes(req.path)) {
    next();
    return;
  }
  const authorizationHeader =
    req.headers && req.headers.authorization ? req.headers.authorization : null;
  const tokenArr = authorizationHeader ? authorizationHeader.split(" ") : null;
  const token = tokenArr && tokenArr[1] ? tokenArr[1] : null;
  if (!token) {
    res.json({
      code: constants.HTTP_STATUS_CODE.UNAUTHORIZED,
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
      code: constants.HTTP_STATUS_CODE.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
