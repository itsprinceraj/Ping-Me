const { compare } = require("bcrypt");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SEC = process.env.JWT_KEY;

//  signup controller
exports.signUp = async (req, res, next) => {
  try {
    //  get data from reqbody
    const { email, password } = req.body;

    //  validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password is Required.",
      });
    }

    //  check if user Already exists or not
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User Already exist",
      });
    }

    //  create entry in DB
    const user = await User.create({ email, password });

    //   send response
    res.status(200).json({
      success: true,
      user,
      message: "User registered successfull",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//  Login controller
exports.login = async (req, res, next) => {
  try {
    //  get data from body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email and password is Required.",
      });
    }

    //  check if user exist or not , if not then tell user to register first
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Data Not Found",
      });
    }

    //  match the password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Passwor is Incorrect",
      });
    }

    //  set data in req
    req.user = user;

    //  if user exist , then create token and send cookie
    const payload = {
      email: user.email,
      id: user.id,
    };

    const maxAge = 3 * 24 * 60 * 60 * 1000;

    //  create a jwt token
    const token = jwt.sign(payload, JWT_SEC, {
      expiresIn: maxAge,
    });

    // create options for cookie
    const options = {
      expiresIn: new Date(Date.now() + maxAge),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    //  send cookie in response
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        user,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          color: user.color,
        },
        message: "User Logged in successfully",
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
