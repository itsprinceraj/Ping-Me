const express = require("express");
const router = express.Router();

//  get controllers
const { signUp, login, getUserData } = require("../controller/AuthController");
const { auth } = require("../middleWare/AuthenticateUser");

//  create routes
router.post("/signup", signUp);
router.post("/login", login);
router.get("/getUser", auth, getUserData);

// export router
module.exports = router;
