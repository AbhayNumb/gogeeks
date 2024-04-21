const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodbIdError
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid :${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid , try again`;
    err = new ErrorHandler(message, 404);
  }
  //jwt expire
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired , try again`;
    err = new ErrorHandler(message, 404);
  }


  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};