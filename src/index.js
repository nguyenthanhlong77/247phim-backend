require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exit } = require("process");

const connectDB = require("./config/connectDB");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(cors());
app.options("*", cors());
const PORT = process.env.PORT || 5000;

// Connect mongodb
connectDB();

// const {
//   adminRoute,
//   authRoute,
//   publicRoute,
//   userRoute,
// } = require("./routes/index");

///////////////////////////////////
// api v2
////////////////////////////////////
const {
  adminRoute,
  authRoute,
  publicRoute,
  userRoute,
  commentRoute,
  newsRoute,
} = require("./api/v2/routes/index");

app.use("/api/", publicRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/comments", commentRoute);
app.use("/api/news", newsRoute);

app.listen(PORT, () => console.log(`App listen on port: ${PORT}`));
