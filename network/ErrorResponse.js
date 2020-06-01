const { NOT_AUTHORIZED_URL, HTTP_STATUS_CODE } = require("../constants");
class ErrorResponse {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports.ErrorResponse = ErrorResponse;

module.exports.ErrorResponseManager = {
  getUnauthorizedResponse: () => {
    return new ErrorResponse(HTTP_STATUS_CODE.UNAUTHORIZED, "Unauthorized");
  },
};
