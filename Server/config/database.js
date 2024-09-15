const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.DB_URL;
// create a db connection
exports.dbConnect = mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DB connected Succesfully"))
  .catch((err) => {
    console.log(err.message);
    console.log("DB connection Failed");
    process.exit(1);
  });
