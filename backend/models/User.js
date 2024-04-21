const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    select: false,
  },
  age: {
    type: Number,
    required: [true, "Please Enter Your Age"],
  },
  occupation:{
    type: String,
    required: [true, "Please Enter Your Occupation"],
  },
  address:{
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  state:{
    type: String,
    required: [true, "Please Enter Your State"],
  },
  country:{
    type: String,
    required: [true, "Please Enter Your Country"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
    default: "",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparePassword = async function (enteredpassword) {
  return await bcryptjs.compare(enteredpassword, this.password);
};

module.exports = mongoose.model("User", userSchema);