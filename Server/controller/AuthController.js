const { compare } = require("bcrypt");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SEC = process.env.JWT_KEY;

//  signup controller
exports.signUp = async (req, res) => {
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
      return res.status(409).json({
        success: false,
        message: "User Already exist",
      });
    }

    //  encrypt password and save it into the database;
    const hashPass = await bcrypt.hash(password, 10);

    //  create entry in DB
    const user = await User.create({ email, password: hashPass });

    const payload = {
      id: user._id,
      email: user.email,
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
      secure: false,
      sameSite: "None",
    };

    //  send cookie in response
    res.cookie("token", token, options).status(200).json({
      success: true,
      user,
      token,
      message: "User Registered successfully",
    });
  } catch (error) {
    console.log(error);
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
      return res.status(400).json({
        success: false,
        message: "Email and password is Required.",
      });
    }

    //  check if user exist or not , if not then tell user to register first
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Data Not Found",
      });
    }

    //  match the password
    const passwordMatched = await bcrypt.compare(password, user.password);
    console.log("matched password", passwordMatched);
    console.log(password);
    console.log(user.password);

    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    //  set data in req
    req.user = user;

    //  if user exist , then create token and send cookie
    const payload = {
      email: user.email,
      id: user._id,
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
      secure: false,
      sameSite: "None",
    };

    console.log("ho gaya login");

    //  send cookie in response
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        user,
        token,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          color: user.color,
        },
        message: "User Logged in successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//  get User controller
exports.getUserData = async (req, res, next) => {
  const user = req.user;
  console.log(user);
};
