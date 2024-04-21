const catchAsyncError = require("../middlewares/catchasync");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorhandler");
exports.createUser = catchAsyncError(async (req, res, next) => {
  try {
    // Extracting data from request body
    const {
      name,
      email,
      password,
      age,
      occupation,
      address,
      state,
      country,
      role,
    } = req.body;

    // Creating a new user
    const user = await User.create({
      name,
      email,
      password,
      age,
      occupation,
      address,
      state,
      country,
      role,
    });

    // Sending success response
    res.status(201).json({
      success: true,
      message: "User Created successfully",
    });
  } catch (error) {
    // Handling errors
    console.error(error);
    return next(new ErrorHandler("Error creating user", 500));
  }
});

function getRandomNum(length) {
  var randomNum = (
    Math.pow(10, length)
      .toString()
      .slice(length - 1) +
    Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
  ).slice(-length);
  return randomNum;
}

exports.sendOtp = catchAsyncError(async (req, res, next) => {
  let user = "";
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    // Logic for creating OTP
    const otp = getRandomNum(6);
    // Saving OTP to the user document in the database
    user.otp = otp;
    await user.save({ validateBeforeSave: false });

    // Sending OTP via email
    const message = `Your login OTP is :- \n\n ${otp} \n\nIf you have not requested this email then, please ignore it.`;

    await sendEmail({
      email: email,
      subject: `OTP Verification`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${email} successfully`,
    });
  } catch (error) {
    // If any error occurs during the process
    console.error("Error occurred while sending OTP:", error);
    // Clear OTP from the user document in case of failure
    user.otp = "";
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("Error sending OTP", 500));
  }
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    //checking if user has given password and email both
    if (!email || !otp || !otp) {
      return next(
        new ErrorHandler("Please Enter Email , Password and Otp", 400)
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password", 401));
    }
    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password", 401));
    }
    if (user.otp === "") {
      return next(new ErrorHandler("Please request for OTP first", 401));
    }
    if (user.otp !== otp || user.otp == "") {
      return next(new ErrorHandler("Please enter valid OTP", 401));
    } else {
      user.otp = "";
      await user.save({ validateBeforeSave: false });
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler("some error occured", 404));
  }
});

exports.isAuth = catchAsyncError(async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token missing" });
    }
    token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id, "-__v -otp");

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = user;
    res.status(200).json({ success: true, message: "Authorized", user: user });
  } catch (error) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    const users = await User.find({}, "-__v -otp"); // Exclude _id, __v, and otp fields
    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
});

exports.editUser = catchAsyncError(async (req, res, next) => {
  try {
    const { _id, ...updatedFields } = req.body; // Assuming the request body contains the updated fields
    const user = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    }); // Find user by _id and update the fields

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await User.findByIdAndDelete(_id); // Remove the 'updatedFields' parameter

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});
exports.chartresult = catchAsyncError(async (req, res, next) => {
  try {
    // Perform aggregations to get data for each char
    // Perform aggregations for other charts (e.g., age, occupation, state, country)
    const ageChart = await User.aggregate([
      { $sort: { age: 1 } },
      { $group: { _id: "$age", count: { $sum: 1 } } },
    ]);
    const roleChart = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    const occupationChart = await User.aggregate([
      { $group: { _id: "$occupation", count: { $sum: 1 } } },
    ]);

    const stateChart = await User.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } },
    ]);

    const countryChart = await User.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
    ]);

    // Format the data for each chart
    const data = {
      roleChart: formatChartData(roleChart),
      ageChart: formatChartData(ageChart),
      occupationChart: formatChartData(occupationChart),
      stateChart: formatChartData(stateChart),
      countryChart: formatChartData(countryChart),
    };

    // Send the formatted data in the response
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});

// Function to format the aggregation result for chart data
function formatChartData(aggregationResult) {
  const formattedData = {};
  aggregationResult.forEach((item) => {
    formattedData[item._id] = item.count;
  });
  return formattedData;
}
