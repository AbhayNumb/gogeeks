const catchAsyncError = require("../middlewares/catchasync");
const ErrorHandler = require("../utils/errorhandler");
const User = require("./User");
const jwt = require("jsonwebtoken");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  token = req.headers.authorization.split(" ")[1];
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
