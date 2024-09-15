const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/database");
const PORT = process.env.PORT;
const authRoute = require("./routes/AuthRoutes");

//  use middlwares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//  add cors
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

//  use Routes
app.use("/api/v1/auth/", authRoute);

//  connect to db
dbConnect;

// create default route
app.get("/", (req, res) =>
  res.send(`<h1>Server is running at port: ${PORT}</h1>`)
);

// listen port
app.listen(PORT, console.log(`Server Started at ${PORT}`));
