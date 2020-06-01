const getBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const tokenArr = authHeader ? authHeader.split(" ") : null;
  const token = tokenArr && tokenArr[1] ? tokenArr[1] : null;
  return token;
};

module.exports = {
  getBearerToken,
};
