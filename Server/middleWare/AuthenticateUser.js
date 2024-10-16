const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SEC = process.env.JWT_SEC;

//  write auth middleware
exports.auth = async (req, res, next) => {
  try {
    console.log("show cookie: ", req.cookies);
    //  get token fro authorization header
    const authHeader = req.header("Authorization");
    const token = (authHeader && authHeader.split(" ")[1]) || req.cookies.token;

    console.log("show token: ", token);

    //  if token is missing send response
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Toke is missing",
      });
    }

    try {
      //  verify token
      const decode = jwt.verify(token, JWT_SEC);
      console.log(decode);

      //  set payload data to user
      req.user = decode;
    } catch (err) {
      console.log(err);
      res.staus(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
