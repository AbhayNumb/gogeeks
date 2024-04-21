//bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser
const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());

//config
dotenv.config({ path: "backend/config/config.env" });
app.use(express.json());
//Route imports
// const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");
app.use("/api/v1/user", user);
// app.use("/api/v1", user);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);
//middleware for error

app.use(errorMiddleware);
module.exports = app;
