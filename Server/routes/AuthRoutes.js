const express = require("express");
const router = express.Router();

//  get controllers
const { signUp, login } = require("../controller/AuthController");

//  create routes
router.post("/signup", signUp);
router.post("/login", login);

// export router
module.exports = router;
