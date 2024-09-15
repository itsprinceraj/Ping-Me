const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//  crate userSchema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },

  //   we'll check profile is setup or not
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

//  save the password before saving the data
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  //  access the current password and save hashed password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  export useSchema
module.exports = mongoose.model("User", userSchema);
