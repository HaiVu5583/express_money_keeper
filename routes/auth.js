const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.post("/generate_token", function (req, res, next) {
  console.log("Expire time", process.env.EXPIRE_TIME);
  const jwtToken = jwt.sign(
    {
      userid: 1,
      username: "haivu",
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRE_TIME }
  );
  res.json({
    token: jwtToken,
  });
});

router.get("/user_info", function (req, res, next) {
  res.json({
    userid: 1,
    username: "haivu",
    role: "admin",
    dob: "1993-11-16",
    fullname: "Vũ Long Hải",
    joinDate: "2011-11-01",
  });
});

module.exports = router;
