require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { exit } = require("process");

const connectDB = require("./config/connectDB");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect mongodb
connectDB();

const {
  adminRoute,
  authRoute,
  publicRoute,
  userRoute,
} = require("./routes/index");
app.use("/api/", publicRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

///////////////////////////////////
// api v2
////////////////////////////////////
// const {
//   adminRoute,
//   authRoute,
//   publicRoute,
//   userRoute,
// } = require("./api/v2/routes/index");
// app.use("/api/v2", publicRoute);
// app.use("/api/v2/admin", adminRoute);
// app.use("/api/v2/auth", authRoute);
// app.use("/api/v2/user", userRoute);

app.listen(PORT, () => console.log(`App listen on port: ${PORT}`));